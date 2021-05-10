import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => {
    return {
        container: {
            width: "100%",
            height: "100%",
            display: "flex",
        }
    }
});

export interface IChatScreenProps {
    friend: string;
}

export const ChatScreen = (props: IChatScreenProps) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            chat with {props.friend}
        </div>
    );
};