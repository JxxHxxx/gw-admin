import { useEffect, useState } from "react";
import { getFailMessageQResult } from "../../../api/MessageApi";
import Table from "../../../component/table/Table";
import { fail } from "assert";


export default function MessageRetryContent() {

    const [failMessageQResult, setFailMessageQResult] = useState([]);

    const requestFailMessageQResult = async () => {
        const params = {
            std: '2023-01-01',
            edd: '2024-12-31'
        }

        const response = await getFailMessageQResult(params);
        setFailMessageQResult(response.data.content);
    }

    useEffect(() => {
        requestFailMessageQResult();
    }, [])
    return <>
        <h2>메시지 처리 실패 이력</h2>
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
            rows={failMessageQResult.map(mqr => <tr>
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
            </tr>)}
            
            />
            
    </>
}