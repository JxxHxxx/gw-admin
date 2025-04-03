import Header from "../../../component/layout/Header";
import Page from "../../Page";
import BatchSidebar from "../BatchSidebar";
import BatchHistContent from "./BatchHistContent";


export default function BatchHistPage() {
    return <Page
        cnSideMainLayout="page_grd"
        cnAside="side_b"
        cnMain="main_b"
        header={<Header menu="batch" />}
        sidebar={<BatchSidebar selectedMenu='exeHist' />}>
        <BatchHistContent />
    </Page>
}