import Header from "../../../component/layout/Header";
import Page from "../../Page";
import MessageSidebar from "../MessageSidebar";
import MessageRetryContent from "./MessageRetryContent";


export default function MessageRetryPage() {
    return <Page
        cnSideMainLayout="page_grd"
        cnAside="side_b"
        cnMain="main_b"
        header={<Header menu="message" />}
        sidebar={<MessageSidebar selectedMenu="retry"/>}>
        <MessageRetryContent />
    </Page>
}