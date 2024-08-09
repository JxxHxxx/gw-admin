import { useLocation } from "react-router-dom";
import Page from "../../../Page";
import Header from "../../../../component/layout/Header";
import VacationSidebar from "../../VacationSidebar";
import CommonVacationUpdateContent from "./CommonVacationUpdateContent";


export default function CommonVacationUpdatePage() {
    const location = useLocation();
    return <Page
        cnSideMainLayout="page_grd"
        cnAside="side_b"
        cnMain="main_b"
        header={<Header menu="vacation"/>}
        sidebar={<VacationSidebar selectedMenu={location.state.selectedMenu}/>}>
        <CommonVacationUpdateContent />
    </Page>
}