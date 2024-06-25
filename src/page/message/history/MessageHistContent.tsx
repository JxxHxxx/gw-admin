import { Fragment } from "react/jsx-runtime";

import PaginationButtons from "../../../component/button/PaginationButtons";
import { getMessageQResult } from "../../../api/MessageApi";
import { useEffect, useState } from "react";
import Table from "../../../component/table/Table";
import Input from "../../../component/input/Input";
import Button from "../../../component/button/Button";
import { convertBtnNumToPageNum } from "../../../util/PageSupport";

const showOnePageMessageResultAmount: number = 5; // 한 페이지에 보여줄 이력의 갯수
const showOnePageButtonAmount: number = 5; // 페이지에서 보여줄 버튼의 갯수

interface Pagination {
    pageNumber: number, // 페이지 인덱스 = 페이지 버튼 - 1
    totalPages: number, // 총 페이지 수
    content: object[] // 페이지에 표현할 데이터
}

interface MessageHistSearchCond {
    endDate?: string
}

export default function MessageHistContent() {
    const [qHistoryPagination, setQHistoryPagination] = useState<Pagination>({
        pageNumber: 0,
        totalPages: 0,
        content: []
    });

    const [searchCond, setSearchCond] = useState<MessageHistSearchCond>({
        endDate: ''
    });

    const fetchMessageQResult = async () => {
        const params = {
            startDate: searchCond.endDate,
            endDate: searchCond.endDate,
            size: showOnePageMessageResultAmount,
            page: qHistoryPagination.pageNumber // 현재 페이지 + 1 = 버튼 숫자
        }
        const response = await getMessageQResult(params);
        if (response.data !== undefined) {
            setQHistoryPagination((prev: Pagination) => ({
                ...prev,
                pageNumber: response.data.pageable.pageNumber,
                totalPages: response.data.totalPages,
                content: response.data.content
            }));
        }
    }

    const updatePageNumber = (btnNum: number) => {
        setQHistoryPagination((prev: any) => ({
            ...prev,
            pageNumber: convertBtnNumToPageNum(btnNum)
        }))
    }

    const handleOnClickSearchRequest = () => {
        fetchMessageQResult();
    }

    const handleOnchangeEndDateInput = (event: any) => {
        setSearchCond(() => ({
            endDate: event.target.value
        }))
    }

    useEffect(() => {
        fetchMessageQResult();
    }, [qHistoryPagination.pageNumber])

    return <Fragment>
        <Input className="bi_msg"
            minLegnth={10}
            maxLength={10}
            onChange={handleOnchangeEndDateInput}
            placeholder="처리 일자를 입력하세요" />
        <Button
            className={"bb_msg"}
            onClick={handleOnClickSearchRequest}
            name={"검색"} />
        <div style={{ 'margin': '10px' }}></div>
        <Table columns={['PK', '목적지', '의뢰자 ID', '의뢰자 명', '처리 유형', '처리 시작 시간', '처리 종료 시간', '처리 상태']}
            rows={<>
                {qHistoryPagination.content && qHistoryPagination.content.map((content: any) => <>
                    <tr key={content.pk}>
                        <td>{content.pk}</td>
                        <td>{content.messageDestination}</td>
                        <td>{content.body.requester_id}</td>
                        <td>{content.body.requester_name}</td>
                        <td>{content.messageProcessType}</td>
                        <td>{content.processStartTime}</td>
                        <td>{content.processEndTime}</td>
                        <td>{content.messageProcessStatus}</td>
                    </tr>
                </>)}</>} />
        <PaginationButtons
            sendSelectedBtnNumToParent={(pageNumber: number) => updatePageNumber(pageNumber)}
            totalPages={qHistoryPagination.totalPages}
            numOfBtnsToShow={showOnePageButtonAmount} />
    </Fragment>
}