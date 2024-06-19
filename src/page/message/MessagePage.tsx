import Header from "../../component/layout/Header";
import Page from "../Page";
import MessageSidebar from "./MessageSidebar";


export default function MessagePage() {
    return <Page
        cnSideMainLayout="page_grd"
        cnAside="side_b"
        cnMain="main_b"
        header={<Header />}
        sidebar={<MessageSidebar />}>
        <div>메시지Q 관리 페이지</div>
    </Page>
}