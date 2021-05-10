import {ISession} from "./session";

export type IChat = {
    id: string;
    friend: string;
}
export type ICreateChatData = {
    session: ISession;
    friend: string;
}

export type IChatListData = {
    session: ISession;
}