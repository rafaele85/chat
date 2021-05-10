import {Avatar, makeStyles} from "@material-ui/core";
import {useRouter} from "next/router";
import {IFriend} from "../types/chat";

const useStyles = makeStyles(() => {
    return {
        container: {
            width: "100%",
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
        selected: {
           backgroundColor: "#DDDDDD",
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

    const router = useRouter();
    const handleClick = async () => {
        try {
            await router.push(`/chat/${props.friend.friend}`);
        } catch(err) {
            console.error(err);
        }
    };

    let selectedFriend= router.query.id || "";
    if(Array.isArray(selectedFriend)) {
        selectedFriend = selectedFriend[0];
    }
    selectedFriend = selectedFriend.trim();

    const classes = useStyles();
    let jsxAvatar: JSX.Element;
    if(props.friend.photoURL) {
        jsxAvatar = <Avatar className={classes.avatar} src={props.friend.photoURL} />;
    } else {
        jsxAvatar = <Avatar className={classes.avatar} >{props.friend.friend?.[0]}</Avatar>;
    }

    const cl = (selectedFriend === props.friend.friend ? classes.selected : "");
    return (
        <div
            className={`${classes.container} ${cl}`}
            onClick={handleClick}
        >
            {jsxAvatar}
            {props.friend.friend}
        </div>
    );
}

