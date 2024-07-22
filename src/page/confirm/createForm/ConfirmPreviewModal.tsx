
import Modal from 'react-modal';
import { RiCloseLargeLine } from "react-icons/ri";
import ApprovalLineSample from './ApprovalLineSample';


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
    title: string,
    formElements: FormElement[]
}

interface FormElement {
    elementGroupName: string,
    elementGroupKey: string,
    elementGroupType: string,
    elements: Element[]
}

interface Element {
    elementName: string
}


export default function ConfirmPreviewModal({
    modalIsOpen,
    setIsOpen,
    title,
    formElements = [] }: ConfirmDocumentModalProp) {

    function closeModal() {
        setIsOpen(false);
    }

    const renderPair = (formElement:FormElement) => (
        <table className='table_cfc'>
            <tbody>
                <tr id={formElement.elementGroupKey} style={{ textAlign: 'center', backgroundColor: 'rgb(0, 40, 94)' }}>
                    <td colSpan={2} style={{ color: 'white' }}>{formElement.elementGroupName}</td>
                </tr>
                {formElement.elements.map((element, index) => (
                    <tr key={index}>
                        <td className='ele_nm'>{element.elementName}</td>
                        <td></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
    

    return <>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Batch Config Modal"
        >
            <div style={{ textAlign: 'right' }}
                onClick={closeModal}>
                <RiCloseLargeLine
                    size='1.2em'
                    color='gray' />
            </div>
            <p style={{
                fontSize: '22px', margin: '10px', paddingBottom: '20px', textAlign: 'center', fontWeight: 'bold'
            }}>{title}</p>
            <ApprovalLineSample />
            <div style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '40px', borderBottom: '1px dashed black' }}>결재 내용 자리</div>
            {formElements.map((formElement) => (<div style={{ marginBottom: '10px' }}>
                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{formElement.elementGroupName}</p>
                {(() => {
                    switch (formElement.elementGroupType) {
                        case 'PAIR':
                            return renderPair(formElement);
                        default:
                            return (
                                <p>개발중입니다</p>
                            )
                    }
                })()}
            </div>))}
        </Modal>
    </>
}