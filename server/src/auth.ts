import {EntityManager} from 'typeorm';
import {createUser, getUserIdByUsername, getUserIdByUsernameAndHashpassword} from "./db/entities/user";
import {createSession, deleteSessionById, deleteSessionBySession} from "./db/entities/session";
import {IApiResources} from "../../types/api";
import {APIController} from "./api";
import {ILoginData, ILoginResponse, ILogoutData, ISignupData} from "../../types/auth";
import {DB} from "./db/db";
import {
    BadPasswordError,
    BadUsernameError,
    DuplicateUsernameError,
    LoginFailedError,
    PasswordMismatchError, UnauthenticatedError, UnknownError
} from "../../types/error";

export class AuthController {
    private static readonly _instance = new AuthController();
    public static instance() {
        return AuthController._instance;
    }
    public static initialize() {
        APIController.registerPostHandler(IApiResources.LOGIN,  AuthController._instance.login);
        APIController.registerPostHandler(IApiResources.LOGOUT,  AuthController._instance.logout);
        APIController.registerPostHandler(IApiResources.SIGNUP, AuthController._instance.signup);
        console.log("AuthController.initialize - done")
    }
    private constructor() {
    }


    public async login(data: ILoginData) {
        const {username, password: hashPassword} = data;
        let resp: ILoginResponse|undefined=undefined;
        try {
            const conn = await DB.getConnection();
            await conn.transaction(async (transactionalEntityManager: EntityManager) => {
                const id = await getUserIdByUsernameAndHashpassword(transactionalEntityManager, username, hashPassword);
                if(id===undefined) {
                    throw LoginFailedError();
                }
                await deleteSessionById(transactionalEntityManager, id);
                const s = await createSession(transactionalEntityManager, id)

                console.log(`login - s.session = ${s.session}, s=`, s)
                resp = {session: s.session};
            });
            return resp;
        } catch(err) {
            console.error(err);
            throw err;
        }
    }



    public async signup(data: ISignupData) {
        let {username, password: hashPassword, confirmPassword: hashConfirmPassword} = data;
        if(hashPassword !== hashConfirmPassword) {
            throw PasswordMismatchError();
        }
        username = username.trim();
        if(!username || username.length<4 || username.length>8) {
            throw BadUsernameError();
        }
        hashPassword = hashPassword.trim();
        if(!hashPassword || hashPassword.length<8) {
            throw BadPasswordError();
        }

        let resp: ILoginResponse|undefined=undefined;
        try {
            const conn = await DB.getConnection();
            await conn.transaction(async (transactionalEntityManager: EntityManager) => {
                let id = await getUserIdByUsername(transactionalEntityManager, username);

                if(id!==undefined) {
                    throw DuplicateUsernameError();
                }

                id = await createUser(transactionalEntityManager, username, hashPassword);
                if(!id) {
                    console.error("signup inserted user id is blank");
                    throw UnknownError();
                }
                const s = await createSession(transactionalEntityManager, id);
                console.log(`signup - s.session = ${s.session}, s=`, s)
                resp = {session: s.session};
            });
            return resp;
        } catch(err) {
            console.error(err);
            throw err;
        }
    }

    public async logout(data: ILogoutData) {
        const session = data.session;
        if(!session) {
            console.error("logout: session is blank")
            throw UnauthenticatedError();
        }
        try {
            const conn = await DB.getConnection();
            await conn.transaction(async (transactionalEntityManager: EntityManager) => {
                await deleteSessionBySession(transactionalEntityManager, session);
            });
        } catch(err) {
            console.error(err);
            throw err;
        }
    }
}


