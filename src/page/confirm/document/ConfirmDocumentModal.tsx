import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { getConfirmDocumentContent, getConfirmDocumentFormElements } from '../../../api/ConfirmApi';

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
    selectedDocument: object
}

interface contentState {
    confirmDocument: object,
    contentPk: number,
    contents: object
}

export default function ConfirmDocumentModal({
    modalIsOpen,
    setIsOpen,
    selectedDocument = {} }: ConfirmDocumentProps) {

    const [content, setContent] = useState<contentState>({
        confirmDocument: {
            documentType: ''
        },
        contentPk: 0,
        contents: {

        }
    });

    const [documentElement, setDocumentElement] = useState();

    function closeModal() {
        setIsOpen(false);
    }

    const requestConfirmDocumentContent = async () => {
        const response = await getConfirmDocumentContent(selectedDocument.contentPk);
        setContent(() => ({
            confirmDocument: response.data.confirmDocument,
            contentPk: response.data.contentPk,
            contents: response.data.contents
        }));

        const response2 = await getConfirmDocumentFormElements(selectedDocument.documentType);
        setDocumentElement(response2.data.data);
    }

    useEffect(() => {
        requestConfirmDocumentContent();
    }, [])

    return <>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="ConfirmDocument Detail Modal">
            <p>결재 문서 상세 내역 모달</p>

        </Modal>
    </>
}