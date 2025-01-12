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
            alert('필수 값 ' + notInputFields + ' 을 입력해주세요');
            return;
        }

        const response = await ConfirmApi.createRestApiConnection(mappingApiEnrollment);
        try {
            if (response.status === 400) {
                const { data, message } = response;
                alert('에러코드:' + data.errCode +
                    "\n에러메시지:" + message);
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
                            'host': event.target.value
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
                            'port': event.target.value
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
                            'path': event.target.value
                        }))}
                    />
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
            <Input id="descriptionInput"
                className='input_wh500 ip_bgc'
                placeholder="연동 API에 대해 설명해주세요"
                onChange={(event) => setMappingApiEnrollment((prev) => ({
                    ...prev,
                    'description': event.target.value
                }))}
            />
        </li>
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
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