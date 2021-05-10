import {Service} from "./service";
import {IApiResources} from "../types/api";
import {AuthSevice} from "./auth";
import {IChat, IChatListData, ICreateChatData} from "../types/chat";
import {UnknownError} from "../types/error";

export class ChatService extends Service {
    private static readonly _instance = new ChatService();
    public static instance() {
        return ChatService._instance;
    }
    private constructor() {
        super();
    }

    public async createChat(friend: string) {
        const url = this.getUrl(IApiResources.CREATE_CHAT);
        const session = AuthSevice.instance().getSession();
        if(!session) {
            console.error("session is blank");
            throw UnknownError();
        }
        const data: ICreateChatData = {
            session,
            friend
        };
        try {
            await this.post<ICreateChatData, undefined>(url, data);
        } catch(err) {
            console.error(err)
            throw(err);
        }
    }

    public async chatList() {
        const url = this.getUrl(IApiResources.CHAT_LIST);
        const session = AuthSevice.instance().getSession();
        if(!session) {
            console.error("session is blank");
            throw UnknownError();
        }
        const data: IChatListData = {
            session,
        };
        try {
            return await this.get<IChatListData, IChat[]>(url, data);
        } catch(err) {
            console.error(err)
            throw(err);
        }
    }

}