import Header from "../../../component/layout/Header";
import Page from "../../Page";
import BatchSidebar from "../BatchSidebar";
import '../../../component/table/table.css';
import BatchConfigurationContent from "./BatchConfigurationContent";

export interface jobState {
    jobName: string;
    jobDescription: string;
    used: boolean;
    executionType: string;
    executionTime: string;
    placeHolder: string;
    jobParams: jobParam[];
}

interface jobParam {
    parameterKey: string;
    required: boolean;
    placeHolder: string;
    paramDescription: string;
}

export default function BatchConfigurationPage() {
    return <Page
        cnSideMainLayout="page_grd"
        cnAside="side_b"
        cnMain="main_b"
        header={<Header menu="batch" />}
        sidebar={<BatchSidebar />}>
        <BatchConfigurationContent />
    </Page>
}