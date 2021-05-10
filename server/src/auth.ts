import {EntityManager} from 'typeorm';
import {User} from "./db/entities/user";
import {Session} from "./db/entities/session";
import {IApiResources} from "../../types/api";
import {APIController} from "./api";
import {ILoginData, ISignupData} from "../../types/auth";
import {DB} from "./db/db";
import {uuid} from "../../services/uuid";

export const LoginFailedError = () => {
    return {error: "login_failed"};
}

export const PasswordMismatchError = () => {
    return {confirmPassword: "login_failed"};
}

export const DuplicateUsernameError = () => {
    return {username: "duplicate_username"};
}

export const BadUsernameError = () => {
    return {username: "bad_username"};
}

export const BadPasswordError = () => {
    return {password: "bad_password"};
}


export class AuthController {
    private static readonly _instance = new AuthController();
    public static instance() {
        return AuthController._instance;
    }
    public static initialize() {
        APIController.registerPostHandler(IApiResources.LOGIN, AuthController.instance().login);
        APIController.registerPostHandler(IApiResources.SIGNUP, AuthController.instance().signup);
        console.log("AuthController.initialize - done")
    }
    private constructor() {
    }


    public async login(data: ILoginData) {
        const {username, password: hashPassword} = data;
        try {
            const conn = await DB.getConnection();
            await conn.transaction(async (transactionalEntityManager: EntityManager) => {
                const u = await transactionalEntityManager.findOne<User>(
                    User,
                    {
                        where: { username, hashpassword: hashPassword },
                        select: ["id"]
                    }
                );
                if(u===undefined) {
                    throw LoginFailedError();
                }
                await transactionalEntityManager.delete<Session>(Session, {
                    where: {id: u.id}
                });
                const session = new Session();
                session.id = u.id;
                const s = await transactionalEntityManager.save<Session>(session);
                return s.session;
            });
        } catch(err) {
            console.error(err);
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

        try {
            const conn = await DB.getConnection();
            await conn.transaction(async (transactionalEntityManager: EntityManager) => {
                let u = await transactionalEntityManager.findOne<User>(
                    User,
                    {
                        where: { username },
                        select: ["id"]
                    }
                );
                if(u!==undefined) {
                    throw DuplicateUsernameError();
                }
                const user = new User();
                user.hashpassword=hashPassword;
                user.username = username;
                u = await transactionalEntityManager.save<User>(user);

                const session = new Session();
                session.user = u;
                session.session = uuid();
                const s = await transactionalEntityManager.save<Session>(session);
                return s.session;
            });
        } catch(err) {
            console.error(err);
        }
    }
}


