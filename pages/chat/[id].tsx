import {makeStyles} from "@material-ui/core";
import Head from "next/head";
import {ChatScreen} from "../../components/chat-screen";
import {Layout} from "../../components/layout";
import {AuthenticatedLayout} from "../../components/authenticated-layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useSelectedFriend} from "../../components/providers/selected-friend-provider";

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
    const router = useRouter();

    const [friend, setFriend] = useState<string>("");
    useEffect(() => {
        let f = router.query?.id||"";
        if(Array.isArray(f)) {
            f = friend[0];
        }
        console.log("friend = ", f)
        setFriend(f);

    }, [router.query]);

    const classes = useStyles();
    return (
        <Layout>
            <Head>
                <title>Chat</title>
            </Head>
            <AuthenticatedLayout>
                <ChatScreen friend={friend}/>
            </AuthenticatedLayout>
        </Layout>
    );
};

export default Chat;
