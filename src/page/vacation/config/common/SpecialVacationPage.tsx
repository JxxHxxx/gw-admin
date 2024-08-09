import { useLocation } from "react-router-dom";
import Page from "../../../Page";
import Header from "../../../../component/layout/Header";
import VacationSidebar from "../../VacationSidebar";
import SpecialVacationContent from "./SpecialVacationContent";


export default function SpecialVacationPage() {

    const {state} = useLocation();
    return <Page
        cnSideMainLayout="page_grd"
        cnAside="side_b"
        cnMain="main_b"
        header={<Header menu="vacation"/>}
        sidebar={<VacationSidebar selectedMenu={state ? state.selectedMenu : ''}/>}>
        <SpecialVacationContent />
    </Page>
}