import {APIController} from "./api";
import {IApiResources} from "../../types/api";
import {
    UnauthenticatedError,
    UnknownError, UnknownFriendError,
} from "../../types/error";
import {IFriend, IFriendAddData, IFriendAddResponse, IFriendListData, IFriendListResponse} from "../../types/chat";
import {PostgreSQLConnection} from "./db";

enum PSQLQuery {
    FRIENDADD = "select * from FriendAdd($1, $2) res", //session, friend user name
    FRIENDLIST = "select * from FriendList($1) res", //session
}

export class ChatController {
    private static readonly _instance = new ChatController();

    public static instance() {
        return ChatController._instance;
    }

    public static initialize() {
        APIController.registerPostHandler(IApiResources.FRIEND_ADD, ChatController._instance.friendAdd);
        APIController.registerGetHandler(IApiResources.FRIEND_LIST, ChatController._instance.friendList);
        console.log("ChatController.initialize - done")
    }

    private constructor() {
    }

    public async friendAdd(payload: IFriendAddData) {
        let {session, friend} = payload;
        session = session?.trim();
        friend = friend?.trim();
        if(!session) {
            console.error("session is blank")
            throw UnauthenticatedError();
        }
        if(!friend) {
            console.error("friend is blank")
            throw UnknownFriendError();
        }
        let friendshipId: number;
        try {
            friendshipId = await PostgreSQLConnection.executeInTransaction<number>(PSQLQuery.FRIENDADD, [session, friend], "id");
        } catch(err) {
            console.error(err);
            throw err;
        }
        if(!friendshipId) {
            console.error("friendAdd friendshipId is blank");
            throw UnknownError();
        }
        const resp: IFriendAddResponse = {id: friendshipId};
        return resp;
    }

    public async friendList(payload: IFriendListData) {
        console.log("friendList payload=", payload)
        let {session} = payload;
        session = session?.trim();
        if(!session) {
            console.error("session is blank")
            throw UnauthenticatedError();
        }
        let friendList: IFriend[];
        try {
            friendList = await PostgreSQLConnection.execute(
                PSQLQuery.FRIENDLIST,
                [session],
                "friendList"
            );
        } catch(err) {
            console.error(err);
            throw err;
        }
        const resp: IFriendListResponse = {friendList};
        return resp;
    }
}
