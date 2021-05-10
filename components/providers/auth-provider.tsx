import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {ISession} from "../../types/session";
import {AuthSevice} from "../../services/auth";
import {NotificationService} from "../../services/notification";
import {IEvent} from "../../types/event";

type ISetSessionCallback = (session: ISession|undefined) => void;

type IAuthContextValue = [ISession|undefined, ISetSessionCallback];

const authContextValueDefault: IAuthContextValue = [undefined, (_session: ISession|undefined) => {}];

export const AuthContext = createContext<IAuthContextValue>(authContextValueDefault);

export interface IAuthProviderProps {
    children?: any;
}

export const AuthProvider = (props: IAuthProviderProps) => {

    const [session, setSession] = useState<ISession|undefined>();

    const updateSession = (session: ISession|undefined) => {
        console.log("authprovider.updateSession = ", session)
        setSession(session);
    };

    useEffect(() => {
        let mounted=true;

        const s = AuthSevice.instance().getSession();
        if(mounted) {
            setSession(s);
        }
        const listenerId = NotificationService.instance().subscribe(IEvent.AUTH,
            (s: ISession|undefined) => {
            console.log("authprovider.on auth change")
                if(mounted) {
                    updateSession(s);
                }
            }
        );

        return () => {
            mounted=false;
            if(listenerId) {
                NotificationService.instance().unsubscribe(IEvent.AUTH, listenerId);
            }
        }

    }, [])

    const setSessionCallback = useCallback<ISetSessionCallback>( (s: ISession|undefined) => {
        updateSession(s);
    }, []);

    const Provider = AuthContext.Provider;
    return (
        <Provider value={[session, setSessionCallback]}>
            {props.children}
        </Provider>
    );
}

export const useAuth = () => {
    const [value, setSessionCallback] = useContext(AuthContext);
    return {session: value, setSession: setSessionCallback};
}



