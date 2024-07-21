
import Modal from 'react-modal';
import { RiCloseLargeLine } from "react-icons/ri";
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '750px',
        height: '800px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid rgb(204, 204, 204)'
    },
};

interface ConfirmDocumentModalProp {
    modalIsOpen: boolean,
    setIsOpen: (open: boolean) => void,
    formElements: formElement[]
}

interface formElement {

}

export default function ConfirmPreviewModal({
    modalIsOpen,
    setIsOpen,
    formElements = [] }: ConfirmDocumentModalProp) {

    function closeModal() {
        setIsOpen(false);
    }

    return <>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Batch Config Modal"
        >
            <div style={{textAlign : 'right'}}
                onClick={closeModal}>
                <RiCloseLargeLine
                    size='1.2em'
                    color='gray' />
            </div>
            <p style={{ fontSize: '22px', margin: '10px', paddingBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>결재 양식 제목 자리</p>
            <div style={{ marginBottom: '60px', fontSize: '22px', fontWeight: 'bold', textAlign: 'right' }}>결재선 컴포넌트 자리</div>
            <div style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '40px', borderBottom: '1px dashed black' }}>결재 내용 자리</div>
            {formElements.map((formElement) => <div style={{ marginBottom: '10px' }}>
                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{formElement.elementGroupName}</p>
                <table className='table_bs'>
                    <tbody>
                        <thead>
                            <tr>
                                <td style={{ color: 'black' }}>{formElement.elementGroupName}</td>
                            </tr>
                        </thead>
                        {formElement.elements.map((element) => <>
                            <tr>
                                <td>{element.elementName}</td>
                                <td>1</td>
                            </tr>
                        </>)}
                    </tbody>
                </table>

            </div>)}
        </Modal>
    </>
}