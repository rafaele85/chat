import {IFriend} from "../../types/chat";
import {useContext} from "react";
import {ChatService} from "../../services/chat";
import {IEvent} from "../../types/event";
import {createProvider} from "./generic-provider";

const p = createProvider<IFriend[]>([], () => ChatService.instance().friendList(),
    IEvent.FRIENDLIST,
    true
);

export const FriendListProvider = p.provider;

export const useFriendList = () => {
    const [value, setterCallback] = useContext(p.context);
    return {friendList: value, setFriendList: setterCallback};
}



