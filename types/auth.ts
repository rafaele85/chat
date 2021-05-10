import {IUser} from "./user";
import {ISession} from "./session";

export type IAuth = {
    loading: boolean;
    user: IUser;
}

export type ILoginData = {
    username: string;
    password: string;
}

export type ILoginResponse = {
    session: ISession;
}

export type ILogoutData = {
    session: ISession;
}

export type ISignupData = {
    username: string;
    password: string;
    confirmPassword: string;
};