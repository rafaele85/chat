export enum IEvent {
    AUTH="auth",
    CHATLIST="chatlist",
}

export type IListenerId = string;
export type IEventPayload = any;
export type IListener = (payload: IEventPayload) => void;
