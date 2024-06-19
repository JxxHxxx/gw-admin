import Header from "../../component/layout/Header";
import Page from "../Page";
import BatchSidebar from "./BatchSidebar";


export default function BatchPage() {
    return <Page
        cnSideMainLayout="page_grd"
        cnAside="side_b"
        cnMain="main_b"
        header={<Header />}
        sidebar={<BatchSidebar />}>
        <div>배치 관리 페이지</div>
    </Page>
}