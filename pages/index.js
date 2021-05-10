import {Layout} from "../components/layout";
import {ChatScreen} from "../components/chat-screen";
import {makeStyles} from "@material-ui/core";
import {AuthenticatedLayout} from "../components/authenticated-layout";

export default function Home() {
    return (
        <Layout>
            <AuthenticatedLayout>
                <ChatScreen />
            </AuthenticatedLayout>
        </Layout>
  );
}

