import Header from "../../component/layout/Header";
import Page from "../Page";
import MessageSidebar from "./MessageSidebar";


export default function MessageRetryPage() {
    return <Page
        cnSideMainLayout="page_grd"
        cnAside="side_b"
        cnMain="main_b"
        header={<Header menu="message" />}
        sidebar={<MessageSidebar />}>
        <div>메시지 재동기 처리</div>
    </Page>
}