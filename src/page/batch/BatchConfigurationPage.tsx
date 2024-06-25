import { runBatchJob } from "../../api/BatchApi";
import Button from "../../component/button/Button";
import Header from "../../component/layout/Header";
import Table from "../../component/table/Table";
import Page from "../Page";
import BatchSidebar from "./BatchSidebar";
import '../../component/table/table.css';
import JobConfigModal from "./JobConfigModal";

const tmpData = [
    {
        'jobName': 'vacation.start.job',
        'jobDescription': '연차 시작 처리 배치',
        'used': 'Y',
        'executionType': '시간',
        'time': '00:00'
    },
    {
        'jobName': 'vacation.end.job',
        'jobDescription': '연차 종료 처리 배치',
        'used': 'Y',
        'executionType': '시간',
        'time': '00:10'
    }

]

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
    const handleOnclick = () => {
        alert('test')
    }
    return <Page
        cnSideMainLayout="page_grd"
        cnAside="side_b"
        cnMain="main_b"
        header={<Header menu="batch" />}
        sidebar={<BatchSidebar />}>
        <h3>배치 구성 페이지</h3>
        <Table columns={['잡 아이디', '잡 이름 ', '사용 여부', '실행 유형', '시간']}
            rows={tmpData && tmpData.map(data => (<tr style={{ 'fontSize': '13px' }} onClick={handleOnclick}>
                <td>{data.jobName}</td>
                <td>{data.jobDescription}</td>
                <td>{data.used}</td>
                <td>{data.executionType}</td>
                <td>{data.time}</td>
            </tr>))} />
        <Button name="실행" onClick={handleOnClick} />
        <JobConfigModal />
    </Page>
}