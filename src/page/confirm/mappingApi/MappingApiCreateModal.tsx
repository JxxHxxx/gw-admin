import Button from "../../../component/button/Button";
import DefaultModal from "../../../component/modal/DefaultModal";
import InLineBlockWrapper from "../../../component/util/InlineBlockWrapper";
import Title from "../../../component/text/Title";
import makeAnimated from 'react-select/animated';
import Input from "../../../component/input/Input";
import { useEffect, useState } from "react";
import ConfirmApi from "../../../api/ConfirmApi";
import Select from "react-select";

const ENROLL_API_MODAL_STYLES = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '660px',
        height: '560px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

interface ConfirmDocumentForm {
    confirmDocumentFormPk: number
    companyId: string
    confirmDocumentFormId: string
    confirmDocumentFormName: string
    used: boolean
    createTime: string
}

interface MappingApiEnrollment {
    scheme: string
    host: string
    port?: number
    methodType: string
    path: string
    requesterId: string
    description: string
    triggerType: string
    documentType: string
}

const animatedComponents = makeAnimated();

export default function MappingApiCreateModal({ isOpen, setIsOpen }) {
    const [mappingApiEnrollment, setMappingApiEnrollment] = useState<MappingApiEnrollment>({
        scheme: '',
        host: '',
        port: undefined,
        methodType: '',
        path: '',
        requesterId: '',
        description: '',
        triggerType: '',
        documentType: ''
    }); // 결재 문서에 연동할 API 등록 정보
    const [confirmDocumentForm, setConfirmDocumentForm] = useState<ConfirmDocumentForm[]>(); // 결재 문서 양식

    // IIFE
    const initializeConfirmDoucmentFormSelectOptions = () => {
        return confirmDocumentForm?.filter((cdf) => cdf.used === true) // 사용하는 양식으로만 필터
            .sort((form1, form2) => (form2.confirmDocumentFormPk - form1.confirmDocumentFormPk)) // Pk가 큰 것 부터 상위 노출, PK가 높을수록 최근에 생성된 것
            .map((cdf) => ({
                value: cdf.confirmDocumentFormId,
                label: cdf.confirmDocumentFormName + "(" + cdf.confirmDocumentFormId + ")"
            }))

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

    const handleOnChangeInput = (fieldName: string, event: any) => {
        setMappingApiEnrollment((prev: MappingApiEnrollment) => ({
            ...prev,
            [fieldName]: event.target.value
        }))
    }

    const requestCreateRestApiConnection = async () => {
        const notInputFields = Object.entries(mappingApiEnrollment)
            .filter(([key]) => !['description', 'requesterId'].includes(key)) // description, requesterId 필드는 검증 제외
            .filter(([_, value]) => value === undefined || (typeof value === 'string' && value.trim() === ''))
            .map(([key]) => key);


        if (notInputFields.length > 0) {
            alert('필수 값 ' + notInputFields + ' 을 설정하세요');
            return;
        }

        const response = await ConfirmApi.createRestApiConnection(mappingApiEnrollment);
        try {
            if (response.status === 400) {

                const { data, message } = response;
                const { documentType, triggerType } = mappingApiEnrollment;
                if (data.errCode === 'RCF10') {
                    alert('문서 유형 코드:' + documentType + '/트리거 유형 코드:' + triggerType + '은 이미 존재합니다.')
                }
            }
        }
        catch (e) {
            alert('등록할 수 없습니다. 관리자에게 문의하세요')
        }
    }

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

    useEffect(() => {
        requestConfirmDocumentFormSelectBox();
    }, [])

    // 모달 창 열리고 닫힐 때 상태 초기화
    useEffect(() => {
        setMappingApiEnrollment({
            scheme: '',
            host: '',
            port: undefined,
            methodType: '',
            path: '',
            requesterId: '',
            description: '',
            triggerType: '',
            documentType: ''
        })
    }, [isOpen])

    return <DefaultModal
        styles={ENROLL_API_MODAL_STYLES}
        title="결재 연동 API 등록"
        isOpen={isOpen}
        setIsOpen={setIsOpen}>
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
                            control: (base, state) => ({
                                ...base,
                                width: 300,
                                fontSize: '12px',
                                border: state.isFocused ? '1px solid rgb(0, 40, 94)' : '1px solid #DEDEDE',
                                boxShadow: state.isFocused ? 0 : 0,
                                '&:hover': {
                                    border: state.isFocused ? '1px solid rgb(0, 40, 94)' : '1px solid #DEDEDE'
                                }
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
                            control: (base, state) => ({
                                ...base,
                                width: 300,
                                fontSize: '12px',
                                border: state.isFocused ? '1px solid rgb(0, 40, 94)' : '1px solid #DEDEDE',
                                boxShadow: state.isFocused ? 0 : 0,
                                '&:hover': {
                                    border: state.isFocused ? '1px solid rgb(0, 40, 94)' : '1px solid #DEDEDE'
                                }
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
                <label>프로토콜
                    <Select
                        styles={{
                            control: (base, state) => ({
                                ...base,
                                width: 130,
                                fontSize: '12px',
                                border: state.isFocused ? '1px solid rgb(0, 40, 94)' : '1px solid #DEDEDE',
                                boxShadow: state.isFocused ? 0 : 0,
                                '&:hover': {
                                    border: state.isFocused ? '1px solid rgb(0, 40, 94)' : '1px solid #DEDEDE'
                                }
                            }),
                            option: (base) => ({
                                ...base,
                                fontSize: '12px'
                            })
                        }}
                        components={animatedComponents}
                        placeholder="protocol"
                        onChange={(event) => handleOnchangeSelectOptions('scheme', event)}
                        isClearable={true}
                        options={[
                            { value: 'http', label: 'http' },
                            { value: 'https', label: 'https' },
                        ]}>
                    </Select>
                </label>
            </InLineBlockWrapper>
            <InLineBlockWrapper id='ci_bwr4' marginRight="5px">
                <label htmlFor="ipDomainInput">IP/도메인
                    <div>
                        <Input id="ipDomainInput"
                            className='ip_bgc'
                            style={{ width: '394px', height: '35px' }}
                            placeholder="ex) gw.jxxcloud.com"
                            onChange={(event) => setMappingApiEnrollment((prev) => ({
                                ...prev,
                                'host': event.target.value
                            }))}
                        />
                    </div>
                </label>
            </InLineBlockWrapper>
            <InLineBlockWrapper id='ci_bwr5' marginRight="5px">
                <div>
                    <label htmlFor="portInput">포트 번호
                        <div>
                            <Input id="portInput"
                                className='input_wh75 ip_bgc'
                                placeholder="port"
                                onChange={(event) => setMappingApiEnrollment((prev) => ({
                                    ...prev,
                                    'port': event.target.value
                                }))}
                            />
                        </div>
                    </label>
                </div>
            </InLineBlockWrapper>
            <div style={{ marginBottom: '10px' }}></div>
            <InLineBlockWrapper id='ci_bwr4' marginRight="5px">
                <label>HTTP 메서드
                    <Select id="httpMethodSelectOpt"
                        styles={{
                            control: (base, state) => ({
                                ...base,
                                width: 140,
                                fontSize: '12px',
                                border: state.isFocused ? '1px solid rgb(0, 40, 94)' : '1px solid #DEDEDE',
                                boxShadow: state.isFocused ? 0 : 0,
                                '&:hover': {
                                    border: state.isFocused ? '1px solid rgb(0, 40, 94)' : '1px solid #DEDEDE'
                                }
                            }),
                            option: (base) => ({
                                ...base,
                                fontSize: '12px'
                            })
                        }}
                        components={animatedComponents}
                        placeholder="HTTP Method"
                        onChange={(event) => handleOnchangeSelectOptions('methodType', event)}
                        isClearable={true}
                        options={[
                            { value: 'PATCH', label: 'PATCH' },
                            { value: 'POST', label: 'POST' },
                            { value: 'GET', label: 'GET' },
                        ]}>
                    </Select>
                </label>
            </InLineBlockWrapper>
            <InLineBlockWrapper id='ci_bwr6' marginRight="5px">
                <div>
                    <label>API URL
                        <div>
                            <Input id="apiUriInput"
                                className='ip_bgc'
                                style={{ width: '470px', height: '35px' }}
                                placeholder="ex) /api/confirms/{confirm-id}"
                                onChange={(event) => setMappingApiEnrollment((prev) => ({
                                    ...prev,
                                    'path': event.target.value
                                }))}
                            />
                        </div>
                    </label>
                </div>
            </InLineBlockWrapper>
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
            <Title name="연동 API 설명"
                style={{ fontSize: '14px', marginBottom: '10px', fontWeight: 'bold' }} />
            <textarea
                style={{
                    width: '615px',
                    height: '175px',
                    fontFamily: 'MaruBuri'
                }}
                onFocus={(event) => event.target.style.border = '1px solid rgb(0, 40, 94)'}
                onBlur={(event) => event.target.style.border = '1px solid #DEDEDE'}
                placeholder="결재 문서에 연동되는 API에 대해 설명해주세요"
                onChange={(event) => setMappingApiEnrollment((prev) => ({
                    ...prev,
                    'description': event.target.value
                }))}>
            </textarea>
        </li>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <Button name='등록'
                className="cfc bs"
                style={{ marginLeft: '0px', marginRight: '5px', padding: '3px 10px 3px 10px' }}
                onClick={() => requestCreateRestApiConnection()} />
            <Button name='취소'
                className="cfc bs"
                style={{ marginLeft: '0px', padding: '3px 10px 3px 10px' }}
                onClick={() => setIsOpen(false)} />
        </div>
    </DefaultModal>
}