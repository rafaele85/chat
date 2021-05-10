import {ISession} from "./session";

export type IFriend = {
    friend: string;
    photoURL?: string;
}

export type IFriendAddData = {
    session: ISession;
    friend: string;
}

export type IFriendListData = {
    session: ISession;
}

export type IFriendAddResponse = {
    id: number;
}

export type IFriendListResponse = {
    friendList: IFriend[];
}