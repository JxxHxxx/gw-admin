import { useLocation } from "react-router-dom";
import Header from "../../../../component/layout/Header";
import Page from "../../../Page";
import VacationSidebar from "../../VacationSidebar";
import PersonalVacationConfigContent from "./PersonalVacationConfigContent";



export default function PersonalVacationConfigPage() {
    const location = useLocation();
    return <Page
        cnSideMainLayout="page_grd"
        cnAside="side_b"
        cnMain="main_b"
        header={<Header menu="vacation"/>}
        sidebar={<VacationSidebar selectedMenu={location.state.selectedMenu}/>}>
        <PersonalVacationConfigContent />
    </Page>
}