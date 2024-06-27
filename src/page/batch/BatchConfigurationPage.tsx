import { getBatchJobs } from "../../api/BatchApi";
import Header from "../../component/layout/Header";
import Table from "../../component/table/Table";
import Page from "../Page";
import BatchSidebar from "./BatchSidebar";
import '../../component/table/table.css';
import { useEffect, useState } from "react";
import JobConfigModal from "./JobConfigModal";
import Button from "../../component/button/Button";

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
    paramDescription:string;
}

export default function BatchConfigurationPage() {
    const [jobModal, setJobModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState<jobState>();
    const [jobs, setJobs] = useState<Array<jobState>>([]);

    const handleOnclick = (idx: number) => {
        setJobModal(true)
        setSelectedJob(jobs[idx]);
    }

    const requestToServerForRender = async () => {
        const response = await getBatchJobs();
        setJobs(response.data);
    };

    useEffect(() => {
        requestToServerForRender();
    }, [])

    return <Page
        cnSideMainLayout="page_grd"
        cnAside="side_b"
        cnMain="main_b"
        header={<Header menu="batch" />}
        sidebar={<BatchSidebar />}>
        <h3>배치 구성 페이지</h3>
        <div style={{'borderTop': '1px solid black', 'padding': '10px'}}>
            <Button name="배치 등록"/>
        </div>
        <div style={{'borderTop': '1px solid black'}}></div>
        <p style={{ 'fontSize': '12px', color: 'gray' }}>Job을 클릭해서 실행/수정하세요</p><br />
        <Table columns={['잡 아이디', '잡 이름 ', '사용 여부', '실행 유형', '시간']}
            rows={jobs && jobs.map((info, index) => (<tr key={index} style={{ 'fontSize': '13px' }} onClick={() => handleOnclick(index)}>
                <td>{info.jobName}</td>
                <td>{info.jobDescription}</td>
                <td>{info.used === true ? 'Y' : 'N'}</td>
                <td>{info.executionType}</td>
                <td>{info.executionTime}</td>
            </tr>))} />
        {jobModal && <JobConfigModal
            modalIsOpen={jobModal}
            setIsOpen={setJobModal}
            selectedJob={selectedJob} />}
    </Page>
}