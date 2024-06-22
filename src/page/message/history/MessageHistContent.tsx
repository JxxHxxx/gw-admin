import { Fragment } from "react/jsx-runtime";

import PaginationButtons from "../../../component/button/PaginationButtons";
import { getMessageQResult } from "../../../api/MessageApi";
import { useEffect, useState } from "react";
import Table from "../../../component/table/Table";
import Input from "../../../component/input/Input";
import Button from "../../../component/button/Button";

const showOnePageMessageResultAmount: number = 10; // 한 페이지에 보여줄 이력의 갯수
const showOnePageButtonAmount: number = 5; // 페이지에서 보여줄 버튼의 갯수

export default function MessageHistContent() {
    const [messageQReuslt, setMessageQResult] = useState<any>({
        pageable: {
            pageNumber: 0,
        }
    });

    const [searchCond, setSearchCond] = useState<any>({
        endDate: ''
    });

    const requestToServer = async () => {
        const params = {
            startDate: searchCond.endDate,
            endDate: searchCond.endDate,
            size: showOnePageMessageResultAmount,
            page: messageQReuslt.pageable.pageNumber // 현재 페이지 + 1 = 버튼 숫자
        }
        const response = await getMessageQResult(params);
        setMessageQResult((response.data));
    }

    const updatePageNumber = (pageNumber_: number) => {
        setMessageQResult((prev: any) => ({
            ...prev,
            pageable: {
                ...prev,
                pageNumber: pageNumber_ - 1,
            }
        }))
    }

    const handleOnClickSearchRequest = () => {
        requestToServer();
    }

    const handleOnchangeEndDateInput = (event:any) => {
        setSearchCond(() => ({
            endDate : event.target.value
        }))
    }

    useEffect(() => {
        requestToServer();
    }, [messageQReuslt.pageable.pageNumber])

    const val = messageQReuslt.pageable.pageNumber + 1;
    const selectedNum = messageQReuslt.pageable.pageNumber + 1;
    return <Fragment>
        <Input className={"bi_msg"}
            minLegnth={10}
            maxLength={10}
            onChange={handleOnchangeEndDateInput}
            placeholder="처리 일자를 입력하세요" />
        <Button 
        className={"bb_msg"} 
        onClick={handleOnClickSearchRequest}
        name={"검색"}/>
        <div style={{ 'margin': '10px' }}></div>
        <Table columns={['PK', '목적지', '의뢰자 ID', '의뢰자 명', '처리 유형', '처리 시작 시간', '처리 종료 시간', '처리 상태']}
            rows={<>
                {messageQReuslt.content && messageQReuslt.content.map((content: any) => <>
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
            sendSelectedNumCallback={(pageNumber: number) => updatePageNumber(pageNumber)}
            totalPages={messageQReuslt.totalPages}
            pageNums={Array.from({ length: showOnePageButtonAmount }, (_, index) => val + index)}
            selectedNum={selectedNum}
            showOnePageButtonAmount={showOnePageButtonAmount} />
    </Fragment>
}
