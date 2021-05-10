import {makeStyles} from "@material-ui/core";
import Head from "next/head";
import {ChatScreen} from "../../components/chat-screen";
import {Layout} from "../../components/layout";
import {AuthenticatedLayout} from "../../components/authenticated-layout";

const useStyles = makeStyles(() => {
    return {
        container: {
            height: "100%",
            display: "flex",
            flexDirection: "row",
        },
        chatContainer: {
            flex: 1,
            display: "flex",
            overflow: "scroll",
            height: "100vh",
            "-ms-overflow-style": "none",
            "&::-webkit-scrollbar": {
                display: "none"
            },
            scrollbarWidth: "none",
        }
    }
}, {name: "chat-page"});

const Chat = () => {
    const classes = useStyles();
    return (
        <Layout>
            <div className={classes.container}>
                <Head>
                    <title>Chat</title>
                </Head>
                <AuthenticatedLayout>
                    <div className={classes.chatContainer}>
                        <ChatScreen chatId={"123"}/>
                    </div>
                </AuthenticatedLayout>
            </div>
        </Layout>
    );
};

export default Chat;
