import { useEffect, useState } from "react";
import { findConfirmDocumentByConfirmDocumentId, searchConfirmDocuments } from "../../../api/ConfirmApi";
import ThinBlockLine from "../../../component/util/ThinBlockLine";
import Input from "../../../component/input/Input";
import Button from "../../../component/button/Button";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import InLineBlockWrapper from "../../../component/util/InlineBlockWrapper";
import { format } from "date-fns";
import PeriodInput from "../../../component/input/PeriodInput";
import List from "../../../component/list/List";
import ListItemV2 from "../../../component/list/ListItemV2";
import { getCompanyCode, getDepartmentCode } from "../../../api/OrganizationApi";
import ConfirmDocumentSearchResult from "./ConfirmDocumentSearchResult";

interface SearchCondState {
    confirmDocumentId: string;
    requester: Requester;
    approver: Approver;
    startDate: string;
    endDate: string;
    companyId: string;
    departmentId: string;
}

interface Requester {
    requesterId: string;
    requesterName: string;
    selected: string;
}

interface Approver {
    approvalId: string;
    approvalName: string;
    selected: string;
}

enum SEARCH_TYPE {
    ID,
    ETC
}

interface SearchTypeState {
    type: SEARCH_TYPE
}

interface Customers {
    companyId: string,
    companyName: string
}

interface selectOption {
    value: string;
    label: string;
}


const animatedComponents = makeAnimated();
const nowDate = format(new Date(), 'yyyy-MM-dd');

