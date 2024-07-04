import { useEffect, useState } from "react";
import { getBatcJobHistory } from "../../../api/BatchApi"
import { format } from "date-fns";
import PeriodInput from "../../../component/input/PeriodInput";
import Button from "../../../component/button/Button";
import Table from "../../../component/table/Table";
import PaginationButtons from "../../../component/button/PaginationButtons";
import EmptyMsg from "../../../component/text/EmptyMsg";
import { BUTTON_SIZE } from "../../../domain/pagination/Pagination";
import { convertBtnNumToPageNum } from "../../../util/PageSupport";

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

    const [pagination, setPagination] = useState({
        totalPages : 0,
        pageNumber: 0,
        content: []
    });

    const [jobHistRes, setJobHistRes] = useState<JobHistState[]>([]);

    const request = async () => {
        const params = {
            startDate: jobHistCond.startDate,
            endDate: jobHistCond.endDate,
            page: pagination.pageNumber,
            size: 5
        }
        const response = await getBatcJobHistory(params);
        setJobHistRes(response.data.content);
        setPagination((prev) => ({
            ...prev,
            totalPages: response.data.totalPages,
            pageNumber: response.data.pageable.pageNumber,
            content: response.data.content
        }));
    }

    const handleDateChange = (event: any, fieldName: string) => {
        setJobHistCond((prev) => ({
            ...prev,
            [fieldName]: event.target.value
        }))
    }

    const handleRequestSearch = () => {
        request();
    }

    const updatePageNumber = (btnNum: number) => {
        setPagination((prev: any) => ({
            ...prev,
            pageNumber: convertBtnNumToPageNum(btnNum)
        }))
    }

    // 갱신
    useEffect(() => {
        request();
    }, [pagination.pageNumber])

    return <>
        <h3 style={{ 'marginBottom': '0px' }}>배치 실행 이력 조회</h3>
        <div style={{ 'marginBottom': '18px', 'borderTop': '1px solid black' }}></div>
        <form>
            <PeriodInput
                onChangeStartDate={(event) => handleDateChange(event, 'startDate')}
                onChangeEndDate={(event) => handleDateChange(event, 'endDate')} />
            <Button
                className={'bb'}
                name={'검색'}
                onClick={handleRequestSearch} />
        </form>
        <div style={{ 'margin': '10px' }}></div>
        {pagination.content.length > 0
            ? <>
                <Table columns={[
                    '잡 Bean 이름',
                    '잡 실행 ID',
                    '잡 인스턴스 ID',
                    '잡 실행 시작일시',
                    '잡 실행 종료일시',
                    'status',
                    'exitCode']}
                    rows={<>
                        {pagination.content.map(hist => (<tr key={hist.jobExecutionId}>
                            <td>{hist.jobName}</td>
                            <td>{hist.jobExecutionId}</td>
                            <td>{hist.jobInstanceId}</td>
                            <td>{format(hist.startTime, 'yyyy-mm-dd hh:mm:ss')}</td>
                            <td>{format(hist.endTime, 'yyyy-mm-dd hh:mm:ss')}</td>
                            <td>{hist.status}</td>
                            <td>{hist.exitCode}</td>
                        </tr>))}
                    </>}></Table>
                <PaginationButtons 
                totalPages={pagination.totalPages} 
                numOfBtnsToShow={BUTTON_SIZE}
                sendSelectedBtnNumToParent={(pageNumber:number) => updatePageNumber(pageNumber)}/>
            </>
            : <EmptyMsg msg={['해당 일자에 잡 실행 내역이 존재하지 않습니다.', '처리 일자를 다시 입력해주세요']} />
        }
    </>
}