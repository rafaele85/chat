import {IChat} from "../types/chat";
import {Avatar, makeStyles} from "@material-ui/core";
import {useRouter} from "next/router";

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

export interface IChatProps {
    chat: IChat;
}

export const Chat = (props: IChatProps) => {

    let friend="testuser";

    const router = useRouter();
    const handleClick = async () => {
        try {
            await router.push(`/chat/${props.chat.id}`);
        } catch(err) {
            console.error(err);
        }
    };

    const classes = useStyles();
    let jsxAvatar: JSX.Element;
    if(friend) {
        jsxAvatar = <Avatar className={classes.avatar} />;
    } else {
        jsxAvatar = <Avatar className={classes.avatar} >{props.chat.friendEmail}</Avatar>;
    }
    return (
        <div
            className={classes.container}
            onClick={handleClick}
        >
            {jsxAvatar}
            {props.chat.friendEmail}
        </div>
    );
}

