import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import Button from "../../../component/button/Button";
import MainContainer from "../../../component/container/MainContainer";
import Title from "../../../component/text/Title";
import HorizontalMenu from "../../../component/division/HorizontalMenu";
import DefaultModal from "../../../component/modal/DefaultModal";
import "../../../component/pagination/pagination.css";
import Pagination, { ONE_PAGES_CONTENT_SIZE, PaginationContextProp } from "../../../component/pagination/Paginaton";
import { RestApiConnectContentContext } from "../../../context/PaginationContext";
import EmptyMsg from "../../../component/text/EmptyMsg";
import { convertBtnNumToPageNum } from "../../../util/PageSupport";
import ConfirmApi from "../../../api/ConfirmApi";
import DocumentUtils from "../../../util/convert/DocumentUtils";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import InLineBlockWrapper from "../../../component/util/InlineBlockWrapper";
import Input from "../../../component/input/Input";
import { IoAddCircleOutline, IoCloseCircleOutline } from "react-icons/io5";
import MappingApiUtil, { MappingApiPathVariable } from "./MappingApiUtil";



const HELP_MODAL_STYLES = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '600px',
        height: '400px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const ENROLL_API_MODAL_STYLES = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '660px',
        height: '460px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const animatedComponents = makeAnimated();

const INFO_MSG_STYLES = { fontSize: '14px', fontFamily: 'MaruBuri', color: 'black', fontWeight: 'bold' }

interface confirmDocumentForm {
    confirmDocumentFormPk: number
    companyId: string
    confirmDocumentFormId: string
    confirmDocumentFormName: string
    used: boolean
    createTime: string
}

interface mappingApiEnrollment {
    scheme: string
    host: string
    port: number
    methodType: string
    path: string
    requesterId: string
    description: string
    triggerType: string
    documentType: string
}

