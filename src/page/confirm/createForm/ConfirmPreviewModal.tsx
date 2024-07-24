
import Modal from 'react-modal';
import { RiCloseLargeLine } from "react-icons/ri";
import ApprovalLineSample from './ApprovalLineSample';
import WriterSample from './WriterSample';

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

    // 페어 타입 랜더링
    const renderPair = (formElement: FormElement) => (
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

    // 테이블 타입 랜더링
    const renderTable = (formElement: FormElement) => {
        const sortedElement = formElement.elements.slice().sort((a, b) => a.elementOrder - b.elementOrder);
        // console.log('sortedElement', sortedElement)
        return <table className='table_cfc_tb'>
            <tbody>
                <tr className='col'>
                    {sortedElement.map(element =>
                        <td style={{ textAlign: 'center' }}>{element.elementName}</td>
                    )}
                </tr>
                <tr>
                    {sortedElement.map(element =>
                        <td className='empty_row'></td>
                    )}
                </tr>
                <tr>
                    {sortedElement.map(element =>
                        <td className='empty_row'></td>
                    )}
                </tr>
            </tbody>
        </table>
    }

    // 요소 그룹들을 정렬
    const sortElementGroup = (formElements: FormElement[]) => {
        const sortedFormElements = formElements.slice().sort((a, b) => a.elementGroupOrder - b.elementGroupOrder);
        // console.log('sortedFormElements', sortedFormElements)
        return sortedFormElements.map((formElement) => (<div style={{ marginBottom: '10px' }}>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{formElement.elementGroupName}</p>
            {(() => {
                switch (formElement.elementGroupType) {
                    case 'PAIR':
                        return renderPair(formElement);
                    case 'TABLE':
                        return renderTable(formElement);
                }
            })()}
        </div>))
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
            {sortElementGroup(formElements)}
        </Modal>
    </>
}