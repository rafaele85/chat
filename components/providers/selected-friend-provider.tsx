import {createProvider} from "./generic-provider";
import {IEvent} from "../../types/event";
import {useContext} from "react";

const p = createProvider<string|undefined>(undefined, async () => {return undefined;}, IEvent.SELECTEDFRIEND);

export const SelectedFriendProvider = p.provider;

export const useSelectedFriend = () => {
    const [value, setterCallback] = useContext(p.context);
    return {selectedFriend: value, setSelectedFriend: setterCallback};
}



