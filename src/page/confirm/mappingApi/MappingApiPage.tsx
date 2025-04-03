import Header from "../../../component/layout/Header";
import Page from "../../Page";
import ConfirmSidebar from "../ConfirmSidebar";
import MappingApiContent from "./MappingApiContent";

export default function MappingApiPage() {
    return <Page
        cnSideMainLayout="page_grd"
        cnAside="side_b"
        cnMain="main_b"
        header={<Header menu="confirm"/>}
        sidebar={<ConfirmSidebar selectedMenu="mappingApi" />}>
        <MappingApiContent />
    </Page>
}