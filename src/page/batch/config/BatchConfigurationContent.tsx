import { useEffect, useState } from "react";
import { getAllBatchJobTriggers, getBatchJobParams } from "../../../api/BatchApi";
import Button from "../../../component/button/Button";
import Table from "../../../component/table/Table";
import JobConfigModal from "./JobConfigModal";
import { format } from "date-fns";

export interface jobState {
    jobName: string;
    jobDescription: string;
    used: boolean;
    triggerState: string;
    nextFireTime: string;
    placeHolder: string;
    jobParams: jobParam[];
}

interface jobParam {
    parameterKey: string;
    required: boolean;
    placeHolder: string;
    paramDescription: string;
}

export default function BatchConfigurationContent() {
    const [jobModal, setJobModal] = useState(false);

    const [selectedJob, setSelectedJob] = useState<jobState>({
        jobName: '',
        jobDescription: '',
        used: false,
        triggerState: '',
        nextFireTime: '',
        placeHolder: '',
        jobParams: []
    });

    const [jobParams, setJobParams] = useState([]);

    const [jobs, setJobs] = useState<Array<jobState>>([]);

    const handleOnclick = (idx: number) => {
        setJobModal(true)
        setSelectedJob(jobParams[idx]);
    }

    const requestToServerForRender = async () => {
        const response = await getAllBatchJobTriggers();
        const jobParams = await getBatchJobParams();
        setJobParams(jobParams.data);
        setJobs(response.data);
    };

    useEffect(() => {
        requestToServerForRender();
    }, [])

    return <>
        <h3 style={{ 'marginBottom': '0px' }}>배치 구성 페이지</h3>
        <div style={{ 'borderTop': '1px solid black', 'padding': '10px' }}>
            <Button name="배치 등록(미개발)"
                onClick={() => { }} />
        </div>
        <div style={{ 'borderTop': '1px solid black' }}></div>
        <p style={{ 'fontSize': '12px', color: 'gray' }}>Job을 클릭해서 실행/수정하세요</p><br />
        <Table columns={['잡 아이디', '잡 설명 ', '사용 여부', '트리거의 현재 상태', '다음 실행 시간']}
            rows={jobs && jobs.map((info, index) => (<tr key={index} style={{ 'fontSize': '13px' }}
                onClick={() => handleOnclick(index)}>
                <td>{info.jobName}</td>
                <td>{info.jobDescription}</td>
                <td>{info.used === true ? 'Y' : 'N'}</td>
                <td>{info.triggerState}</td>
                <td>{format(info.nextFireTime, 'yyyy-MM-dd HH:mm:ss')}</td>
            </tr>))} />
        {jobModal && <JobConfigModal
            modalIsOpen={jobModal}
            setIsOpen={setJobModal}
            // schedulingInfo={} 
            selectedJob={selectedJob} />}
    </>
}