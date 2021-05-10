import {makeStyles} from "@material-ui/core";
import {ValidationError} from "./validation-error";

const useStyles = makeStyles(() => {
    return {
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
        field: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "15px",
        },
        label: {
            width: "150px",
            fontSize: "1rem",
            paddingRight: "10px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            textAlign: "left",
        },
        input: {
            padding: "3px",
            outline: 0,
            fontSize: "1rem",
        },

    }
})

export interface ITextFieldProps {
    type?: "text"|"tel"|"password"|"email";
    name: string;
    label: string;
    value: string;
    placeholder?: string;
    onChange: (v: string) => void;
    error: string;
}
export const TextField = (props: ITextFieldProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        props.onChange(v);
    };

    const type = props.type || "text";

    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.field}>
                <label
                    htmlFor={props.name}
                    className={classes.label}
                >
                    {props.label}:
                </label>
                <input
                    className={classes.input}
                    type={type}
                    name={props.name}
                    value={props.value}
                    onChange={handleChange}
                    placeholder={props.placeholder}
                />
            </div>
            <ValidationError error={props.error} />
        </div>
    )
}