export default function MappingApiContentV2() {
    const [addRestApiConnectionModalOpen, setAddRestApiConnectionModalOpen] = useState(false);
    const [helpModalOpen, setHelpModalOpen] = useState(false);
    const [restApiConnectionOneModalOpen, setRestApiConnectionOneModalOpen] = useState(false); // 테이블 요소 클릭 시, 생성되는 모달의 상태

    const [restApiConnections, setRestApiConnections] = useState<PaginationContextProp>({
        pageable: {
            pageNumber: 0
        },
        totalpage: 0,
        content: [],
    });

    const updatePageNumber = (btnNum: number) => {
        setRestApiConnections((prev: any) => ({
            ...prev,
            pageable: {
                ...prev.pageable,
                pageNumber: convertBtnNumToPageNum(btnNum)
            }
        }))
    }
    // 결재 문서에 연동된 API 목록 호출하는 API
    const requestMappingConfirmApi = async () => {
        const params = {
            size: 3,
            page: restApiConnections.pageable.pageNumber
        }

        const { data, status } = await ConfirmApi.searchMappingConfirmApi(params);

        if (status === 200 && data !== null) {
            setRestApiConnections(data.data);
        }
    }

    const [mappingApiEnrollment, setMappingApiEnrollment] = useState<mappingApiEnrollment>(); // 결재 문서에 연동할 API 등록 정보
    const [confirmDocumentForm, setConfirmDocumentForm] = useState<confirmDocumentForm[]>(); // 결재 문서 양식

    // 결재 문서 양식 Form 조회 API - 문서 유형 SELECT 박스에서 사용
    const requestConfirmDocumentFormSelectBox = async () => {
        try {
            const { data, status } = await ConfirmApi.findConfirmForms();
            if (status === 200) {
                setConfirmDocumentForm(() => data.data);
            }
        } catch (e) {
            console.error('JX ERROR', e);
        }
    }
    // IIFE
    const initializeConfirmDoucmentFormSelectOptions = () => {
        return confirmDocumentForm?.filter((cdf) => cdf.used === true) // 사용하는 양식으로만 필터
            .sort((form1, form2) => (form2.confirmDocumentFormPk - form1.confirmDocumentFormPk)) // Pk가 큰 것 부터 상위 노출, PK가 높을수록 최근에 생성된 것
            .map((cdf) => ({
                value: cdf.confirmDocumentFormId,
                label: cdf.confirmDocumentFormName + "(" + cdf.confirmDocumentFormId + ")"
            }))

    }


    // 여기 구현 해야 합니다.
    const requestCreateRestApiConnection = async () => {
        const response = await ConfirmApi.createRestApiConnection(mappingApiEnrollment);
        console.log('tmp', response);
    }

    const handleOnchangeSelectOptions = (fieldName: string, event: any) => {
        // X 버튼 눌러서 초기화 될 때
        if (event === null) {
            setMappingApiEnrollment((prev) => ({
                ...prev,
                [fieldName]: ''
            }))
        }
        else {
            setMappingApiEnrollment((prev) => ({
                ...prev,
                [fieldName]: event.value
            }))
        }
    }

    // 최초 해당 컴포넌트를 호출했을 때만 동작
    useEffect(() => {
        requestConfirmDocumentFormSelectBox();
    }, [])
    // 페이지 이동 시, 호출
    useEffect(() => {
        requestMappingConfirmApi();
    }, [restApiConnections.pageable.pageNumber])

    return <MainContainer>
        <Title id="confirmDocumentMappingApiTitle"
            name="결재 문서 API 연동" />
        <HorizontalMenu>
            <Button className="cfc bs"
                name='API 연동 추가'
                onClick={() => setAddRestApiConnectionModalOpen(true)} />
            {/* 결재 연동 API 등록 모달 */}
            <DefaultModal
                styles={ENROLL_API_MODAL_STYLES}
                title="결재 연동 API 등록"
                isOpen={addRestApiConnectionModalOpen}
                setIsOpen={setAddRestApiConnectionModalOpen}>
                <div style={{ borderBottom: '0.02em solid gray', marginTop: '10px', marginBottom: '10px' }}></div>
                <li style={{
                    listStyle: 'none',
                    width: '628px',
                    padding: '10px',
                    border: '1px solid rgb(216, 216, 216)',
                    borderRadius: '5px',
                    marginBottom: '15px'
                }}>
                    <Title name="문서/트리거 선택"
                        style={{ fontSize: '14px', marginBottom: '10px', fontWeight: 'bold' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <InLineBlockWrapper id='ci_bwr1' marginRight="5px">
                            <Select
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        width: 300,
                                        fontSize: '12px'
                                    }),
                                    option: (base) => ({
                                        ...base,
                                        fontSize: '12px'
                                    }),
                                }}
                                components={animatedComponents}
                                placeholder="문서 유형을 선택해주세요"
                                onChange={(event) => handleOnchangeSelectOptions('documentType', event)}
                                isClearable={true}
                                options={initializeConfirmDoucmentFormSelectOptions()}>
                            </Select>
                        </InLineBlockWrapper>
                        <InLineBlockWrapper id='ci_bwr2' marginRight="5px">
                            <Select
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        width: 300,
                                        fontSize: '12px'
                                    }),
                                    option: (base) => ({
                                        ...base,
                                        fontSize: '12px'
                                    })
                                }}
                                components={animatedComponents}
                                placeholder="트리거 유형을 선택해주세요"
                                onChange={(event) => handleOnchangeSelectOptions('triggerType', event)}
                                isClearable={true}
                                options={[
                                    { value: 'FINAL_ACCEPT', label: '최종승인(FINAL_ACCPET)' },
                                    { value: 'RAISE', label: '상신(RAISE)' },
                                    { value: 'REJECT', label: '반려(REJECT)' },
                                ]}>
                            </Select>
                        </InLineBlockWrapper>
                    </div>
                </li>
                <li style={{
                    listStyle: 'none',
                    width: '628px',
                    padding: '10px',
                    border: '1px solid rgb(216, 216, 216)',
                    borderRadius: '5px',
                    marginTop: '3px',
                    marginBottom: '15px'
                }}>
                    <Title name="연동 API 정보"
                        style={{ fontSize: '14px', marginBottom: '10px', fontWeight: 'bold' }} />
                    <InLineBlockWrapper id='ci_bwr3' marginRight="5px">
                        <Select
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    width: 130,
                                    fontSize: '12px'
                                }),
                                option: (base) => ({
                                    ...base,
                                    fontSize: '12px'
                                })
                            }}
                            components={animatedComponents}
                            placeholder="프로토콜"
                            onChange={(event) => handleOnchangeSelectOptions('scheme', event)}
                            isClearable={true}
                            options={[
                                { value: 'http', label: 'http' },
                                { value: 'https', label: 'https' },
                            ]}>
                        </Select>
                    </InLineBlockWrapper>
                    <InLineBlockWrapper id='ci_bwr4' marginRight="5px">
                        <div>
                            <Input id="ipDomainInput"
                                className='input_wh200 ip_bgc'
                                placeholder="서버 IP/도메인"
                                onChange={(event) => setMappingApiEnrollment((prev) => ({
                                    ...prev,
                                    'host' : event.target.value
                                }))}
                            />
                        </div>
                    </InLineBlockWrapper>
                    <InLineBlockWrapper id='ci_bwr5' marginRight="5px">
                        <div>
                            <Input id="portInput"
                                className='input_wh75 ip_bgc'
                                placeholder="포트 번호"
                                onChange={(event) => setMappingApiEnrollment((prev) => ({
                                    ...prev,
                                    'port' : event.target.value
                                }))}
                            />
                        </div>
                    </InLineBlockWrapper>
                    <div style={{ marginBottom: '10px' }}></div>
                    <InLineBlockWrapper id='ci_bwr4' marginRight="5px">
                        <Select
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    width: 140,
                                    fontSize: '12px'
                                }),
                                option: (base) => ({
                                    ...base,
                                    fontSize: '12px'
                                })
                            }}
                            components={animatedComponents}
                            placeholder="HTTP 메서드"
                            onChange={(event) => handleOnchangeSelectOptions('methodType', event)}
                            isClearable={true}
                            options={[
                                { value: 'PATCH', label: 'PATCH' },
                                { value: 'POST', label: 'POST' },
                                { value: 'GET', label: 'GET' },
                            ]}>
                        </Select>
                    </InLineBlockWrapper>
                    <InLineBlockWrapper id='ci_bwr6' marginRight="5px">
                        <div>
                            <Input id="apiUriInput"
                                className='input_wh300 ip_bgc'
                                placeholder="ex) /api/confirms/{confirm-id}"
                                onChange={(event) => setMappingApiEnrollment((prev) => ({
                                    ...prev,
                                    'path' : event.target.value
                                }))}
                            />
                        </div>
                    </InLineBlockWrapper>
                </li>
                <div style={{ textAlign: 'center', marginTop: '100px' }}>
                    <Button name='등록'
                        className="cfc bs"
                        style={{ marginLeft: '0px', marginRight: '5px', padding: '3px 10px 3px 10px' }}
                        onClick={() => requestCreateRestApiConnection()} />
                    <Button name='취소'
                        className="cfc bs"
                        style={{ marginLeft: '0px', padding: '3px 10px 3px 10px' }}
                        onClick={() => setAddRestApiConnectionModalOpen(false)} />
                </div>
            </DefaultModal>
            <Button className="cfc bs"
                name="HELP"
                onClick={() => setHelpModalOpen(true)} />
            <DefaultModal
                styles={HELP_MODAL_STYLES}
                title="결재 연동 API 설명"
                isOpen={helpModalOpen}
                setIsOpen={setHelpModalOpen}>
                <div style={{ borderBottom: '1px solid black', marginTop: '10px' }}></div>
                <p style={INFO_MSG_STYLES}>결재 문서 유형 - 결재 양식을 의미합니다.
                    <br />양식 관리 페이지에서 결재 양식 페이지에서 존재하는 결재 양식 유형을 확인할 수 있습니다.</p>
                <p style={INFO_MSG_STYLES}>트리거 타입 - 연동 API가 호출되는 시점을 나타냅니다.
                    <br />트리거 타입은 결재 문서 상태와 관련 있습니다.</p>
                <p style={INFO_MSG_STYLES}>API PATH - 연동할 API 의 경로를 의미합니다.
                    <br />슬래시(/)로 시작해야 하며 경로 변수는 중괄호({'{' + '}'}) 안에 표현해야 합니다.</p>
            </DefaultModal>
        </HorizontalMenu>
        <div style={{ borderBottom: '1px solid gray' }}></div>
        <RestApiConnectContentContext.Provider value={restApiConnections}>
            {restApiConnections.content.length > 0 ?
                <Pagination
                    className={{
                        tableDiv: 'tableDiv topBottomMargin',
                        btnDiv: 'btnGroupDiv'
                    }}
                    paginationContext={RestApiConnectContentContext}
                    sendToBtnNumber={(btnNum: number) => updatePageNumber(btnNum)}
                    columns={['결재 문서 유형', '트리거 타입', '설명', '사용 여부']}
                    rows={<>
                        {restApiConnections.content.map((content: any) => <>
                            <tr key={content.connectionPk} onClick={() => setRestApiConnectionOneModalOpen(true)}>
                                <td>{DocumentUtils.convertDocumentType(content.documentType)}</td>
                                <td>{DocumentUtils.convertTriggerType(content.triggerType)}</td>
                                <td>{content.description}</td>
                                <td>{content.used ? '사용중' : '미사용'}</td>
                            </tr>
                        </>)}
                    </>}
                />
                : <EmptyMsg msg={['조건에 해당하는 결재 문서 연동 API 가 존재하지 않습니다', '검색 조건을 다시 입력해주세요']} />}
        </RestApiConnectContentContext.Provider>
    </MainContainer >
}