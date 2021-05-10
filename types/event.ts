export enum IEvent {
    AUTH="auth",
    FRIENDLIST="friendlist",
    SELECTEDFRIEND="selectedfriend",
}

export type IListenerId = string;
export type IEventPayload = any;
export type IListener = (payload: IEventPayload) => void;
