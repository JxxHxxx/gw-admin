import Header from "../../component/layout/Header";
import Page from "../Page";
import UserOrgSidebar from "./UserOrgSidebar";

export default function UserManagePage() {
    return <Page
    cnSideMainLayout="page_grd"
    cnAside="side_b"
    cnMain="main_b"
    header={<Header menu="userOrg"/>}
    sidebar={<UserOrgSidebar />}>
    <></>
</Page>
}