import Header from "../../component/layout/Header";
import Page from "../Page";
import VacationSidebar from "./VacationSidebar";


export default function VacationPage() {
    return <Page
        cnSideMainLayout="page_grd"
        cnAside="side_b"
        cnMain="main_b"
        header={<Header menu="vacation"/>}
        sidebar={<VacationSidebar />}>
        <div>메인 페이지</div>
    </Page>
}