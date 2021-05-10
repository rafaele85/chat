import {Avatar, IconButton, makeStyles} from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {AuthSevice} from "../services/auth";
import SearchIcon from "@material-ui/icons/Search";
import {ChatList} from "./chat-list";
import * as EmailValidator from "email-validator";
import {ChatService} from "../services/chat";

const useStyles = makeStyles(() => {
    return {
        container: {
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
        },
        top: {
            flex: 0,
            width: "100%",
            padding: "10px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "#f2f2f2",
            border: "1px solid #e0e0e0"
        },
        middle: {
            width: "100%",
            height: "100%",
            flex: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
        },
        left: {
            minHeight: "100%",
            backgroundColor: "#f7f7f7",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            border: "1px solid #e0e0e0"
        },
        center: {
            width: "100%",
            height: "100%",
            flex: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        },
        avatar: {
            cursor: "pointer",
            "&:hover": {
                opacity: 0.8,
            }
        },
        iconsContainer: {
        },
        search: {
            display: "flex",
            alignItems: "center",
            padding: "20px",
            borderRadius: "2px",
        },
        searchInput: {
            outline: 0,
            border: 0,
            flex: 1,
        },
        sidebarButton: {
            border: 0,
            borderTop: "1px solid whitesmoke",
            borderBottom: "1px solid whitesmoke",
            borderRadius: "5px",
            padding: "5px",
            cursor: "pointer",
            backgroundColor: "lightgray",

        }
    }
});

export interface IAuthenticatedLayoutProps {
    children?: any;
}
export const AuthenticatedLayout = (props: IAuthenticatedLayoutProps) => {

    const handleAvatarClick = async () => {
        try {
            await AuthSevice.instance().logout();
        } catch(err) {
            console.error(err)
        }
    };

    const createChat = async () => {
        const friendEmail = prompt("Please enter email for the user you want to chat with")?.trim();
        if(!friendEmail) {
            alert("Email is invalid")
            return;
        }
        if(!EmailValidator.validate(friendEmail)) {
            alert("Email is invalid")
            return;
        }
        try {
            await ChatService.instance().createChat(friendEmail);
        } catch(err) {
            alert(err);
        }
    };

    const avatarUrl = "";

    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.top}>
                <Avatar
                    src={avatarUrl}
                    className={classes.avatar}
                    onClick={handleAvatarClick}
                />
                <div className={classes.iconsContainer}>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className={classes.middle}>
                <div className={classes.left}>
                    <div className={classes.search}>
                        <SearchIcon />
                        <input
                            placeholder = "Search in chats"
                            type={"text"}
                            className={classes.searchInput}
                        />
                    </div>
                    <button
                        className={classes.sidebarButton}
                        onClick={createChat}
                    >
                        START A NEW CHAT
                    </button>
                    <ChatList />
                </div>
                <div className={classes.center}>
                    {props.children}
                </div>
            </div>
        </div>
    );
};