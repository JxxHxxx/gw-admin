import Modal from 'react-modal';
import { runBatchJob } from '../../../api/BatchApi';
import Button from '../../../component/button/Button';
import { useState } from 'react';
import Input from '../../../component/input/Input';
import { jobState } from './BatchConfigurationPage';
import { format } from 'date-fns';
import EmptyMsg from '../../../component/text/EmptyMsg';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '500px',
        height: '400px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

interface JobConfigModalProps {
    modalIsOpen: boolean;
    setIsOpen: (value: boolean) => void;
    selectedJob: jobState;
}

interface JobParamState {
    jobName: string;
    placeHolder: string;
    'run.id'?: string;
}

export default function JobConfigModal({
    modalIsOpen,
    setIsOpen,
    selectedJob }: JobConfigModalProps) {

    const [jobParams, setJobParams] = useState<JobParamState>({
        jobName: selectedJob.jobName,
        placeHolder: selectedJob.placeHolder,
        'run.id': '',
    });

    function closeModal() {
        setIsOpen(false);
    }

    const handleOnChangeJobParam = (event: any, paramKey: string) => {
        setJobParams((prev) => ({
            ...prev,
            [paramKey]: event.target.value
        }))
    }

    const handleOnClickRunJob = async () => {
        if (selectedJob === undefined) {
            alert('잡에 대한 정보가 존재하지 않습니다')
            return;
        } else if (jobParams['run.id'] === undefined || jobParams['run.id'] === '') {
            alert('run.id' + '를 입력해주세요');
            return;
        }
        else {
            try {
                const requestBody = {
                    jobName: selectedJob.jobName,
                    properties: jobParams
                }
                const result = await runBatchJob(requestBody);
                if (result.status === 200) {
                    alert('배치를 실행합니다. 배치 잡 이력페이지에서 배치 실행 상태를 확인하세요')
                }
                else {
                    const {errCode, message} = result.response.data;
                    alert(' message: ' + message + '\n errCode:' + errCode);
                }


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
                contentLabel="Batch Config Modal"
            >
                <h2 style={{ 'borderBottom': '1px solid black' }}>{selectedJob.jobDescription}</h2>

                <p>스케줄러 정보</p>
                {selectedJob.schedulingUsed 
                ? <table className='table_bs'>
                    <tr>
                        <th style={{ 'border': '1px solid black' }}>spring Bean Name</th>
                        <td style={{ 'border': '1px solid black' }}>
                            <input style={{ 'border': 'none', 'fontSize': '15px' }}
                                type='text'
                                defaultValue={selectedJob.jobName}
                                readOnly />
                        </td>
                    </tr>
                    <tr>
                        <th style={{ 'border': '1px solid black', 'textAlign': 'left' }}>다음 실행 시간</th>
                        <td style={{ 'border': '1px solid black' }}>
                            <input style={{ 'border': 'none', 'fontSize': '15px' }}
                                type='text'
                                defaultValue={selectedJob.nextFireTime ? format(selectedJob.nextFireTime, 'yyyy-MM-dd HH:mm:ss') : ''}
                                readOnly />
                        </td>
                    </tr>
                    <tr>
                        <th style={{ 'border': '1px solid black', 'textAlign': 'left' }}>스케줄링 여부</th>
                        <td style={{ 'border': '1px solid black' }}>
                            <input type='radio' />
                            <span>사용</span>
                            <input type='radio' />
                            <span>사용안함</span>
                        </td>
                    </tr>
                </table> 
                : <EmptyMsg msg={['스케줄링 되어 있지 않은 배치 잡입니다.', '수동 실행만 가능합니다.']}/>}
                
                <p>수동 실행을 위한 파라미터</p>
                <table>
                    {selectedJob.jobParams && selectedJob.jobParams.map(param =>
                        <tr>
                            <th style={{ 'border': '1px solid black', 'textAlign': 'left', 'fontWeight': 'normal' }}>
                                {param.parameterKey}
                            </th>
                            <td style={{ 'border': '1px solid black' }}>
                                <Input readOnly={param.parameterKey === 'jobName' ? true : false}
                                    defaultValue={param.parameterKey === 'jobName' ? selectedJob[param.parameterKey] : ''}
                                    placeholder={param.placeHolder}
                                    type={param.parameterKey.includes('Date') ? 'date' : 'text'}
                                    onChange={(event) => handleOnChangeJobParam(event, param.parameterKey)} />
                            </td>
                        </tr>
                    )}
                </table>
                <div style={{ 'marginBottom': '50px' }}></div>
                <Button
                    className='bb'
                    name={"실행"}
                    onClick={handleOnClickRunJob} />
                <Button
                    className='modal_close_btn'
                    name={"닫기"}
                    onClick={closeModal} />
            </Modal>
        </div>
    );
}