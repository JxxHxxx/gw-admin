import Header from "../../component/layout/Header";
import Pagination from "../../component/pagination/Paginaton";
import Page from "../Page";
import VacationSidebar from "./VacationSidebar";


export default function VacationPage() {
    return <Page
        cnSideMainLayout="page_grd"
        cnAside="side_b"
        cnMain="main_b"
        header={<Header menu="vacation"/>}
        sidebar={<VacationSidebar />}>
        {/* <Pagination /> */}
    </Page>
}