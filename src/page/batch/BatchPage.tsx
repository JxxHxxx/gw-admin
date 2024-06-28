import Header from "../../component/layout/Header";
import Page from "../Page";
import BatchConfigurationContent from "./config/BatchConfigurationContent";
import BatchSidebar from "./BatchSidebar";


export default function BatchPage() {
    return <Page
        cnSideMainLayout="page_grd"
        cnAside="side_b"
        cnMain="main_b"
        header={<Header menu="batch"/>}
        sidebar={<BatchSidebar />}>
        <BatchConfigurationContent />
    </Page>
}