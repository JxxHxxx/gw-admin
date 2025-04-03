import Header from "../../../component/layout/Header";
import Page from "../../Page";
import ConfirmSidebar from "../ConfirmSidebar";


export default function ApprovalLinePage() {
    return <Page
    cnSideMainLayout="page_grd"
    cnAside="side_b"
    cnMain="main_b"
    header={<Header menu="confirm"/>}
    sidebar={<ConfirmSidebar selectedMenu="approvalLine"/>}>
    <div>결재선 페이지</div>
</Page>
}