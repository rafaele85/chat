import {Service} from "./service";
import {IApiResources} from "../types/api";
import {AuthSevice} from "./auth";
import {
    IFriend,
    IFriendAddData,
    IFriendAddResponse, IFriendListData, IFriendListResponse
} from "../types/chat";
import {UnknownError} from "../types/error";

export class ChatService extends Service {
    private static readonly _instance = new ChatService();
    public static instance() {
        return ChatService._instance;
    }
    private constructor() {
        super();
    }

    public async friendAdd(friend: string) {
        const url = this.getUrl(IApiResources.FRIEND_ADD);
        const session = AuthSevice.instance().getSession();
        if(!session) {
            console.error("session is blank");
            throw UnknownError();
        }
        const data: IFriendAddData = {
            session,
            friend
        };
        try {
            await this.post<IFriendAddData, IFriendAddResponse>(url, data);
        } catch(err) {
            console.error(err)
            throw(err);
        }
    }

    public async friendList() {
        const url = this.getUrl(IApiResources.FRIEND_LIST);
        const session = AuthSevice.instance().getSession();
        if(!session) {
            console.error("session is blank");
            throw UnknownError();
        }
        const data: IFriendListData = {
            session,
        };
        try {
            const res = await this.get<IFriendListData, IFriendListResponse>(url, data);
            const friendList = res?.friendList;
            console.log("friendList: ", friendList )
            return friendList;
        } catch(err) {
            console.error(err)
            throw(err);
        }
    }

}