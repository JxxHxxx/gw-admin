import { Fragment } from "react/jsx-runtime";

import PaginationButtons from "../../../component/button/PaginationButtons";
import { getMessageQResult } from "../../../api/MessageApi";
import { useEffect, useState } from "react";

const showOnePageMessageResultAmount:number = 10; // 한 페이지에 보여줄 이력의 갯수
const showOnePageButtonAmount:number = 5; // 페이지에서 보여줄 버튼의 갯수

export default function MessageHistContent() {
    const [messageQReuslt, setMessageQResult] = useState<any>({
        pageable: {
            pageNumber: 0,
        }
    });

    const requestToServer = async () => {
        const params = {
            startDate: '2024-06-22',
            endDate: '2024-06-22',
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

    useEffect(() => {
        requestToServer();
    }, [messageQReuslt.pageable.pageNumber])

    const val = messageQReuslt.pageable.pageNumber + 1;
    const selectedNum = messageQReuslt.pageable.pageNumber + 1;
    return <Fragment>
        <tr>
            <td>PK</td>
            <td>목적지</td>
            <td>의뢰자 ID</td>
            <td>의뢰자 명</td>
            <td>처리 유형</td>
            <td>처리시작시간</td>
            <td>처리종료시간</td>
            <td>처리 상태</td>

        </tr>
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

        </>)}
        <PaginationButtons
            sendSelectedNumCallback={(pageNumber: number) => updatePageNumber(pageNumber)}
            totalPages={messageQReuslt.totalPages}
            pageNums={Array.from({ length: showOnePageButtonAmount }, (_, index) => val + index)}
            selectedNum={selectedNum}
            showOnePageButtonAmount={showOnePageButtonAmount} />
    </Fragment>
}
