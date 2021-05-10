import {Avatar, IconButton, makeStyles} from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {AuthSevice} from "../../services/auth";
import {IUser} from "../../types/user";


const useStyles = makeStyles(() => {
    return {
        container: {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
        },
        header: {
            position: "sticky",
            top: 0,
            width: "100%",
            height: "80px",
            padding: "15px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white",
            zIndex: 1,
            borderBottom: "1px solid whitesmoke",
        },
        avatar: {
            cursor: "pointer",
            "&:hover": {
                opacity: 0.8,
            }
        },
        iconsContainer: {
        },
    }
});

export interface ISidebarHeaderProps {
    user?: IUser;
}

export const SidebarHeader = (props: ISidebarHeaderProps) => {
    const handleAvatarClick = async () => {
        try {
            await AuthSevice.instance().logout();
        } catch(err) {
            console.error(err)
        }
    };

    const avatarUrl = props.user?.photoURL||"";

    const classes = useStyles();
    return (
        <header className={classes.header}>
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
        </header>
    )
}