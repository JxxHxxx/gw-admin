import Modal from 'react-modal';
import { ModalProp } from '../../../component/modal/ModalInterface';

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

export default function CreateConfirmFormModal({
    isOpen,
    setIsOpen }: ModalProp) {

    function closeModal() {
        setIsOpen(false);
    }

    return <>
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Batch Config Modal">
            <p>결재 템플릿 만들기 모달</p>
        </Modal>
    </>
}