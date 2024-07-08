import { useState } from "react";
import { searchConfirmDocuments } from "../../../api/ConfirmApi";
import ThinBlockLine from "../../../component/util/ThinBlockLine";
import Input from "../../../component/input/Input";
import Button from "../../../component/button/Button";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Table from "../../../component/table/Table";
import InLineBlockWrapper from "../../../component/util/InlineBlockWrapper";
import { format } from "date-fns";
import { CONFRIM_STATUS } from "../../../util/convert/ConfirmStatusConverter";
import PeriodInput from "../../../component/input/PeriodInput";

interface SearchCondState {
    confirmDocumentId: string;
    requester: Requester;
    approver: Approver;
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

interface ConfirmDocumentState {

}

const WHITE_SPACE = ''
const animatedComponents = makeAnimated();

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
        departmentId: ''
    })
    // 검색 결과 결재 문서 state
    const [confirmDocuments, setConfirmDocuments] = useState<ConfirmDocumentState>([

    ]);

    const requestSearchConfirmDocuments = async () => {
        const { confirmDocumentId, companyId, departmentId } = searchCond;

        const { requesterId, requesterName } = searchCond.requester;
        const { approvalId, approvalName } = searchCond.approver;

        let params;
        if (confirmDocumentId.trim() !== WHITE_SPACE) {
            params = {
                'confirmDocumentId': confirmDocumentId
            }
        }
        else {
            params = {
                'requesterName': requesterName,
                'requesterId': requesterId,
                'compnayId': companyId,
                'departmentId': departmentId,
                'approvalId': approvalId,
                'approvalName': approvalName
            }
        }

        const response = await searchConfirmDocuments(params);

        setConfirmDocuments(response.data.data);
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
            departmentId: ''
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
    return <>
        <h3 style={{ 'marginBottom': '0px' }}>결재 문서 관리 페이지</h3>
        <ThinBlockLine />
        <ul style={{
            'padding': '0px',
            'display': 'flex',
            'listStyleType': 'none',
            'height': '45px',
            'alignItems': 'center', // 세로축 정렬
            'justifyContent': 'left', // 가로축 정렬
            'fontSize': '15px',
        }}>
            <li style={{ 'marginRight': '20px', 'cursor': 'pointer' }}>
                <span
                    className={searchType.type === SEARCH_TYPE.ID ? 'present_menu_bkline' : 'not_present_menu'}
                    onClick={() => handleChangeSearchType(SEARCH_TYPE.ID)}
                >결재 문서 ID 검색</span>
            </li>
            <li style={{ 'marginRight': '20px', 'cursor': 'pointer' }}>
                <span className={searchType.type === SEARCH_TYPE.ETC ? 'present_menu_bkline' : 'not_present_menu'}
                    onClick={() => handleChangeSearchType(SEARCH_TYPE.ETC)}
                >그 외 조건 검색</span>
            </li>
        </ul>
        <div></div>
        {searchType.type === SEARCH_TYPE.ID ?
            <>
                <InLineBlockWrapper marginRight="20px">
                    <label htmlFor='cdi_input' id="cdi_input">
                        결재 문서 ID
                        <div>
                            <Input id="cdi_input" className='input_wh300' placeholder="결재 문서ID를 입력해주세요"
                                onChange={handleChangeConfirmDocumentIdInput} />
                        </div>
                    </label>
                </InLineBlockWrapper>
            </>
            : <>
                <InLineBlockWrapper>
                    <div>
                        <span style={{ 'borderBottom': '1px solid black' }}>문서 생성일</span>
                    </div>
                    <PeriodInput
                        onChangeStartDate={() => alert('미구현')}
                        onChangeEndDate={() => alert('미구현')} />
                </InLineBlockWrapper>
                <InLineBlockWrapper marginRight="20px">
                    <div style={{ 'marginBottom': '5px' }}>
                        <span style={{ 'borderBottom': '1px solid black' }}>고객사 정보</span>
                    </div>
                    <Select
                        styles={{
                            control: (base) => ({
                                ...base,
                                width: 250,

                            }),
                        }}
                        id="requester"
                        placeholder='회사 코드'
                        components={animatedComponents}
                        onChange={() => alert('미구현')}
                        options={[
                            { value: 'SPY', label: '스파이의료센터' },
                            { value: 'JXX', label: '제이주식회사' },
                            { value: 'BNG', label: '바바베이커리' }
                        ]} />
                </InLineBlockWrapper>
                <InLineBlockWrapper>
                    <Select
                        styles={{
                            control: (base) => ({
                                ...base,
                                width: 250,

                            }),
                        }}
                        id="requester"
                        placeholder='부서를 선택해주세요'
                        components={animatedComponents}
                        onChange={() => alert('미구현')}
                        options={[
                            { value: 'SPY00001', label: '스파이부서1' },
                            { value: 'SPY00002', label: '스파이부서2' },
                            { value: 'SPY00003', label: '스파이부서3' }
                        ]} />
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
            </>}
        <div style={{ 'marginTop': '20px' }}></div>
        <ThinBlockLine />
        <div style={{ 'marginTop': '20px' }}>
            <Button onClick={requestSearchConfirmDocuments} name='결재 문서 조회' />
        </div>
        <div style={{ 'padding': '10px' }}></div>
        <h3 style={{ 'marginBottom': '0px' }}>조회 결과</h3>
        <ThinBlockLine />
        <Table
            columns={[
                '결재 문서 ID',
                '회사 코드',
                '부서 코드',
                '부서 명',
                '기안자 ID',
                '기안자',
                '문서 유형',
                '결재 상태',
                '문서 생성 시간']}
            rows={confirmDocuments.map(cd =>
                <tr key={cd.pk}>
                    <td>{cd.confirmDocumentId}</td>
                    <td>{cd.companyId}</td>
                    <td>{cd.departmentId}</td>
                    <td>{cd.departmentName}</td>
                    <td>{cd.requesterId}</td>
                    <td>{cd.requesterName}</td>
                    <td>{cd.documentType}</td>
                    <td>{CONFRIM_STATUS[cd.confirmStatus]}</td>
                    <td>{format(cd.createTime, 'yyyy-MM-dd HH:mm:dd')}</td>
                </tr>)}
        />
    </>
}