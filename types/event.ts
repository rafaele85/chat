export enum IEvent {
    AUTH="auth",
    FRIENDLIST="friendlist",
}

export type IListenerId = string;
export type IEventPayload = any;
export type IListener = (payload: IEventPayload) => void;
