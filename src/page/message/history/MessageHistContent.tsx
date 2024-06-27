import { Fragment } from "react/jsx-runtime";

import Modal from 'react-modal';
import PaginationButtons from "../../../component/button/PaginationButtons";
import { getMessageQResult } from "../../../api/MessageApi";
import { useEffect, useState } from "react";
import Table from "../../../component/table/Table";
import Input from "../../../component/input/Input";
import Button from "../../../component/button/Button";
import { convertBtnNumToPageNum } from "../../../util/PageSupport";
import '../../../component/text/text.css';

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

export default function MessageHistContent() {
    const [qHistoryPagination, setQHistoryPagination] = useState<Pagination>({
        pageNumber: 0,
        totalPages: 0,
        content: []
    });

    const [searchCond, setSearchCond] = useState<MessageHistSearchCond>({
        endDate: '',
        endDateCorrectFlag: true,
    });

    const formatDateString = (dateStr: string): string => {
        const trimDateStr = dateStr.trim();
        if (trimDateStr.length === 0) {
            return '';
        }
        else {
            const year = trimDateStr.substring(0, 4);
            const month = trimDateStr.substring(4, 6);
            const day = trimDateStr.substring(6, 8);
            return `${year}-${month}-${day}`
        }
    }

    const fetchMessageQResult = async () => {
        const searchDate = formatDateString(searchCond.endDate);
        if (!(searchDate.length === 10 || searchDate.length === 0)) {
            setSearchCond((prev) => ({
                ...prev,
                endDateCorrectFlag: false
            }))
            return;
        }

        const params = {
            startDate: searchDate,
            endDate: searchDate,
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

    const handleOnClickSearchRequest = (event) => {
        event.preventDefault();
        fetchMessageQResult();
    }

    const handleOnchangeEndDateInput = (event: any) => {
        setSearchCond((prev) => ({
            ...prev,
            endDateCorrectFlag: true,
            endDate: event.target.value
        }))

    }

    useEffect(() => {
        fetchMessageQResult();
    }, [qHistoryPagination.pageNumber])

    return <Fragment>
        <form>
            <Input className={searchCond.endDateCorrectFlag ? "bi_msg" : "bi_msg_warning"}
                minLegnth={8}
                maxLength={8}
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
                검색 조건에 해당 하는 결과가 존재하지 않습니다. <br/>
                다시 입력해주세요</p>}
    </Fragment>
}