import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => {
    return {
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "red",
        },
    }
})

export interface IValidationErrorProps {
    error: string;
}
export const ValidationError = (props: IValidationErrorProps) => {
    const classes = useStyles();
    if(props.error) {
        return (
            <div className={classes.container}>
                {props.error}
            </div>
        )
    }
    return null;
}