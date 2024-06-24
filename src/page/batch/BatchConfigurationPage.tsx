import { runBatchJob } from "../../api/BatchApi";
import Button from "../../component/button/Button";
import Header from "../../component/layout/Header";
import Page from "../Page";
import BatchSidebar from "./BatchSidebar";

export default function BatchConfigurationPage() {
    const handleOnClick = () => {
        const params = {
            jobName: "vacation.start.job",
            properties: {
                'run.id': "ADMIN20200624-001",
                processDate: "2024-06-23 00:00:00"
            }
        }
        runBatchJob(params);
    }
    return <Page
        cnSideMainLayout="page_grd"
        cnAside="side_b"
        cnMain="main_b"
        header={<Header menu="batch" />}
        sidebar={<BatchSidebar />}>
        <div>배치 구성 페이지</div>
        <Button name="실행" onClick={handleOnClick} />
    </Page>
}