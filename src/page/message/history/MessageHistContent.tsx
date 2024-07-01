import { Fragment } from "react/jsx-runtime";

import PaginationButtons from "../../../component/button/PaginationButtons";
import { getMessageQResult } from "../../../api/MessageApi";
import { useEffect, useRef, useState } from "react";
import Table from "../../../component/table/Table";
import Input from "../../../component/input/Input";
import Button from "../../../component/button/Button";
import { convertBtnNumToPageNum } from "../../../util/PageSupport";
import '../../../component/text/text.css';
import { format } from "date-fns";

const showOnePageMessageResultAmount: number = 5; // 한 페이지에 보여줄 이력의 갯수
const showOnePageButtonAmount: number = 5; // 페이지에서 보여줄 버튼의 갯수

interface Pagination {
    pageNumber: number, // 페이지 인덱스 = 페이지 버튼 - 1
    totalPages: number, // 총 페이지 수
    content: object[] // 페이지에 표현할 데이터
}

interface MessageHistSearchCond {
    endDate: string,
    endDateCorrectFlag: boolean
}

const nowDate = format(new Date(), 'yyyy-MM-dd');
export default function MessageHistContent() {
    console.log('render');
    const [qHistoryPagination, setQHistoryPagination] = useState<Pagination>({
        pageNumber: 0,
        totalPages: 0,
        content: []
    });

    const searchCondRef = useRef<String>(nowDate);

    const fetchMessageQResult = async () => {
        const params = {
            startDate: searchCondRef.current,
            endDate: searchCondRef.current,
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

    // 검색 버튼 클릭 이벤트
    const handleOnClickSearchRequest = (event) => {
        event.preventDefault();
        setQHistoryPagination((prev) => ({
            ...prev,
            pageNumber: 0
        }))
        fetchMessageQResult();
    }

    const handleOnchangeEndDateInput = (event: any) => {
        searchCondRef.current = event.target.value;
    }

    useEffect(() => {
        fetchMessageQResult();
    }, [qHistoryPagination.pageNumber])

    return <Fragment>
        <form onSubmit={handleOnClickSearchRequest}>
            <Input className={true ? "bi_msg" : "bi_msg_warning"}
                minLegnth={10}
                maxLength={10}
                onChange={handleOnchangeEndDateInput}
                placeholder="처리 일자를 입력하세요 ex) 20240625" />
            <Button
                className={"bb_msg"}
                onClick={handleOnClickSearchRequest}
                name={"검색"} />
        </form>
        <div style={{ 'margin': '10px' }}></div>
        {qHistoryPagination.content.length > 0
            ? <>
                <Table columns={['PK', '목적지', '의뢰자 ID', '의뢰자 명', '처리 유형', '처리 시작 시간', '처리 종료 시간', '처리 상태']}
                    rows={<>
                        {qHistoryPagination.content.map((content: any) => <>
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
            </>
            : <p className='fade-in-text'
                style={{ 'fontSize': '14px', 'color': 'gray' }}>
                메시지 큐 결과가 존재하지 않습니다. <br />
                처리 일자를 다시 입력해주세요</p>}
    </Fragment>
}