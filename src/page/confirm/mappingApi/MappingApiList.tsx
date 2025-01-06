import { useEffect, useState } from "react";
import Pagination from "../../../component/pagination/Paginaton";
import EmptyMsg from "../../../component/text/EmptyMsg";
import { RestApiConnectContentContext } from "../../../context/PaginationContext";
import { convertBtnNumToPageNum } from "../../../util/PageSupport";
import DocumentUtils from "../../../util/convert/DocumentUtils";
import ConfirmApi from "../../../api/ConfirmApi";
import DefaultModal from "../../../component/modal/DefaultModal";

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

export default function MappingApiList() {
    const [restApiConnectionOneModalOpen, setRestApiConnectionOneModalOpen] = useState(false); // 테이블 요소 클릭 시, 생성되는 모달의 상태
    const [restApiConnections, setRestApiConnections] = useState<PaginationContextProp>({
        pageable: {
            pageNumber: 0
        },
        totalpage: 0,
        content: [],
    });
    const [selectRestApiConnection, setSelectedRestApiConnection] = useState();

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

    // 페이지 이동 시, 호출
    useEffect(() => {
        requestMappingConfirmApi();
    }, [restApiConnections.pageable.pageNumber])

    return <>
        <RestApiConnectContentContext.Provider value={restApiConnections}>
            <DefaultModal styles={ENROLL_API_MODAL_STYLES}
                title="결재 연동 API 등록"
                isOpen={restApiConnectionOneModalOpen}
                setIsOpen={setRestApiConnectionOneModalOpen}>
                test
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
    </>
}