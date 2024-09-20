
import Modal from 'react-modal';
import { retryMessageQ } from '../../../api/MessageApi';
import Button from '../../../component/button/Button';
import { useState } from 'react';

export default function MessageReSyncModal({ modalOpen, setModalOpen, messageQResultPk }) {

    const [messageReSync, setMessageReSync] = useState({
        responseMessage : ''
    });

    function closeModal() {
        setModalOpen(false);
        setMessageReSync(() => ({}));
    }



    const requestRetryMessageQ = async () => {
        try {
            const {data, status} = await retryMessageQ(messageQResultPk);
            
            if(status === 200) {
                setMessageReSync((prev) => ({
                    ...prev,
                    responseMessage : data.message
                }))
            }
        }
        catch(e) {

        }
    }

    return <>
        <Modal isOpen={modalOpen}
            onRequestClose={closeModal}
            style={{
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
            }}
            contentLabel="Example Modal">
            <div>
                <p style={{fontSize : '18px',  textAlign : 'center'}}>재동기 처리</p>
                <p style={{fontSize : '12px', textAlign : 'center' , color : 'gray'}}>
                    메시지 통신 방식에 맞춰 메타 정보, 실패 원인을 나열해두면 좋을듯 싶다
                </p>
                <p style={{textAlign : 'center'}}>{messageReSync.responseMessage && messageReSync.responseMessage}</p>
                <div style={{ marginTop: '200px', textAlign : 'center' }}>
                    <Button style={{ marginRight: '5px' }} name={"재동기"} onClick={requestRetryMessageQ} />
                    <Button name={"취소"} onClick={closeModal} />
                </div>
            </div>
        </Modal>
    </>
}