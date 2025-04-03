import Header from "../../../component/layout/Header";
import Page from "../../Page";
import BatchSidebar from "../BatchSidebar";
import '../../../component/table/table.css';
import BatchConfigurationContent from "./BatchConfigurationContent";

export default function BatchConfigurationPage() {
    return <Page
        cnSideMainLayout="page_grd"
        cnAside="side_b"
        cnMain="main_b"
        header={<Header menu="batch" />}
        sidebar={<BatchSidebar selectedMenu='config'/>}>
        <BatchConfigurationContent />
    </Page>
}