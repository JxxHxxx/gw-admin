import { Fragment } from "react/jsx-runtime";

import { getMessageQResult } from "../../../api/MessageApi";
import { useEffect, useRef, useState } from "react";
import Input from "../../../component/input/Input";
import Button from "../../../component/button/Button";
import { convertBtnNumToPageNum } from "../../../util/PageSupport";
import '../../../component/text/text.css';
import { format } from "date-fns";
import EmptyMsg from "../../../component/text/EmptyMsg";
import { MessageRetryContext } from "../../../context/PaginationContext";
import { ONE_PAGES_CONTENT_SIZE, PaginationContextProp } from "../../../component/pagination/Paginaton";
import Pagination from "../../../component/pagination/Paginaton";

const nowDate = format(new Date(), 'yyyy-MM-dd');

export default function MessageHistContent() {
    const [msgHistoryPgn, setMsgHistoryPgn] = useState<PaginationContextProp>({
        pageable: {
            pageNumber: 0
        },
        totalpage : 0,
        content: [],
        
    });

    const searchCondRef = useRef<string>(nowDate);

    const fetchMessageQResult = async () => {
        const params = {
            startDate: searchCondRef.current,
            endDate: searchCondRef.current,
            size: ONE_PAGES_CONTENT_SIZE,
            page: msgHistoryPgn.pageable.pageNumber // 현재 페이지 + 1 = 버튼 숫자
        }
        const response = await getMessageQResult(params);

        if (response.data !== undefined) {
            setMsgHistoryPgn(response.data);
        }
    }

    const updatePageNumber = (btnNum: number) => {
        setMsgHistoryPgn((prev: any) => ({
            ...prev,
            pageable: {
                ...prev.pageable,
                pageNumber: convertBtnNumToPageNum(btnNum)
            }
        }))
    }

    // 검색 버튼 클릭 이벤트 => 모든 정보 초기화 후
    const handleRequestSearchResult = async (event: any) => {
        event.preventDefault();
        const params = {
            startDate: searchCondRef.current,
            endDate: searchCondRef.current,
            size: ONE_PAGES_CONTENT_SIZE,
            page: 0 // 현재 페이지 + 1 = 버튼 숫자
        }
        const response = await getMessageQResult(params);

        if (response.data !== undefined) {
            setMsgHistoryPgn(response.data);
        }
    }

    const handleOnchangeEndDateCond = (event: any) => {
        searchCondRef.current = event.target.value;
    }

    useEffect(() => {
        fetchMessageQResult();
    }, [msgHistoryPgn.pageable.pageNumber])

    return <Fragment>
        <h3>메시지 처리 이력</h3>
        <form onSubmit={handleRequestSearchResult}>
            <Input className={true ? "bi_msg" : "bi_msg_warning"}
                minLegnth={8}
                maxLength={10}
                onChange={handleOnchangeEndDateCond}
                placeholder="처리 일자를 입력하세요 ex) 20240625" />
            <Button
                className={"bb_msg"}
                onClick={handleRequestSearchResult}
                name={"검색"} />
        </form>
        <div style={{ 'margin': '10px' }}></div>
        <MessageRetryContext.Provider value={msgHistoryPgn}>
            {msgHistoryPgn.content.length > 0
                ? <Pagination
                    paginationContext={MessageRetryContext}
                    sendToBtnNumber={(btnNum: number) => updatePageNumber(btnNum)}
                    columns={['PK', '목적지', '의뢰자 ID', '의뢰자 명', '처리 유형', '처리 시작 시간', '처리 종료 시간', '처리 상태']}
                    rows={<>
                        {msgHistoryPgn.content.map((content: any) => <>
                            <tr key={content.pk}>
                                <td>{content.pk}</td>
                                <td>{content.messageDestination}</td>
                                <td>{content.body.requester_id}</td>
                                <td>{content.body.requester_name}</td>
                                <td>{content.messageProcessType}</td>
                                <td>{format(content.processStartTime, 'yyyy-MM-dd HH:mm:ss')}</td>
                                <td>{format(content.processEndTime, 'yyyy-MM-dd HH:mm:ss')}</td>
                                <td>{content.messageProcessStatus}</td>
                            </tr>
                        </>)}</>} />

                : <EmptyMsg msg={['메시지 큐 결과가 존재하지 않습니다.', '처리 일자를 다시 입력해주세요']} />
            }
        </MessageRetryContext.Provider>
    </Fragment>
}