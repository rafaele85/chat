import {IChat} from "../../types/chat";
import {useContext} from "react";
import {ChatService} from "../../services/chat";
import {IEvent} from "../../types/event";
import {createProvider} from "./generic-provider";

const p = createProvider<IChat[]>([], () => ChatService.instance().chatList(), IEvent.CHATLIST);

export const ChatListProvider = p.provider;

export const useChatList = () => {
    const [value, setterCallback] = useContext(p.context);
    return {chatList: value, setChatList: setterCallback};
}



