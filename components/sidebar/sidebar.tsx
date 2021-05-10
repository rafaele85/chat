import {makeStyles} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import {ChatList} from "../chat-list";
import {SidebarHeader} from "./sidebar-header";
import {ChatService} from "../../services/chat";

const useStyles = makeStyles(() => {
    return {
        container: {
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            backgroundColor: "#f0f0f0",
            padding: "10px",
            //backgroundColor: "yellow"
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
            width: "100%",
            border: 0,
            borderTop: "1px solid whitesmoke",
            borderBottom: "1px solid whitesmoke",
            borderRadius: "5px",
            padding: "5px",
            cursor: "pointer",
            backgroundColor: "lightgray",

        }
    }
}, {name: "sidebar"});

export const Sidebar = () => {

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


    const classes = useStyles();
    return (
        <div className={classes.container}>
            <SidebarHeader />
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
    );
};