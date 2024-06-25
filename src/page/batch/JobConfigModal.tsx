import Modal from 'react-modal';
import { useState } from "react";
import { runBatchJob } from '../../api/BatchApi';
import Button from '../../component/button/Button';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};



export default function JobConfigModal(
    { modalIsOpen, setIsOpen, data }
) {

    function closeModal() {
        setIsOpen(false);
    }

    const handleRunJob = () => {
        const params = {
            jobName: data.jobName,
            properties: {
                jobName: data.jobName,
                'run.id': "ADMIN20200624-003",
                processDate: "2024-06-23 00:00:00"
            }
        }
        runBatchJob(params);

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
                <div>{data.jobDescription}</div>
                <div>{data.jobName}</div>
                <div>{data.executionType}</div>
                <div>{data.time}</div>
                <Button name={"실행"} onClick={handleRunJob} />
            </Modal>
        </div>
    );
}