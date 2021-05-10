import {ISession} from "./session";

export type IChat = {
    id: string;
    friendEmail: string;
}
export type ICreateChatData = {
    session: ISession;
    friendEmail: string;
}

export type IChatListData = {
    session: ISession;
}