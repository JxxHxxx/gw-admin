import React, { useEffect, useState, useRef } from "react";
import { getFailMessageQResult } from "../../../api/MessageApi";
import EmptyMsg from "../../../component/text/EmptyMsg";
import Button from "../../../component/button/Button";
import { format } from "date-fns";
import { convertBtnNumToPageNum } from "../../../util/PageSupport";
import MessageReSyncModal from "./MessageReSyncModal";
import PeriodInput from "../../../component/input/PeriodInput";
import { MessageRetryContext } from "../../../context/PaginationContext";
import Pagination, { ONE_PAGES_CONTENT_SIZE_10, PaginationContextProp } from "../../../component/pagination/Paginaton";
import DocumentUtils from "../../../util/convert/DocumentUtils";

interface MessageSyncProp {
    pk: number,
    originalMessagePk: number,
    messageDestination: string,
    messageProcessStatus: string,
    processStartTime: string,
    processEndTime: string,
    body: MessageBody
}

interface MessageBody {
    company_id?: string
    requester_id?: string
    requester_name?: string
    document_type?: string
    requestBody?: object
}

interface Pagination {
    pageNumber: number,
    totalPages: number,
    content: object[]
}

interface MessageHistSearchCond {
    endDate: string,
    startDate: string,
    endDateCorrectFlag: boolean
}

const nowDate = format(new Date(), 'yyyy-MM-dd');

export default function MessageRetryContent() {
    const [searchCond, setSearchCond] = useState<MessageHistSearchCond>({
        startDate: nowDate,
        endDate: nowDate,
        endDateCorrectFlag: true,
    });

    const [qHistPgn, setQHistPgn] = useState<PaginationContextProp<MessageSyncProp>>({
        content: [],
        pageable: {
            pageNumber: 0
        },
        totalPages: 0
    });

    const [modalOpen, setModalOpen] = useState(false);
    const searchButtonRef = useRef<HTMLButtonElement>(null); // useRef 생성

    const handleOnchangeStartDateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchCond((prev) => ({
            ...prev,
            startDate: event.target.value
        }))
    }

    const handleOnchangeEndDateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchCond((prev) => ({
            ...prev,
            endDate: event.target.value
        }))
    }

    const requestFailMessageQResult = async (pageNumber: number) => {
        const params = {
            startDate: searchCond.startDate,
            endDate: searchCond.endDate,
            page: pageNumber,
            size: ONE_PAGES_CONTENT_SIZE_10
        }

        const response = await getFailMessageQResult(params);
        setQHistPgn(response.data);
    }

    const updatePageNumber = (btnNum: number) => {
        setQHistPgn((prev: any) => ({
            ...prev,
            pageable: {
                ...prev.pageable,
                pageNumber: convertBtnNumToPageNum(btnNum)
            }
        }))
    }

    const [selectedMsgQResultPk, setSelectedMsgQResultPk] = useState<number | undefined>();

    const onClickTableRow = (msgQResultPk: number) => {
        setModalOpen(true);
        setSelectedMsgQResultPk(msgQResultPk)
    }

    useEffect(() => {
        requestFailMessageQResult(qHistPgn.pageable.pageNumber);
    }, [qHistPgn.pageable.pageNumber])

    return (
        <>
            <h3>재동기 처리</h3>
            <form>
                <PeriodInput
                    onChangeStartDate={handleOnchangeStartDateInput}
                    onChangeEndDate={handleOnchangeEndDateInput}
                />
                <Button
                    ref={searchButtonRef} // ref 연결
                    className={"bb_msg"}
                    onClick={() => requestFailMessageQResult(0)}
                    name={"검색"}
                />
            </form>
            <MessageRetryContext.Provider
                value={qHistPgn}>
                {qHistPgn.content.length > 0 ?
                    <Pagination
                        paginationContext={MessageRetryContext}
                        sendToBtnNumber={(btnNum: number) => (updatePageNumber(btnNum))}
                        columns={['MQ RESULT PK', 'Original MQ PK', '요청자 그룹', '요청자 ID', '요청자', '문서 유형', '목적지', '처리 상태', '처리 시작일시', '처리 종료일시']}
                        rows={qHistPgn.content.map(mqr => (
                            <tr key={mqr.pk} onClick={() => onClickTableRow(mqr.pk)}>
                                <td style={{width : '100px'}}>{mqr.pk}</td>
                                <td style={{width : '100px'}}>{mqr.originalMessagePk}</td>
                                <td style={{width : '75px'}}>{mqr.body.company_id ? mqr.body.company_id : mqr.body.requestBody.companyId}</td>
                                <td style={{width : '75px'}}>{mqr.body.requester_id ? mqr.body.requester_id : mqr.body.requestBody.requesterId}</td>
                                <td style={{width : '50px'}}>{mqr.body.requester_name ? mqr.body.requester_name : mqr.body.requestBody.requesterName}</td>
                                <td>{mqr.body.document_type ? DocumentUtils.convertDocumentType(mqr.body.document_type) : DocumentUtils.convertDocumentType(mqr.body.requestBody.documentType)}</td>
                                <td>{mqr.messageDestination}</td>
                                <td>{mqr.messageProcessStatus}</td>
                                <td>{mqr.processStartTime}</td>
                                <td>{mqr.processEndTime}</td>
                            </tr>
                        ))}>
                        <MessageReSyncModal modalOpen={modalOpen} setModalOpen={setModalOpen} messageQResultPk={selectedMsgQResultPk} />
                    </Pagination>
                    : <EmptyMsg msg={['메시지 큐 실패 이력이 존재하지 않습니다.', '처리 일자를 다시 입력해주세요']} />}
            </MessageRetryContext.Provider>
        </>
    );
}
