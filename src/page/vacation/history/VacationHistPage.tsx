import { useLocation } from "react-router-dom";
import Header from "../../../component/layout/Header";
import Page from "../../Page";
import VacationSidebar from "../VacationSidebar";
import VacationHistContent from "./VacationHistContent";

/** 로그인 시 진입점 **/
export default function VacationHistPage() {
    const {state} = useLocation();
    return <Page
        cnSideMainLayout="page_grd"
        cnAside="side_b"
        cnMain="main_b"
        header={<Header menu="vacation"/>}
        sidebar={<VacationSidebar selectedMenu={state ? state.selectedMenu : ''}/>}>
        <VacationHistContent />
    </Page>
}