import {useMemo} from "react";
import {useFriendList} from "./providers/friendlist-provider";
import {IFriend} from "../types/chat";
import {Friend} from "./friend";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => {
    return {
        container: {
            paddingTop: "15px",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start"
        }
    }
});

export const FriendList = () => {
    const {friendList} = useFriendList();
    console.log("FriendListComponent.friendlist = ", friendList)

    const classes = useStyles();
    const renderChats = () => {
        const jsx: JSX.Element[] = (friendList||[]).map((friend: IFriend) => (
            <Friend friend={friend} key={friend.friend}/>
        ));
        return jsx;
    };

    const jsx = useMemo(() => renderChats(), [friendList]);

    console.log("jsx=", jsx)

    return (
        <div className={classes.container}>
            {jsx}
        </div>
    );
}