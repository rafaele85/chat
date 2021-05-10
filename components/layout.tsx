import {useAuth} from "./providers/auth-provider";
import Login from "../pages/login";
import {createMuiTheme, CssBaseline, MuiThemeProvider} from "@material-ui/core";
import Head from "next/head";
import {GlobalStyles} from "./global-styles";
import {ChatListProvider} from "./providers/chatlist-provider";

export interface ILayoutProps {
    children: any;
}

export const Layout = (props: ILayoutProps) => {
    const {session} = useAuth();
    console.log("Layout session=", session)
    let jsx;
    if(session) {
        jsx = (
            <ChatListProvider>
                {props.children}
            </ChatListProvider>
        );
    } else {
        jsx = <Login />;
    }
    const theme = createMuiTheme({palette: {type: "light"}});
    return (
        <MuiThemeProvider theme={theme}>
            <Head>
                <title>Chat</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <GlobalStyles />
            <CssBaseline />
            {jsx}
        </MuiThemeProvider>
    );
};
