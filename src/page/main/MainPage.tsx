import Header from "../../component/layout/Header";
import Page from "../Page";
import '../../page/page.css'
import Sidebar from "../../component/layout/Sidebar";

export default function MainPage() {

    return <Page
        cnSideMainLayout="page_grd"
        cnAside="side_b"
        cnMain="main_b"
        header={<Header />}
        sidebar={<Sidebar />}>
        <div>메인 페이지</div>
    </Page>
}