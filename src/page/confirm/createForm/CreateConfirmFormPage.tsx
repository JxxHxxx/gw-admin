import Header from "../../../component/layout/Header";
import Page from "../../Page";
import ConfirmSidebar from "../ConfirmSidebar";
import CreateConfirmForm from "./CreateConfirmForm";


export default function CreateConfirmFormPage() {

    return <Page
        cnSideMainLayout="page_grd"
        cnAside="side_b"
        cnMain="main_b"
        header={<Header menu="confirm" />}
        sidebar={<ConfirmSidebar />}>
        <CreateConfirmForm />
    </Page>
}