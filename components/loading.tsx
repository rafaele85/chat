import {makeStyles} from "@material-ui/core";
import {Circle} from "better-react-spinkit";

const useStyles = makeStyles(() => {
    return {
        center: {
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        },
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        },
        img: {
            height: "200",
            marginBottom: "10px"
        }
    }
});

export const Loading = () => {
    const classes = useStyles();
    return (
        <div className={classes.center}>
            <div className={classes.container}>
                <img src={"/assets/images/whatsapplogo.png"} className={classes.img}/>
                <Circle color={"#3cbc28"} size={60} />
            </div>
        </div>
    );
};