export default function ConfirmDocumentContent() {
    // 검색 유형 state
    const [searchType, setSearchType] = useState<SearchTypeState>({
        type: SEARCH_TYPE.ID
    });
    // 검색 조건 state
    const [searchCond, setSearchCond] = useState<SearchCondState>({
        confirmDocumentId: '',
        requester: {
            requesterId: '',
            requesterName: '',
            selected: ''
        },
        approver: {
            approvalId: '',
            approvalName: '',
            selected: ''
        },
        companyId: '',
        departmentId: '',
        startDate: '',
        endDate: ''
    })
    // 검색 결과 결재 문서 state
    const [confirmDocuments, setConfirmDocuments] = useState<object[]>([
    ]);
    // 회사 코드 정보
    const [companyCodes, setCompanyCodes] = useState<Customers[]>([{ companyId: '', companyName: '' }]);
    const [departmentCodes, setDepartmentCodes] = useState([{ departmentId: '' }]);

    const requestCustomerInformation = async () => {
        const response = await getCompanyCode();
        setCompanyCodes(response.data);
    }

    const updateDepartmentCode = async (companyId: string) => {
        const response = await getDepartmentCode(companyId);
        setDepartmentCodes(response.data);
    }

    const requestSearchConfirmDocuments = async (event: any) => {
        event.preventDefault();
        const { confirmDocumentId, companyId, departmentId, startDate, endDate } = searchCond;

        const { requesterId, requesterName } = searchCond.requester;
        const { approvalId, approvalName } = searchCond.approver;

        let params;
        if (SEARCH_TYPE.ID === searchType.type) {
            if (confirmDocumentId === '') {
                alert('결재 문서 ID를 입력하세요')
                return;
            }
            const response = await findConfirmDocumentByConfirmDocumentId(confirmDocumentId);
            setConfirmDocuments(response.data.data);

        }
        else if (SEARCH_TYPE.ETC === searchType.type) {
            params = {
                'startDate': startDate,
                'endDate': endDate,
                'requesterName': requesterName,
                'requesterId': requesterId,
                'companyId': companyId,
                'departmentId': departmentId,
                'approvalId': approvalId,
                'approvalName': approvalName
            }
            const response = await searchConfirmDocuments(params);
            setConfirmDocuments(response.data.data);
        }
    }

    // fieldName 은 requester/approver 둘 중 하나 
    const handlechoiceOptions = (fieldName: string, event: any) => {
        setSearchCond((prev) => ({
            ...prev,
            [fieldName]: {
                // 이전 정보를 클리어해야 하기 때문에 prev 는 제거
                selected: event.value,
                [event.value]: ''
            }
        }))
    }

    const handleCreateTimeCond = (fieldName: string, event: any) => {
        setSearchCond((prev) => ({
            ...prev,
            [fieldName]: event.target.value
        }))
    }

    // 검색 유형을 변경했을 때 SearchCond 를 초기화 하기 위한 작업
    const handleChangeSearchType = (type: SEARCH_TYPE) => {
        setSearchType(() => ({
            type: type
        }))
        // initialize searchCond State
        setSearchCond({
            confirmDocumentId: '',
            requester: {
                requesterId: '',
                requesterName: '',
                selected: ''
            },
            approver: {
                approvalId: '',
                approvalName: '',
                selected: ''
            },
            companyId: '',
            departmentId: '',
            startDate: nowDate,
            endDate: nowDate
        })
    }

    const handleSelectInput = (event: any) => {
        setSearchCond((prev) => ({
            ...prev,
            [event.target.id]: {
                ...prev[event.target.id],
                [event.target.name]: event.target.value
            }
        }))
    }

    const handleChangeConfirmDocumentIdInput = (event: any) => {
        setSearchCond((prev) => ({
            ...prev,
            'confirmDocumentId': event.target.value
        }))
    }

    const handleSelectCompany = (option: selectOption) => {
        setSearchCond((prev) => ({
            ...prev,
            companyId: option.value
        }))
        updateDepartmentCode(option.value)
    }

    const handleSelectDeparment = (option: selectOption) => {
        setSearchCond((prev) => ({
            ...prev,
            departmentId: option.value
        }))
    }

    useEffect(() => {
        requestCustomerInformation();
    }, []);

    // 고객사 정보 - 회사명 selectOptions 랜더링 함수
    const compnayOptions = () => companyCodes.map(c => ({ value: c.companyId, label: c.companyName }));

    // 고객사 정보 - 부서명 selectOpions 랜더링 함수
    const departmenetCodeOptions = () => departmentCodes.map(dc => ({ value: dc.departmentId, label: dc.departmentName }));

    return <>
        <div id="cfd_container_900" style={{ width: '900px', border: '1px dashed red' }}>
            <span id="cfd_title" style={{ fontSize: '24px', fontWeight: 'bold' }}>결재 문서 관리</span>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <List className="list">
                    <ListItemV2
                        className={searchType.type === SEARCH_TYPE.ID ? 'mr_20 ptm ptr' : 'mr_20 nptm ptr'}
                        onClick={() => handleChangeSearchType(SEARCH_TYPE.ID)}>
                        <span>결재 문서 ID 검색</span>
                    </ListItemV2>
                    <ListItemV2
                        className={searchType.type === SEARCH_TYPE.ETC ? 'mr_20 ptm ptr' : 'mr_20 nptm ptr'}
                        onClick={() => handleChangeSearchType(SEARCH_TYPE.ETC)}>
                        <span>그 외 조건 검색</span>
                    </ListItemV2>
                </List>
            </div>
            <ThinBlockLine />
            {searchType.type === SEARCH_TYPE.ID ?
                <>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <form onSubmit={requestSearchConfirmDocuments}>
                            <label htmlFor='cdi_input' id="cdi_input" style={{ fontSize: '12px' }}>
                                결재 문서 ID
                                <div>
                                    <Input id="cdi_input" className='input_wh300 ip_bgc' placeholder="결재 문서ID를 입력해주세요"
                                        onChange={handleChangeConfirmDocumentIdInput} />
                                </div>
                            </label>
                        </form>
                    </div>
                </>
                : <>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <form onSubmit={requestSearchConfirmDocuments}>
                            <InLineBlockWrapper>
                                <div>
                                    <span style={{ 'borderBottom': '1px solid black' }}>문서 생성일</span>
                                </div>
                                <PeriodInput
                                    startDatedefaultValue={searchCond.startDate}
                                    endDatedefaultValue={searchCond.endDate}
                                    onChangeStartDate={(event) => handleCreateTimeCond('startDate', event)}
                                    onChangeEndDate={(event) => handleCreateTimeCond('endDate', event)} />
                            </InLineBlockWrapper>
                            <InLineBlockWrapper id='ci_bwr' marginRight="5px">
                                <div>
                                    <span style={{ 'borderBottom': '1px solid black' }}>고객사 정보</span>
                                </div>
                                <label htmlFor="cpy_name" style={{ 'fontSize': '12px' }}>회사명</label>
                                <Select
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            width: 200,
                                            fontSize: '12px'
                                        }),
                                    }}
                                    id="cpy_name"
                                    placeholder='고객사'
                                    components={animatedComponents}
                                    onChange={handleSelectCompany}
                                    options={compnayOptions()} />
                            </InLineBlockWrapper>
                            <InLineBlockWrapper>
                                <label htmlFor="dpm_name" style={{ 'fontSize': '12px' }}>부서명</label>
                                <Select
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            width: 200,
                                            fontSize: '12px'
                                        }),
                                    }}
                                    id="dpm_name"
                                    placeholder='부서를 선택해주세요'
                                    components={animatedComponents}
                                    onChange={handleSelectDeparment}
                                    options={departmenetCodeOptions()} />
                            </InLineBlockWrapper>
                            <div></div>
                            <InLineBlockWrapper>
                                <div style={{ 'marginBottom': '5px' }}>
                                    <span style={{ 'borderBottom': '1px solid black' }}>기안자 정보</span>
                                </div>
                                <Select
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            width: 150,

                                        }),
                                    }}
                                    id="requester"
                                    placeholder='기안자 정보'
                                    components={animatedComponents}
                                    onChange={(event) => handlechoiceOptions('requester', event)}
                                    options={[
                                        { value: 'requesterName', label: '이름' },
                                        { value: 'requesterId', label: 'ID' },
                                    ]} />
                            </InLineBlockWrapper>
                            <InLineBlockWrapper marginRight="70px">
                                <Input id="requester"
                                    className='input_wh150_thin'
                                    disabled={searchCond.requester.selected === '' ? true : false}
                                    name={searchCond.requester.selected}
                                    onChange={handleSelectInput} />
                            </InLineBlockWrapper>
                            <InLineBlockWrapper>
                                <div style={{ 'marginBottom': '5px' }}>
                                    <span style={{ 'borderBottom': '1px solid black' }}>결재자 정보</span>
                                </div>
                                <Select
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            width: 150,

                                        }),
                                    }}
                                    id="requester"
                                    placeholder='결재자 정보'
                                    components={animatedComponents}
                                    onChange={(event) => handlechoiceOptions('approver', event)}
                                    options={[
                                        { value: 'approvalName', label: '이름' },
                                        { value: 'approvalId', label: 'ID' },
                                    ]} />
                            </InLineBlockWrapper>
                            <InLineBlockWrapper>
                                <Input id="approver"
                                    className='input_wh150_thin'
                                    disabled={searchCond.approver.selected === '' ? true : false}
                                    name={searchCond.approver.selected}
                                    onChange={handleSelectInput} />
                            </InLineBlockWrapper>
                            <div style={{ 'marginTop': '20px' }}>
                                <Button onClick={requestSearchConfirmDocuments} name='결재 문서 조회' />
                            </div>
                        </form>
                    </div>
                </>}
            <div style={{ 'marginTop': '20px' }}></div>

            <div style={{ 'padding': '10px' }}></div>
            <h3 style={{ 'marginBottom': '0px' }}>조회 결과</h3>
            <ThinBlockLine />
            <ConfirmDocumentSearchResult confirmDocuments={confirmDocuments} />
        </div>
    </>
}
