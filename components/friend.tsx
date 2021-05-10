import {Avatar, makeStyles} from "@material-ui/core";
import {useRouter} from "next/router";
import {IFriend} from "../types/chat";

const useStyles = makeStyles(() => {
    return {
        container: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            cursor: "pointer",
            padding: "15px",
            wordBreak: "break-word",
            "&:hover": {
                backgroundColor: "#e9eaeb",
            }
        },
        avatar: {
            margin: "5px",
            marginRight: "15px",
        }
    }
});

export interface IFriendProps {
    friend: IFriend;
}

export const Friend = (props: IFriendProps) => {

    let friend="testuser";

    const router = useRouter();
    const handleClick = async () => {
        try {
            await router.push(`/chat/${props.friend}`);
        } catch(err) {
            console.error(err);
        }
    };

    const classes = useStyles();
    let jsxAvatar: JSX.Element;
    if(friend) {
        jsxAvatar = <Avatar className={classes.avatar} />;
    } else {
        jsxAvatar = <Avatar className={classes.avatar} >{props.friend.friend}</Avatar>;
    }
    return (
        <div
            className={classes.container}
            onClick={handleClick}
        >
            {jsxAvatar}
            {props.friend.friend}
        </div>
    );
}

