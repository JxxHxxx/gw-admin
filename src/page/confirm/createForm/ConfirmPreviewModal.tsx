
import Modal from 'react-modal';
import { RiCloseLargeLine } from "react-icons/ri";
import ApprovalLineSample from './ApprovalLineSample';
import WriterSample from './WriterSample';
import OneConfirmContent from '../document/OneConfirmContent';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '750px',
        height: '700px',
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
    elementGroupOrder: number,
    elements: Element[]
}

interface Element {
    elementName: string,
    elementOrder: number
}


export default function ConfirmPreviewModal({
    modalIsOpen,
    setIsOpen,
    title,
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
            <div style={{ textAlign: 'right' }}
                onClick={closeModal}>
                <RiCloseLargeLine
                    style={{cursor : 'pointer'}}
                    size='1.2em'
                    color='gray' />
            </div>
            <p style={{
                fontSize: '22px', margin: '10px', paddingBottom: '20px', textAlign: 'center', fontWeight: 'bold'
            }}>{title}</p>

            <div style={{ marginBottom: '60px', display: 'flex', justifyContent: 'space-between' }}>
                <WriterSample />
                <ApprovalLineSample />
            </div>

            <div style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '40px', borderBottom: '1px dashed black' }}>결재 내용 자리</div>
            <OneConfirmContent formElements={formElements}/>
        </Modal>
    </>
}