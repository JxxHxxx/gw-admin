import Header from "../../component/layout/Header";
import Page from "../Page";
import ConfirmSidebar from "./ConfirmSidebar";

export default function ConfirmPage() {
    return <Page
        cnSideMainLayout="page_grd"
        cnAside="side_b"
        cnMain="main_b"
        header={<Header />}
        sidebar={<ConfirmSidebar />}>
        <div>결재 페이지</div>
    </Page>
}