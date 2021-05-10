import {ILoginData, ILoginResponse, ILogoutData, ISignupData} from "../types/auth";
import {IApiResources} from "../types/api";
import {Service} from "./service";
import {sha256} from "js-sha256";
import {NotificationService} from "./notification";
import {IEvent} from "../types/event";
import {UnknownError} from "../types/error";

export class AuthSevice extends Service {
    private static readonly _instance = new AuthSevice();
    public static instance() {
        return AuthSevice._instance;
    }
    private constructor() {
        super();
    }

    public async login(username: string, password: string) {
        const url = this.getUrl(IApiResources.LOGIN);
        const data: ILoginData = {
            username,
            password: sha256(password)
        };
        try {
            const res = await this.post<ILoginData, ILoginResponse>(url, data);
            const session = res.session;
            console.log("res=",res, "session=", session)

            if(!session) {
                throw UnknownError();
            }
            if(typeof window==="object") {
                window.localStorage.setItem("auth", session);
            } else {
                console.log("window is blank - not setting local storage")
            }
            NotificationService.instance().notify(IEvent.AUTH, session);
            return session;
        } catch(err) {
            console.error(err)
            throw(err);
        }
    }

    public async signup(username: string, password: string, confirmPassword: string) {
        const url = this.getUrl(IApiResources.SIGNUP);
        const data: ISignupData = {
            username,
            password: sha256(password),
            confirmPassword: sha256(confirmPassword)
        };
        try {
            const res = await this.post<ISignupData, ILoginResponse>(url, data);
            const session = res.session;
            console.log("res=",res, "session=", session)
            if(!session) {
                throw UnknownError();
            }
            if(typeof window==="object") {
                window.localStorage.setItem("auth", session);
            } else {
                console.log("window is blank - not setting local storage")
            }
            NotificationService.instance().notify(IEvent.AUTH, session);
            return session;
        } catch(err) {
            console.error(err)
            throw(err);
        }
    }

    public getSession() {
        if(typeof window==="object") {
            return localStorage.getItem("auth")||"";
        } else {
            console.log("window is blank - returning undefined")
        }
    }

    public async logout() {
        console.log("AutService.logout")
        const session = this.getSession();
        if(session) {
            const url = this.getUrl(IApiResources.LOGOUT);
            const data: ILogoutData = {session};
            console.log("logout.2")
            try {
                console.log("logout.1")
                await this.post<ILogoutData,void>(url, data)
            } catch(err) {
                console.error(err);
            }
            console.log("logout.3")
        } else {
            console.warn("session is blank")
        }
        console.log("logout.4")
        if(typeof window==="object") {
            console.log("logout.4 - remove localStorage")
            localStorage.removeItem("auth");
            console.log("logout.4 - session = ", localStorage.getItem("auth"))
        } else {
            console.log("logout.4 - window is undefined - not removing")
        }
        console.log("logout.5")
        NotificationService.instance().notify(IEvent.AUTH);
    }


}