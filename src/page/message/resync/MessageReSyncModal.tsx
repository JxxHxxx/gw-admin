
import Modal from 'react-modal';
import { retryMessageQ } from '../../../api/MessageApi';
import Button from '../../../component/button/Button';

export default function MessageReSyncModal({ modalOpen, setModalOpen, messageQResultPk }) {

    function closeModal() {
        setModalOpen(false);
    }

    const requestRetryMessageQ = () => {
        retryMessageQ(messageQResultPk);
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
                <div>메시지 재처리 모달입니다</div>
                <Button name={"재동기"} onClick={requestRetryMessageQ}></Button>
        </Modal>
    </>
}