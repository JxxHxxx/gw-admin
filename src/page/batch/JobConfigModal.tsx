import Modal from 'react-modal';
import { runBatchJob } from '../../api/BatchApi';
import Button from '../../component/button/Button';
import { useState } from 'react';
import { format } from 'date-fns';
import Input from '../../component/input/Input';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '400px',
        height: '200px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export interface JobInfo {
    jobName: string,
    jobDescription: string,
    executionType: string,
    executeTime: string
}

interface JobConfigModalProps {
    modalIsOpen: boolean;
    setIsOpen: (value: boolean) => void;
    jobInfo?: JobInfo;
}

interface JobRunState {
    'run.id': string
}

const RUN_ID_PREFIX: string = 'ADMIN' + format(new Date(), 'yyyyMMdd') + '-';

export default function JobConfigModal({
    modalIsOpen,
    setIsOpen,
    jobInfo }: JobConfigModalProps) {

        console.log(format('2024-06-27', 'yyyy-MM-dd 00:00:00'))

    const [jobRun, setJobRun] = useState<JobRunState>({
        'run.id': RUN_ID_PREFIX
    });

    function closeModal() {
        setIsOpen(false);
    }

    const handleOnChangeRunId = (event) => {
        setJobRun((prev) => ({
            ...prev,
            'run.id': RUN_ID_PREFIX + event.target.value
        }))
    }

    const handleOnChangeJobParamters = (event) => {
        setJobRun((prev) => ({
            ...prev,
            'run.id': RUN_ID_PREFIX + event.target.value
        }))
    }

    const handleOnClickRunJob = () => {
        if (jobInfo === undefined) {
            alert('잡에 대한 정보가 존재하지 않습니다')
            return;
        }
        else {
            try {
                const requestBody = {
                    jobName: jobInfo.jobName,
                    properties: {
                        jobName: jobInfo.jobName,
                        'run.id': jobRun['run.id'],
                        processDate: "2024-06-28 00:00:00"
                    }
                }
                runBatchJob(requestBody);
            }
            catch (error) {

            }
        }

    }

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button onClick={closeModal}>close</button>
                <div>{jobInfo.jobDescription}</div>
                <div>{jobInfo.jobName}</div>
                <div>{jobInfo.executionType}</div>
                <div>{jobInfo.executeTime}</div>
                <div>
                    <Input placeholder='ID값을 지정하세요' onChange={handleOnChangeRunId} />
                </div>
                
                <Button
                    className='bb'
                    name={"실행"}
                    onClick={handleOnClickRunJob} />
            </Modal>
        </div>
    );
}