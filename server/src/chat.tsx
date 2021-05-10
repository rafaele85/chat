import {APIController} from "./api";
import {IApiResources} from "../../types/api";
import {ICreateChatData} from "../../types/chat";
import {ChatExistsError, ChatWithSelfError, UnauthenticatedError, UnknownFriendError} from "../../types/error";
import {DB} from "./db/db";
import {EntityManager} from "typeorm";
import {getSessionIdBySession} from "./db/entities/session";
import {getUserIdByUsername} from "./db/entities/user";
import {getChatIdByUserIdAndFriendId, createChat} from "./db/entities/chat";

export class ChatController {
    private static readonly _instance = new ChatController();

    public static instance() {
        return ChatController._instance;
    }

    public static initialize() {
        APIController.registerPostHandler(IApiResources.CREATE_CHAT, ChatController._instance.createChat);
        console.log("ChatController.initialize - done")
    }

    private constructor() {
    }

    public async createChat(payload: ICreateChatData) {
        let {session, friend} = payload;
        session = session?.trim();
        friend = friend?.trim();
        if(!session) {
            throw UnauthenticatedError();
        }
        if(!friend) {
            throw UnknownFriendError();
        }
        try {
            const conn = await DB.getConnection();
            await conn.transaction(async (transactionalEntityManager: EntityManager) => {
                const userId = await getSessionIdBySession(transactionalEntityManager, session);
                if(!userId) {
                    throw UnauthenticatedError();
                }
                const friendId = await getUserIdByUsername(transactionalEntityManager, friend);
                if(!friendId) {
                    throw UnknownFriendError();
                }
                if(friendId===userId) {
                    throw ChatWithSelfError();
                }
                let chatId = await getChatIdByUserIdAndFriendId(transactionalEntityManager, userId, friendId)
                if(chatId) {
                    throw ChatExistsError();
                }
                chatId = await getChatIdByUserIdAndFriendId(transactionalEntityManager, friendId, userId)
                if(chatId) {
                    throw ChatExistsError();
                }
                await createChat(transactionalEntityManager, userId, friendId);
                return;
            });
        } catch(err) {
            console.error(err);
            throw err;
        }
    }
}
