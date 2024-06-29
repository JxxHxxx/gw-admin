import { useEffect, useState } from "react";
import { getFailMessageQResult } from "../../../api/MessageApi";
import Table from "../../../component/table/Table";
import EmptyMsg from "../../../component/text/EmptyMsg";
import Input from "../../../component/input/Input";
import Button from "../../../component/button/Button";
import PaginationButtons from "../../../component/button/PaginationButtons";
import { format } from "date-fns";
import { convertBtnNumToPageNum } from "../../../util/PageSupport";
import MessageReSyncModal from "./MessageReSyncModal";

interface Pagination {
    pageNumber: number, // 페이지 인덱스 = 페이지 버튼 - 1
    totalPages: number, // 총 페이지 수
    content: object[] // 페이지에 표현할 데이터
}

interface MessageHistSearchCond {
    endDate: string,
    startDate: string,
    endDateCorrectFlag: boolean
}

const showOnePageMessageResultAmount: number = 20; // 한 페이지에 보여줄 이력의 갯수
const showOnePageButtonAmount: number = 5; // 페이지에서 보여줄 버튼의 갯수

const nowDate = format(new Date(), 'yyyy-MM-dd');

export default function MessageRetryContent() {
    const [searchCond, setSearchCond] = useState<MessageHistSearchCond>({
        startDate: nowDate,
        endDate: nowDate,
        endDateCorrectFlag: true,
    });

    const [qHistoryPagination, setQHistoryPagination] = useState<Pagination>({
        pageNumber: 0,
        totalPages: 0,
        content: []
    });

    const [failMessageQResult, setFailMessageQResult] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);

    // 검색 버튼 클릭 이벤트
    const handleOnClickSearchRequest = (event) => {
        event.preventDefault();
        setQHistoryPagination((prev) => ({
            ...prev,
            pageNumber: 0
        }))
        requestFailMessageQResult();
    }

    const handleOnchangeStartDateInput = (event: any) => {
        setSearchCond((prev) => ({
            ...prev,
            startDate: event.target.value
        }))
    }

    const handleOnchangeEndDateInput = (event: any) => {
        setSearchCond((prev) => ({
            ...prev,
            endDate: event.target.value
        }))
    }

    const requestFailMessageQResult = async () => {
        const params = {
            startDate: searchCond.startDate,
            endDate: searchCond.endDate,
            page: 0,
            size: showOnePageMessageResultAmount
        }

        const response = await getFailMessageQResult(params);
        setFailMessageQResult(response.data.content);
    }

    const updatePageNumber = (btnNum: number) => {
        setQHistoryPagination((prev: any) => ({
            ...prev,
            pageNumber: convertBtnNumToPageNum(btnNum)
        }))
    }

    const [selectedMsgQResultPk, setSelectedMsgQResultPk] = useState();

    const onClickTableRow = (msgQResultPk:number) => {
        setModalOpen(true);
        setSelectedMsgQResultPk(msgQResultPk)
    }

    useEffect(() => {
        requestFailMessageQResult();
    }, [])
    return <>
        <h2>메시지 처리 실패 이력</h2>
        <form>
            <Input className={searchCond.endDateCorrectFlag ? "bi_msg" : "bi_msg_warning"}
                type="date"
                defaultValue={nowDate}
                onChange={handleOnchangeStartDateInput} />
            <Input className={searchCond.endDateCorrectFlag ? "bi_msg" : "bi_msg_warning"}
                type="date"
                defaultValue={nowDate}
                onChange={handleOnchangeEndDateInput} />
            <Button
                className={"bb_msg"}
                onClick={handleOnClickSearchRequest}
                name={"검색"} />
        </form>
        {failMessageQResult.length > 0 ?
            <>
                <Table columns={['MQ RESULT PK',
                    'Original MQ PK',
                    '요청자 그룹',
                    '요청자 ID',
                    '요청자',
                    '결재 문서 유형',
                    '목적지',
                    '처리 상태',
                    '처리 시작일시',
                    '처리 종료일시']}
                    rows={failMessageQResult.map(mqr => <tr
                        onClick={() => onClickTableRow(mqr.pk)}>
                        <td>{mqr.pk}</td>
                        <td>{mqr.originalMessagePk}</td>
                        <td>{mqr.body.company_id}</td>
                        <td>{mqr.body.requester_id}</td>
                        <td>{mqr.body.requester_name}</td>
                        <td>{mqr.body.document_type}</td>
                        <td>{mqr.messageDestination}</td>
                        <td>{mqr.messageProcessStatus}</td>
                        <td>{mqr.processStartTime}</td>
                        <td>{mqr.processEndTime}</td>
                    </tr>)} />
                <MessageReSyncModal modalOpen={modalOpen} setModalOpen={setModalOpen} messageQResultPk={selectedMsgQResultPk}/>
                <PaginationButtons
                    sendSelectedBtnNumToParent={(pageNumber: number) => updatePageNumber(pageNumber)}
                    totalPages={qHistoryPagination.totalPages}
                    numOfBtnsToShow={showOnePageButtonAmount} />
            </>
            :
            <>
                <EmptyMsg msg={['메시지 큐 실패 이력이 존재하지 않습니다.', '처리 일자를 다시 입력해주세요']} />
            </>
        }

    </>
}