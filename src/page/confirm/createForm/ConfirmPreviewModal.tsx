
import Modal from 'react-modal';

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

interface ConfirmDocumentModalProp {
    modalIsOpen: boolean,
    setIsOpen: () => void,
    formElements: formElement[]
}

interface formElement {

}

export default function ConfirmPreviewModal({
    modalIsOpen,
    setIsOpen,
    formElements = [] }) {

    function closeModal() {
        setIsOpen(false);
    }

    console.log(formElements);

    return <>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Batch Config Modal">
            <p style={{ margin : '10px', paddingBottom: '20px'}}>결재 양식 미리보기 모달</p>
            {formElements.map((formElement) => <div style={{border: '1px dashed black', borderRadius: '10px',  margin : '10px'}}>
                <p>{formElement.elementGroupName}</p>
            </div>)}
        </Modal>
    </>
}