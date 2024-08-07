import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { getConfirmDocumentApporovalLine, getConfirmDocumentContent, getConfirmDocumentFormElements } from '../../../api/ConfirmApi';
import { APPROVAL_STATUS } from '../../../util/convert/ConfirmStatusConverter';
import Table from '../../../component/table/Table';
import { format } from 'date-fns';

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

interface ApprovalLines {
    approvalLinePk: number
    approvalOrder: number
    approvalName: string
    approvalId: string
    approveStatus: typeof APPROVAL_STATUS
    approveTime : string
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

    const [approvalLines, setApprovalLines] = useState<ApprovalLines[]>([]);

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
            <Table
                className='table_minicol' columns={['결재선PK', '결재 순서', '결재자 이름', '결재자 ID', '승인 여부', '승인/반려 일시']}
                rows={approvalLines.map(apl => <tr>
                    <td>{apl.approvalLinePk}</td>
                    <td>{apl.approvalOrder}</td>
                    <td>{apl.approvalName}</td>
                    <td>{apl.approvalId}</td>
                    <td>{APPROVAL_STATUS[apl.approveStatus]}</td>
                    <td>{apl.approveTime ? format(apl.approveTime, 'yyyy-MM-dd HH:mm:ss') : ''}</td>
                </tr>)}
            />
        </Modal>
    </>
}