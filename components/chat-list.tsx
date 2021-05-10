import {IChat} from "../types/chat";
import {Chat} from "./chat";
import {useMemo} from "react";
import {useChatList} from "./providers/chatlist-provider";


export const ChatList = () => {
    const {chatList} = useChatList();
    console.log("chatlist = ", chatList)

    const renderChats = () => {
        const jsx: JSX.Element[] = chatList.map((chat: IChat) => (
            <Chat chat={chat} key={chat.id}/>
        ));
        return jsx;
    };

    const jsx = useMemo(() => renderChats(), [chatList]);

    console.log("jsx=", jsx)

    return (
        <div>
            {jsx}
        </div>
    );
}