import Header from "../../../component/layout/Header";
import Page from "../../Page";
import MessageSidebar from "../MessageSidebar";
import MessageDestinationContent from "./MessageDestinationContent";


export default function MessageDestinationPage() {
    return <Page
        cnSideMainLayout="page_grd"
        cnAside="side_b"
        cnMain="main_b"
        header={<Header menu="message" />}
        sidebar={<MessageSidebar selectedMenu="destination"/>}>
        <MessageDestinationContent />
    </Page>
}