import Header from "../../../component/layout/Header";
import Page from "../../Page";
import ConfirmSidebar from "../ConfirmSidebar";
import ConfirmFormConfig from "./ConfirmFormConfig";

export default function ConfirmFormConfigPage() {

    return <Page
        cnSideMainLayout="page_grd"
        cnAside="side_b"
        cnMain="main_b"
        header={<Header menu="confirm" />}
        sidebar={<ConfirmSidebar selectedMenu="confirmForm"/>}>
        <ConfirmFormConfig />
    </Page>
}