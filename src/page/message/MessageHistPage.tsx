import { Fragment } from "react/jsx-runtime";
import Page from "../Page";
import Header from "../../component/layout/Header";
import MessageSidebar from "./MessageSidebar";
import MessageHistContent from "./history/MessageHistContent";

export default function MessageHistPage() {
    return <Page
        cnSideMainLayout="page_grd"
        cnAside="side_b"
        cnMain="main_b"
        header={<Header menu="message" />}
        sidebar={<MessageSidebar />}>
        <MessageHistContent />
    </Page>
}
