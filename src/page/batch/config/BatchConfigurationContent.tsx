import { useEffect, useState } from "react";
import { getAllBatchJobTriggers, getBatchJobParams } from "../../../api/BatchApi";
import Button from "../../../component/button/Button";
import Table from "../../../component/table/Table";
import JobConfigModal from "./JobConfigModal";
import { format } from "date-fns";

export interface jobState {
    jobName: string;
    jobDescription: string;
    schedulingUsed: boolean;
    triggerState: string;
    nextFireTime: string | null;
    placeHolder: string;
    cronExpression: string | null;
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
        schedulingUsed: false,
        triggerState: '',
        nextFireTime: '',
        placeHolder: '',
        cronExpression: '',
        jobParams: []
    });



    const [jobs, setJobs] = useState<Array<jobState>>([]);

    const handleOnClickJobRow = async (jobName_: string) => {
        const { data: jobParams } = await getBatchJobParams(jobName_);

        const selectedJobInfo = jobs.find(job => job.jobName === jobName_);
        
        if (selectedJobInfo && jobParams) {
            const { jobName, jobDescription, schedulingUsed, triggerState, nextFireTime, placeHolder, cronExpression } = selectedJobInfo
            setSelectedJob((prev) => ({
                ...prev,
                jobName: jobName,
                jobDescription: jobDescription,
                schedulingUsed: schedulingUsed,
                triggerState: triggerState,
                nextFireTime: nextFireTime,
                placeHolder: placeHolder,
                cronExpression: cronExpression,
                jobParams: jobParams
            }))
            setJobModal(true)
        } 

        else if(selectedJobInfo && !jobParams) {
            const { jobName, jobDescription, schedulingUsed, triggerState, nextFireTime, placeHolder, cronExpression } = selectedJobInfo
            setSelectedJob((prev) => ({
                ...prev,
                jobName: jobName,
                jobDescription: jobDescription,
                schedulingUsed: schedulingUsed,
                triggerState: triggerState,
                nextFireTime: nextFireTime,
                placeHolder: placeHolder,
                cronExpression: cronExpression,
                jobParams: []
            }))
            setJobModal(true)
        }


    }

    const requestToServerForRender = async () => {
        const { data } = await getAllBatchJobTriggers();
        setJobs(data);
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
        <Table columns={['잡 아이디', '잡 설명 ', '스케줄링 사용 여부', '스케줄링 상태', '다음 실행 시간']}
            rows={jobs && jobs.map((info, index) => (<tr key={index} style={{ 'fontSize': '13px' }}
                onClick={() => handleOnClickJobRow(info.jobName)}>
                <td>{info.jobName}</td>
                <td>{info.jobDescription}</td>
                <td>{info.schedulingUsed === true ? '사용' : '사용안함'}</td>
                <td>{info.triggerState ? info.triggerState : '미지정'}</td>
                <td>{info.nextFireTime && format(info.nextFireTime, 'yyyy-MM-dd HH:mm:ss')}</td>
            </tr>))} />
        {jobModal && <JobConfigModal
            modalIsOpen={jobModal}
            setIsOpen={setJobModal}
            // schedulingInfo={} 
            selectedJob={selectedJob} />}
    </>
}