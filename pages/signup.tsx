import Head from "next/head";
import {Button, makeStyles} from "@material-ui/core";
import {AuthSevice} from "../services/auth";
import {useState} from "react";
import {TextField} from "../components/form/text-field";
import * as React from "react";
import {useRouter} from "next/router";

const useStyles = makeStyles(() => {
    return {
        container: {
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            paddingTop: "100px",
            backgroundColor: "whitesmoke",
        },
        loginContainer: {
            padding: "30px",
            paddingTop: "15px",
            maxWidth: "fit-content",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "white",
            borderRadius: "5px",
            boxShadow: "0 4px 14px -3px rgba(0, 0, 0, 0.7)",
        },
        buttonContainer: {
            paddingTop: "15px",
            paddingRight: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end"
        },
        button: {
        },
        loginToggle: {
            paddingTop: "10px",
            flex: 0,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        loginToggleLink: {
            color: "#2233EE",
            fontWeight: 600,
            fontStyle: "italic",
            textDecoration: "underline",
        }

    }
});

const Signup = () => {
    const [username, setUsername] = useState<string>("");
    const [usernameError, setUsernameError] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const uErr = validateUsername(username);
        const pErr = validatePassword(password);
        const cErr = validatePassword(confirmPassword);
        if(!uErr && !pErr && !cErr) {
            try {
                const res = await AuthSevice.instance().signup(username, password, confirmPassword);
                console.log("res=", res, "redirecting to /")
                await router.push("/");
            } catch(err) {
                console.error(err);
            }
        }
    };
    const validateUsername = (v: string) => {
        let err="";
        if(v.length<4) {
            err = "Username must be at least 4 chars long";
        }
        setUsernameError(err);
        return err;
    };

    const updateUsername = (v: string) => {
        setUsername(v);
        validateUsername(v);
    };

    const validatePassword = (v: string) => {
        let err="";
        if(v.length<8) {
            err = "Password must be at least 8 chars long";
        }
        setPasswordError(err);
        return err;
    };

    const updatePassword = (v: string) => {
        setPassword(v);
        validatePassword(v);
    };

    const validateConfirmPassword = (v: string) => {
        let err="";
        if(v !== password) {
            err = "Passwords must match";
        }
        setConfirmPasswordError(err);
        return err;
    };

    const updateConfirmPassword = (v: string) => {
        setConfirmPassword(v);
        validateConfirmPassword(v);
    };

    const handleLoginToggle = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        await router.push("/login");
    };

    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Head>
                <title>Login</title>
            </Head>
            <div className={classes.loginContainer}>
                <header>
                    <h2>Sign Up for Chat</h2>
                </header>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label={"Username"}
                        name={"username"}
                        value={username}
                        onChange={updateUsername}
                        error={usernameError}
                        placeholder={"Enter username"}
                    />
                    <TextField
                        type={"password"}
                        label={"Password"}
                        name={"password"}
                        value={password}
                        onChange={updatePassword}
                        error={passwordError}
                        placeholder={"Enter password"}
                    />
                    <TextField
                        type={"password"}
                        label={"Confirm Password"}
                        name={"confirmPassword"}
                        value={confirmPassword}
                        onChange={updateConfirmPassword}
                        error={confirmPasswordError}
                        placeholder={"Confirm password"}
                    />
                    <div className={classes.buttonContainer}>
                        <Button
                            type={"submit"}
                            variant={"contained"}
                            className={classes.button}
                        >
                            SUBMIT
                        </Button>
                    </div>
                </form>
            </div>
            <div className={classes.loginToggle}>
                Already have an account:
                <a
                    href={"#"}
                    onClick={handleLoginToggle}
                    className={classes.loginToggleLink}
                >
                    Login
                </a>
            </div>
        </div>
    )
}

export default Signup;
