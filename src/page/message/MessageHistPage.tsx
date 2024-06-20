import { Fragment } from "react/jsx-runtime";
import Page from "../Page";
import Header from "../../component/layout/Header";
import MessageSidebar from "./MessageSidebar";

export default function MessageHistPage() {
    return <Page
        cnSideMainLayout="page_grd"
        cnAside="side_b"
        cnMain="main_b"
        header={<Header menu="message" />}
        sidebar={<MessageSidebar />}>
        <div>메시지 이력 페이지</div>
    </Page>
}
