import { useEffect, useState } from "react";
import Pagination from "../../../component/pagination/Paginaton";
import EmptyMsg from "../../../component/text/EmptyMsg";
import { RestApiConnectContentContext } from "../../../context/PaginationContext";
import { convertBtnNumToPageNum } from "../../../util/PageSupport";
import DocumentUtils from "../../../util/convert/DocumentUtils";
import ConfirmApi from "../../../api/ConfirmApi";
import DefaultModal from "../../../component/modal/DefaultModal";
import Input from "../../../component/input/Input";
import Button from "../../../component/button/Button";
import Select from "react-select";
import { HTTP_UTIL } from "../../../constant/HttpConst";
import InLineBlockWrapper from "../../../component/util/InlineBlockWrapper";


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

interface restApiConnectionData {
    connectionPk: number | null
    host: string | null
    port: number | null
    path: string | null
    methodType: string | null
    triggerType: string
    scheme: string | null
    description: string | null
    used: boolean
    documentType: string
}

export default function MappingApiList() {
    const [restApiConnectionOneModalOpen, setRestApiConnectionOneModalOpen] = useState(false); // 테이블 요소 클릭 시, 생성되는 모달의 상태
    const [restApiConnections, setRestApiConnections] = useState<PaginationContextProp<restApiConnectionData>>({
        pageable: {
            pageNumber: 0
        },
        totalpage: 0,
        content: [],
    });
    const [selectedRestApiConnection, setSelectedRestApiConnection] = useState<restApiConnectionData>({
        connectionPk: null,
        host: null,
        port: null,
        path: null,
        triggerType: '',
        methodType: null,
        scheme: null,
        description: null,
        used: false,
        documentType: ''
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

    const handleRestApiConnectionModal = (connectionPk: number) => {
        setRestApiConnectionOneModalOpen(true);

        const result = restApiConnections.content.find((item) => item.connectionPk === connectionPk)
        setSelectedRestApiConnection(result);
    }

    // 페이지 이동 시, 호출
    useEffect(() => {
        requestMappingConfirmApi();
    }, [restApiConnections.pageable.pageNumber])

    const selectedRestApiUrl = selectedRestApiConnection.scheme + "://" + selectedRestApiConnection.host + ":" + selectedRestApiConnection.port + selectedRestApiConnection.path

    return <>
        <RestApiConnectContentContext.Provider value={restApiConnections}>
            <DefaultModal styles={ENROLL_API_MODAL_STYLES}
                title="결재 연동 API 정보"
                isOpen={restApiConnectionOneModalOpen}
                setIsOpen={setRestApiConnectionOneModalOpen}>
                <div className="Titleline" style={{
                    marginTop: '15px',
                    borderBottom: '1px solid black'
                }}>
                </div>
                <div style={{ marginTop: '30px', marginBottom: '10px' }}>
                    <span>{selectedRestApiConnection.description}</span>
                </div>
                <div>
                    <p style={{ margin: '0px' }}>호출 URL</p>
                    <InLineBlockWrapper id='ci_bwr3' marginRight="5px">
                        <Select
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    width: 100,
                                    fontSize: '12px'
                                }),
                                option: (base) => ({
                                    ...base,
                                    fontSize: '12px'
                                })
                            }} defaultValue={{
                                value: selectedRestApiConnection.methodType,
                                label: selectedRestApiConnection.methodType
                            }} options={HTTP_UTIL.METHOD_OPTIONS} />
                    </InLineBlockWrapper>
                    <Input className='input_wh500 ip_bgc'
                        defaultValue={selectedRestApiConnection ? selectedRestApiUrl : ''} />

                </div>
                <div style={{ marginTop: '30px', marginBottom: '10px' }}>
                    <span>트리거 타입 : {DocumentUtils.convertTriggerType(selectedRestApiConnection.triggerType) + '(' + selectedRestApiConnection.triggerType + ')'}</span><br />
                    <span style={{ fontSize: '12px' }}>결재 문서의 상태가 {DocumentUtils.convertTriggerType(selectedRestApiConnection.triggerType)}(으)로 변경 되었을 때 API를 호출합니다</span>
                </div>
                <div style={{ marginTop: '30px', marginBottom: '10px' }}>
                    <p style={{ margin: '0px' }}>적용되는 문서의 타입</p>
                    <span>{DocumentUtils.convertDocumentType(selectedRestApiConnection.documentType)}</span>
                </div>
                <div>
                    사용 여부 : {selectedRestApiConnection.used ? 'Y' : 'N'}
                </div>
                <div className="Titleline" style={{
                    marginBottom: '15px',
                    marginTop: '15px',
                    paddingTop: '5px',
                    borderTop: '1px solid black'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <Button className="cfc bs"
                            name={'수정'}
                            onClick={() => setRestApiConnectionOneModalOpen(false)} />
                        <Button className="cfc bs"
                            name={'취소'}
                            onClick={() => setRestApiConnectionOneModalOpen(false)} />
                    </div>
                </div>
            </DefaultModal>
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
                            <tr key={content.connectionPk} onClick={() => handleRestApiConnectionModal(content.connectionPk)}>
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
    </>
}