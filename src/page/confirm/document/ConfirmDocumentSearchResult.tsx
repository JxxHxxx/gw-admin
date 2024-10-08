import { format } from "date-fns";
import Table from "../../../component/table/Table";
import { CONFRIM_STATUS } from "../../../util/convert/ConfirmStatusConverter";
import { useState } from "react";
import ConfirmDocumentModal from "./ConfirmDocumentModal";
import EmptyMsg from "../../../component/text/EmptyMsg";

export interface ConfirmDocument {
    pk: number
    contentPk: number
    documentType: string
    confirmDocumentId: string
    companyId: string
    departmentId: string
    departmentName: string
    requesterId: string
    requesterName: string
    confirmStatus: string
    createTime: string
}

interface ConfirmDocuments {
    confirmDocuments: ConfirmDocument[]
}

export default function ConfirmDocumentSearchResult({
    confirmDocuments = [] }: ConfirmDocuments) {
    const [modalIsOpen, setIsOpen] = useState(false);

    const [selectedDocument, setselectedDocument] = useState({
        contentPk: 0,
        documentType: '',
        confirmDocumentId : '',
        companyId : ''
    });


    const handleOnClickConfrimDocumentRow = (confirmDocument: ConfirmDocument) => {
        setIsOpen(true);
        setselectedDocument(() => ({
            contentPk: confirmDocument.contentPk,
            documentType: confirmDocument.documentType,
            confirmDocumentId : confirmDocument.confirmDocumentId,
            companyId : confirmDocument.companyId
        }));
    }

    return <>
        {confirmDocuments.length > 0
            ? <Table
                columns={['결재 문서 ID', '회사 코드', '부서 코드', '부서 명', '기안자 ID', '기안자', '문서 유형', '결재 상태', '문서 생성 시간']}
                rows={confirmDocuments.map(cd =>
                    <tr key={cd.pk}
                        style={{ 'fontSize': '14px' }}
                        onClick={() => handleOnClickConfrimDocumentRow(cd)}>
                        <td style={{ cursor: 'default' }} >{cd.confirmDocumentId}</td>
                        <td>{cd.companyId}</td>
                        <td>{cd.departmentId}</td>
                        <td>{cd.departmentName}</td>
                        <td>{cd.requesterId}</td>
                        <td>{cd.requesterName}</td>
                        <td>{cd.documentType}</td>
                        <td>{CONFRIM_STATUS[cd.confirmStatus]}</td>
                        <td>{format(cd.createTime, 'yyyy-MM-dd HH:mm:dd')}</td>
                    </tr>)}
            />
            : <EmptyMsg msg={['조건에 해당 하는 결재 문서가 존재하지 않습니다.']} />}
        {modalIsOpen && <ConfirmDocumentModal
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            selectedDocument={selectedDocument} />}
    </>
}