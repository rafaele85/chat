import {IApiResources} from "../../types/api";
import {APIController} from "./api";
import {ILoginData, ILoginResponse, ILogoutData, ISignupData} from "../../types/auth";
import {
    BadPasswordError,
    BadUsernameError,
    PasswordMismatchError, UnauthenticatedError, UnknownError
} from "../../types/error";
import {PostgreSQLConnection} from "./db";
import {ISession} from "../../types/session";



enum PSQLQuery {
    LOGIN = "select * from UserLogin($1, $2) res", //username, hashpassword
    SIGNUP = "select * from UserSignup($1, $2, $3, $4) res", //username, hashpassword, hashConfirmPassword, photoURL
    LOGOUT = "select * from UserLogout($1) res", //session
}


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


    public async login(payload: ILoginData) {
        console.log("AuthController.login")
        const username = payload?.username?.trim();
        const hashPassword = payload?.password?.trim();

        if(!username || username.length<4 || username.length>10) {
            throw BadUsernameError();
        }
        if(!hashPassword) {
            throw BadPasswordError();
        }

        let session: ISession;
        try {
            session = await PostgreSQLConnection.executeInTransaction<ISession>(PSQLQuery.LOGIN,
                [username, hashPassword], "session"
            );
        } catch(err) {
            console.error(err);
            throw UnknownError();
        }
        if(!session) {
            throw UnknownError();
        }
        const resp: ILoginResponse = {session};
        return resp;
    }


    public async signup(data: ISignupData) {
        console.log("AuthController.signup")
        let {username, password: hashPassword, confirmPassword: hashConfirmPassword, photoURL} = data;
        if(hashPassword !== hashConfirmPassword) {
            console.error("password mismatch")
            throw PasswordMismatchError();
        }
        username = username.trim();
        if(!username || username.length<4 || username.length>8) {
            console.error("bad username")
            throw BadUsernameError();
        }
        hashPassword = hashPassword.trim();
        if(!hashPassword || hashPassword.length<8) {
            console.error("bad password")
            throw BadPasswordError();
        }

        let session: ISession;

        try {
            console.log("starting tx")
            session = await PostgreSQLConnection.executeInTransaction<ISession>(
                PSQLQuery.SIGNUP,
                [username, hashPassword, hashConfirmPassword, photoURL],
                "session"
            );
        } catch(err) {
            console.error(err);
            throw err;
        }
        if(!session) {
            throw UnknownError();
        }
        const resp: ILoginResponse = {session};
        return resp;
    }

    public async logout(data: ILogoutData) {
        const session = data.session;
        if(!session) {
            console.error("logout: session is blank")
            throw UnauthenticatedError();
        }
        try {
            await PostgreSQLConnection.executeInTransaction(PSQLQuery.LOGOUT, [session]);
        } catch(err) {
            console.error(err);
            throw err;
        }
    }
}


