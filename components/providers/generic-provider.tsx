import {createContext, useCallback, useEffect, useState} from "react";
import {NotificationService} from "../../services/notification";
import {IEvent} from "../../types/event";

export function createProvider<TValue>(defaultValue: TValue, fetchFunc: () => Promise<TValue>, updateEvent: IEvent,
                                       reloadOnEvent?: boolean
) {
    type ICallback = (v: TValue) => void;

    type IContextValue = [TValue, ICallback];

    const contextValueDefault: IContextValue = [defaultValue, () => {}];

    const context = createContext<IContextValue>(contextValueDefault);

    interface IProps {
        children?: any;
    }

    const provider = (props: IProps) => {
        const [value, setValue] = useState<TValue>(defaultValue);

        const updateValue = (v: TValue) => {
            setValue(v);
        };

        const fetchData = async (mounted: boolean) => {
            try {
                const v = await fetchFunc();
                console.log("provider, fetchFunc returned ", v)
                if(mounted) {
                    setValue(v);
                }
            } catch(err) {
                console.error(err);
            }
        };

        useEffect(() => {
            let mounted = true;
            let listenerId: string|undefined = undefined;

            if(mounted) {
                void fetchData(mounted);
                listenerId = NotificationService.instance().subscribe(updateEvent,
                    (payload: TValue) => {
                        if(mounted) {
                            if(reloadOnEvent) {
                                void fetchData(mounted);
                            } else {
                                updateValue(payload);
                            }
                        }
                    }
                );
            }

            return () => {
                mounted=false;
                if(listenerId) {
                    NotificationService.instance().unsubscribe(updateEvent, listenerId);
                }
            }

        }, []);

        const setterCallback = useCallback<ICallback>( (v: TValue) => {
            updateValue(v);
        }, []);

        const Provider = context.Provider;
        return (
            <Provider value={[value, setterCallback]}>
                {props.children}
            </Provider>
        );
    };

    return {
        provider, context
    };
}


