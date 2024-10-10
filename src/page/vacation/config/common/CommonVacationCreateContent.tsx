import RadioDuo from "../../../../component/input/RadioDuo"
import Select from "react-select";
import { Customer, selectOption } from "../../../confirm/document/ConfirmDocumentContent";
import { useEffect, useState } from "react";
import { getCompanyCode } from "../../../../api/OrganizationApi";
import Button from "../../../../component/button/Button";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { format } from "date-fns";
import { VacationApi } from "../../../../api/VacationApi";
import { RiCloseLargeLine } from "react-icons/ri";
import ListItemV2 from "../../../../component/list/ListItemV2";
import { ko } from "date-fns/locale";
import RadioDuoV2 from "../../../../component/input/RadioDouV2";
import Input from "../../../../component/input/Input";

interface CommonVacation {
    companyId?: string
    dates: string[]
    deducted: boolean
    approval: boolean
}

interface Requester {
    departmentId: string
    departmentName: string
    requesterId: string
    requesterName: string
}

export default function CommonVacationCreateContent() {

    const [companyCodes, setCompanyCodes] = useState<Customer[]>([{ companyId: '', companyName: '' }]);
    // 고객사 정보 - 회사명 selectOptions 랜더링 함수
    const [commonVacation, setCommonVacation] = useState<CommonVacation>({
        deducted: true,
        approval: true,
        dates: []
    });

    const [requester, setRequester] = useState<Requester>({
        departmentId : '',
        departmentName : '',
        requesterId : '',
        requesterName : ''
    });

    const handleAddCommonVacationDate = (value: string): void => {
        const selectedDate = format(value, 'yyyy-MM-dd');
        if (commonVacation.dates.includes(selectedDate)) {
            alert(selectedDate + '는 이미 추가 되어 있습니다.');
            return
        }

        setCommonVacation(prev => ({
            ...prev,
            dates: [...prev.dates, selectedDate]
        }))
    }
    // 라디오 버튼 값 상태 변경 처리
    const handleChangeRadioValue = (fieldName: string, used: boolean) => {
        setCommonVacation((prev) => ({
            ...prev,
            [fieldName]: used
        }))
    }

    const handleSubtractCommonVacationDate = (event): void => {
        const commonVacationDate = event.currentTarget.getAttribute('commonVacationDate');

        setCommonVacation(prev => ({
            ...prev,
            dates: prev.dates.filter(date => date !== commonVacationDate)
        }))
    }

    const handleChangeCommonVacationCompanyId = (option: selectOption): void => {
        console.log(option.value)
        setCommonVacation(prev => ({
            ...prev,
            companyId: option.value
        }))
    }

    const requestCustomerInformation = async () => {
        const { data } = await getCompanyCode();
        if (data !== undefined) {
            setCompanyCodes(data);
        }
    }
    //계열사 코드
    const companyOptions = () => companyCodes.map(c => ({ value: c.companyId, label: c.companyName }));


    const handleAddCommonVacation = async (event?: any) => {
        event.preventDefault();
        if (!requester.departmentId || !requester.departmentName || !requester.requesterId || !requester.requesterName) {
            alert('요청자 정보를 입력해주세요');
            return;
        }

        const requestBody = {
            companyId: commonVacation.companyId,
            mustApproval: true,
            deducted: true,
            vacationDates: commonVacation.dates,
            // 테스트를 위한 코드
            requesterId: requester.requesterId,
            requesterName: requester.requesterName,
            departmentId: requester.departmentId,
            departmentName: requester.departmentName
        }
        const response = await VacationApi.addCommonVacation(requestBody);
        alert('공동 연차 등록 처리');
    }

    useEffect(() => {
        requestCustomerInformation();
    }, [])

    return <>
        <span id="cfd_title" style={{ fontSize: '24px', fontWeight: 'bold' }}>공동 연차 지정</span>
        <div style={{ marginBottom: '30px' }}></div>
        <div id="container" style={{ width: '800px', border: '1px dashed blue' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid black'
            }}>
                <div>
                    <p style={{ fontSize: '12px', margin: '0px' }}>공동 연차 지정</p>
                </div>
                <div>
                    <Button
                        className='standardBtn'
                        name='등록'
                        onClick={handleAddCommonVacation} />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'inline-block' }}>
                    <label htmlFor="company_choice" style={{ 'fontSize': '12px' }}>고객사 선택</label>
                    <Select
                        id="company_choice"
                        styles={{
                            control: (base) => ({
                                ...base,
                                width: 200,
                                fontSize: '12px'
                            }),
                        }}
                        placeholder='고객사'
                        options={companyOptions()}
                        onChange={handleChangeCommonVacationCompanyId} />
                </div>
                <div id="requesterInfoDiv">
                    <label htmlFor="requesterId" style={{ display: 'block', fontSize: '12px' }}>요청자 ID</label>
                    <Input id="requesterId"
                        placeholder="요청자 ID를 입력하세요" 
                        onChange={(event) => setRequester((prev) => ({
                            ...prev,
                            requesterId : event.target.value
                        }))}/>
                    <label htmlFor="requesterName" style={{ display: 'block', fontSize: '12px' }}>요청자</label>
                    <Input id="requesterName"
                        placeholder="요청자를 입력하세요" 
                        onChange={(event) => setRequester((prev) => ({
                            ...prev,
                            requesterName : event.target.value
                        }))}/>
                    <label htmlFor="departmentId" style={{ display: 'block', fontSize: '12px' }}>요청 부서 ID</label>
                    <Input id="departmentId"
                        placeholder="요청 부서 ID를 입력하세요" 
                        onChange={(event) => setRequester((prev) => ({
                            ...prev,
                            departmentId : event.target.value
                        }))}/>
                    <label htmlFor="departmentName" style={{ display: 'block', fontSize: '12px' }}>요청 부서</label>
                    <Input id="departmentName"
                        placeholder="요청 부서 명을 입력하세요" 
                        onChange={(event) => setRequester((prev) => ({
                            ...prev,
                            departmentName : event.target.value
                        }))}/>
                </div>
            </div>
            <div id="vacationRadioOptions" style={{ fontFamily: 'S-CoreDream-3Light' }}>
                <div style={{ marginBottom: '10px' }}>
                    <span>공동 연차 차감 여부</span>
                    <RadioDuoV2
                        checkedValue={commonVacation.deducted}
                        onChangeY={() => handleChangeRadioValue('deducted', true)}
                        onChangeN={() => handleChangeRadioValue('deducted', false)}
                        id="commonVacationDeductedRadioBtn" />
                </div>
                <div>
                    <span>결재 필요 여부</span>
                    <RadioDuoV2
                        checkedValue={commonVacation.approval}
                        onChangeY={() => handleChangeRadioValue('approval', true)}
                        onChangeN={() => handleChangeRadioValue('approval', false)}
                        id="commonVacationApprovalRadioBtn" />
                </div>
            </div>
            <div id="commonVacationDateDiv" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ marginRight: '20px' }}>
                    <p style={{ fontSize: '12px', margin: '0px' }}>공동 연차일 지정</p>
                    <Calendar
                        isMultiSelection={true}
                        formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}
                        onChange={handleAddCommonVacationDate} />
                </div>
                <div style={{ marginTop: '16px' }}>
                    {commonVacation.dates.map(date =>
                        <>
                            <ListItemV2 className="dateList">
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{format(date, 'yyyy-MM-dd (EEE)', { locale: ko })}</span>
                                    <div commonVacationDate={date}
                                        onClick={handleSubtractCommonVacationDate}>
                                        <RiCloseLargeLine
                                            style={{ cursor: 'pointer', marginTop: '2px' }}
                                            size='1.0em'
                                            color='gray' />
                                    </div>
                                </div>
                            </ListItemV2>
                        </>
                    )}
                </div>
            </div>
            <div style={{ marginBottom: '30px' }}></div>
        </div>
    </>
}