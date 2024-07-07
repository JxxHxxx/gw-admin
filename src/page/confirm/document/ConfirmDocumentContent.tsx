import { useState } from "react";
import { searchConfirmDocuments } from "../../../api/ConfirmApi";
import ThinBlockLine from "../../../component/util/ThinBlockLine";
import Input from "../../../component/input/Input";
import Button from "../../../component/button/Button";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Table from "../../../component/table/Table";
import InLineBlockWrapper from "../../../component/util/InlineBlockWrapper";
import List from "../../../component/list/List";
import { format } from "date-fns";

interface searchCondState {
    confirmDocumentId: string;
    requester: object;
    companyId: string;
    departmentId: string;
}

enum SEARCH_TYPE {
    ID,
    ETC
}

interface searchTypeState {
    type: SEARCH_TYPE
}

const WHITE_SPACE = ''
const animatedComponents = makeAnimated();
const NOW_DATE = format(new Date(), 'yyyy-MM-dd');

export default function ConfirmDocumentContent() {

    // 검색 유형 state
    const [searchType, setSearchType] = useState<searchTypeState>({
        type: SEARCH_TYPE.ID
    });
    // 검색 조건 state
    const [searchCond, setSearchCond] = useState<searchCondState>({
        confirmDocumentId: '',
        requester: {
            requesterId: '',
            requesterName: '',
            selected:''
        },
        companyId: '',
        departmentId: ''
    })
    // 검색 결과 결재 문서 state
    const [confirmDocuments, setConfirmDocuments] = useState();

    const requestSearchConfirmDocuments = async () => {
        const {
            confirmDocumentId,
            companyId,
            departmentId} = searchCond;

        const {requesterId, requesterName}  = searchCond.requester;

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

            }
        }

        const response = await searchConfirmDocuments(params);

        setConfirmDocuments(response.data);
    }

    const handleRequesterSearchOptions = (event: any) => {
        setSearchCond((prev) => ({
            ...prev,
            requester : {
                // 이전 정보를 클리어해야 하기 때문에 prev 는 제거
                selected: event.value,
                [event.value] : ''
            }
        }))
    }

    const handleRequesterSearchInput = (event: any) => {
        console.log(event.target.name)
        setSearchCond((prev) => ({
            ...prev,
            requester : {
                ...prev.requester,
                [event.target.name] : event.target.value
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
                <span className={searchType.type === SEARCH_TYPE.ID ? 'present_menu_bkline' : 'not_present_menu'} onClick={() => setSearchType(() => ({
                    type: SEARCH_TYPE.ID
                }))}
                >결재 문서 ID 검색</span>
            </li>
            <li style={{ 'marginRight': '20px', 'cursor': 'pointer' }}>
                <span className={searchType.type === SEARCH_TYPE.ETC ? 'present_menu_bkline' : 'not_present_menu'} onClick={() => setSearchType(() => ({
                    type: SEARCH_TYPE.ETC
                }))}
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
                <InLineBlockWrapper marginRight="20px">
                    <label htmlFor='cdi_input' id="cdi_input">
                        시작일
                        <div>
                            <Input id="cdi_input"
                                className='input_wh200'
                                type='date'
                                defaultValue={NOW_DATE}
                                onChange={handleChangeConfirmDocumentIdInput} />
                        </div>
                    </label>
                </InLineBlockWrapper>
                <InLineBlockWrapper marginRight="20px">
                    <label htmlFor='cdi_input' id="cdi_input">
                        종료일
                        <div>
                            <Input id="cdi_input"
                                className='input_wh200'
                                type='date'
                                defaultValue={NOW_DATE}
                                onChange={handleChangeConfirmDocumentIdInput} />
                        </div>
                    </label>
                </InLineBlockWrapper>
                <InLineBlockWrapper marginRight="20px">
                    <label htmlFor='cdi_input' id="cdi_input">
                        회사 코드
                        <div>
                            <Input id="cdi_input" className='input_wh200' placeholder="회사 코드 명을 입력해주세요"
                                onChange={handleChangeConfirmDocumentIdInput} />
                        </div>
                    </label>
                </InLineBlockWrapper>
                <InLineBlockWrapper>
                    <label htmlFor="rqeuster" id="requester">
                        기안자
                        <Select
                            id="requester"
                            placeholder='기안자 정보'
                            components={animatedComponents}
                            onChange={handleRequesterSearchOptions}
                            options={[
                                { value: 'requesterName', label: '이름' },
                                { value: 'requesterId', label: 'ID' },
                            ]} />
                    </label>
                </InLineBlockWrapper>
                <InLineBlockWrapper>
                    <Input id="requester"
                        className='input_wh200'
                        name={searchCond.requester.selected}
                        onChange={handleRequesterSearchInput} />
                </InLineBlockWrapper>
            </>}

        <div style={{ 'marginTop': '100px' }}>
            <Button onClick={requestSearchConfirmDocuments} name='결재 문서 조회' />
        </div>
        <div style={{ 'padding': '50px' }}></div>
        <h3 style={{ 'marginBottom': '0px' }}>조회 결과</h3>
        <ThinBlockLine />
        <Table columns={['결재 문서 ID', '회사 코드', '부서 코드', '기안자', '문서 유형', '결재 상태', '문서 생성 시간']} />
    </>
}