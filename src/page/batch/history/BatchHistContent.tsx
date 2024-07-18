import { useEffect, useState } from "react";
import { getBatcJobHistory } from "../../../api/BatchApi"
import { format } from "date-fns";
import PeriodInput from "../../../component/input/PeriodInput";
import Button from "../../../component/button/Button";
import EmptyMsg from "../../../component/text/EmptyMsg";
import { convertBtnNumToPageNum } from "../../../util/PageSupport";
import Pagination, { ONE_PAGES_CONTENT_SIZE } from "../../../component/pagination/Paginaton";
import { BatchJobExecutionHistContext } from "../../../context/PaginationContext";
import ThinBlockLine from "../../../component/util/ThinBlockLine";

const nowDate = format(new Date(), 'yyyy-MM-dd');

interface JobHistState {
    jobName: string
    jobInstanceId: number,
    jobExecutionId: number,
    startTime: string,
    endTime: string,
    status: string,
    exitCode: string,
    exitMessage: string
}

export default function BatchHistContent() {
    const [jobHistCond, setJobHistCond] = useState({
        startDate: nowDate,
        endDate: nowDate,
    });

    const [jobExecPgn, setJobExecPgn] = useState<PaginationContextProp>({
        totalPages: 0,
        pageable: {
            pageNumber: 0
        },
        content: []
    });

    const requestGetBatchJobHistory = async (pageNumber: number) => {
        const params = {
            startDate: jobHistCond.startDate,
            endDate: jobHistCond.endDate,
            page: pageNumber,
            size: ONE_PAGES_CONTENT_SIZE
        }
        const response = await getBatcJobHistory(params);
        if (response.data !== undefined) {
            setJobExecPgn(response.data);
        }
    }

    const handleDateChange = (event: any, fieldName: string) => {
        setJobHistCond((prev) => ({
            ...prev,
            [fieldName]: event.target.value
        }))
    }

    const updatePageNumber = (btnNum: number) => {
        setJobExecPgn((prev: any) => ({
            ...prev,
            pageable: {
                ...prev.pageable,
                pageNumber: convertBtnNumToPageNum(btnNum)
            }
        }))
    }

    // 갱신
    useEffect(() => {
        requestGetBatchJobHistory(jobExecPgn.pageable.pageNumber);
    }, [jobExecPgn.pageable.pageNumber])

    return <>
        <div id="beh_container_1200" style={{ width: '1200px', border: '1px dashed red' }}>
            <span id="beh_title" style={{ fontSize: '24px', fontWeight: 'bold' }}>배치 실행 이력</span>
            <div style={{ margin: '20px' }}></div>
            <form>
                <PeriodInput
                    onChangeStartDate={(event) => handleDateChange(event, 'startDate')}
                    onChangeEndDate={(event) => handleDateChange(event, 'endDate')} />
                <Button
                    className={'bb'}
                    name={'검색'}
                    onClick={() => requestGetBatchJobHistory(0)} />
            </form>
            <div style={{ 'margin': '10px' }}></div>
            <BatchJobExecutionHistContext.Provider value={jobExecPgn} >
                {jobExecPgn.content.length > 0 ?
                    <Pagination
                        paginationContext={BatchJobExecutionHistContext}
                        sendToBtnNumber={(btnNum: number) => updatePageNumber(btnNum)}
                        columns={['잡 Bean 이름', '잡 실행 ID', '잡 인스턴스 ID', '시작시간', '종료시간', 'status', 'exitCode']}
                        rows={jobExecPgn.content.map(hist => (
                            <tr key={hist.jobExecutionId}>
                                <td>{hist.jobName}</td>
                                <td>{hist.jobExecutionId}</td>
                                <td>{hist.jobInstanceId}</td>
                                <td>{format(hist.startTime, 'yyyy-MM-dd HH:mm:ss')}</td>
                                <td>{format(hist.endTime, 'yyyy-MM-dd HH:mm:ss')}</td>
                                <td>{hist.status}</td>
                                <td>{hist.exitCode}</td>
                            </tr>))}>
                        <div style={{ margin: '40px' }}></div>
                    </Pagination> :
                    <EmptyMsg msg={['해당 일자에 잡 실행 내역이 존재하지 않습니다.', '처리 일자를 다시 입력해주세요']} />
                }
            </BatchJobExecutionHistContext.Provider>
        </div>
    </>
}
