import Header from "../../../component/layout/Header";
import Page from "../../Page";
import ConfirmSidebar from "../ConfirmSidebar";
import ConfirmDocumentContent from "./ConfirmDocumentContent";

export default function ConfirmPage() {
    return <Page
        cnSideMainLayout="page_grd"
        cnAside="side_b"
        cnMain="main_b"
        header={<Header menu="confirm"/>}
        sidebar={<ConfirmSidebar selectedMenu="confirmDocument"/>}>
        <ConfirmDocumentContent />
    </Page>
}