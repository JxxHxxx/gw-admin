import { Fragment } from "react/jsx-runtime";

import PaginationButtons from "../../../component/button/PaginationButtons";
import { getMessageQResult } from "../../../api/MessageApi";
import { useEffect, useState } from "react";

export default function MessageHistContent() {
    const [messageQReuslt, setMessageQResult] = useState<any>({
        pageable: {
            pageNumber: 0,
        }
    });

    const requestToServer = async () => {
        const params = {
            startDate: '2024-06-21',
            endDate: '2024-06-21',
            size: 5,
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
                pageNumber: pageNumber_,
            }
        }))
    }

    console.log('result', messageQReuslt.content);

    useEffect(() => {
        requestToServer();
    }, [messageQReuslt.pageable.pageNumber])

    const val = messageQReuslt.pageable.pageNumber + 1;
    const selectedNum = messageQReuslt.pageable.pageNumber + 1;
    return <Fragment>
        <tr>
            <td>PK</td>
            <td>목적지</td>
            <td>처리시작시간</td>
            <td>처리종료시간</td>
        </tr>
        {messageQReuslt.content && messageQReuslt.content.map((content: any) => <>
            <tr>
                <td>{content.pk}</td>
                <td>{content.messageDestination}</td>
                <td>{content.processStartTime}</td>
                <td>{content.processEndTime}</td>
            </tr>

        </>)}
        <PaginationButtons
            selectedNumCallback={(num: number) => updatePageNumber(num)}
            pageNums={Array.from({ length: 5 }, (_, index) => val + index)}
            selectedNum={selectedNum}
            showOnePageButtonAmount={5} />
    </Fragment>
}
