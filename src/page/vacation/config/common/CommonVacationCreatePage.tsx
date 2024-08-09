import { useLocation } from "react-router-dom";
import Header from "../../../../component/layout/Header";
import Page from "../../../Page";
import VacationSidebar from "../../VacationSidebar";
import CommonVacationCreateContent from "./CommonVacationCreateContent";



export default function CommonVacationCreatePage() {
    const location = useLocation();
    return <Page
        cnSideMainLayout="page_grd"
        cnAside="side_b"
        cnMain="main_b"
        header={<Header menu="vacation"/>}
        sidebar={<VacationSidebar selectedMenu={location.state.selectedMenu}/>}>
        <CommonVacationCreateContent />
    </Page>
}