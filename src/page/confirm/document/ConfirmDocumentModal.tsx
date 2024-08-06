import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { getConfirmDocumentApporovalLine, getConfirmDocumentContent, getConfirmDocumentFormElements } from '../../../api/ConfirmApi';

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

interface ConfirmDocumentProps {
    modalIsOpen: boolean
    setIsOpen: () => void
    selectedDocument: object
}

interface ConfirmDocument {
    document: {
        companyId: string
        contents: {
            title: string
        }
    },
}

export default function ConfirmDocumentModal({
    modalIsOpen,
    setIsOpen,
    selectedDocument = {} }: ConfirmDocumentProps) {

    const [confirm, setConfirm] = useState<ConfirmDocument>({
        document: {
            companyId: '',
            contents: {
                title: ''
            }
        }
    });

    const [approvalLines, setApprovalLines] = useState({});

    const [documentElement, setDocumentElement] = useState();

    function closeModal() {
        setIsOpen(false);
    }

    const requestConfirmDocumentContent = async () => {
        const response = await getConfirmDocumentContent(selectedDocument.contentPk);
        setConfirm(() => ({
            document: response.data.confirmDocument
        }));

        const response2 = await getConfirmDocumentFormElements(selectedDocument.documentType);
        setDocumentElement(response2.data.data);

        // 결재선 정보
        const response3 = await getConfirmDocumentApporovalLine(selectedDocument.confirmDocumentId);
        setApprovalLines(response3.data.data);
    }

    useEffect(() => {
        requestConfirmDocumentContent();
    }, [])

    const { contents, companyId } = confirm.document;

    return <>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="ConfirmDocument Detail Modal">
            <p style={{ fontSize: '18px', textAlign: 'center' }}>{contents.title}</p>
            <p style={{ fontWeight: 'bold' }}>결재문서 정보</p>
            <p style={{ margin: '0px' }}>고객사ID : {companyId}</p>
            <p style={{ margin: '0px' }}>부서 정보 : ID - {companyId} 명 -  {companyId}</p>

            <p style={{ fontWeight: 'bold' }}>결재자 정보</p>
            <ul style={{ padding: '0px' }}>
                {approvalLines.map(apl =>
                    <>
                        <li style={{ listStyleType: 'none' }}>결재자 : {apl.approvalName}</li>
                        <li style={{ listStyleType: 'none' }}>결재자 ID : {apl.approvalId}</li>
                    </>)}
            </ul>
        </Modal>
    </>
}