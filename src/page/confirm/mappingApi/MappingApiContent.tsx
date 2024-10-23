import { useEffect, useState } from "react";
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
import RestApiConnectionOneModal from "./RestApiConnectionOneModal";

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

const INFO_MSG_STYLES = { fontSize: '14px', fontFamily: 'MaruBuri', color: 'black', fontWeight: 'bold' }

export default function MappingApiContent() {
    const [addRestApiConnectionModalOpen, setAddRestApiConnectionModalOpen] = useState(false);
    const [helpModalOpen, setHelpModalOpen] = useState(false);
    const [restApiConnectionOneModalOpen, setRestApiConnectionOneModalOpen] = useState(false);

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

    const intialfetchItem = async () => {
        const params = {
            size : ONE_PAGES_CONTENT_SIZE,
            page : restApiConnections.pageable.pageNumber
        }

        const { data, status } = await ConfirmApi.searchMappingConfirmApi(params);

        if (status === 200 && data !== null) {
            setRestApiConnections(data.data);
        }
    }

    // 최초 해당 컴포넌트를 호출했을 때만 동작
    useEffect(() => {
        intialfetchItem();
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
                title="결재 연동 API 등록"
                isOpen={addRestApiConnectionModalOpen}
                setIsOpen={setAddRestApiConnectionModalOpen}>
                <div style={{ borderBottom: '1px solid black', marginTop: '10px' }}></div>
            </DefaultModal>
            <Button className="cfc bs"
                name="HELP"
                onClick={() => setHelpModalOpen(true)} />
            <DefaultModal styles={HELP_MODAL_STYLES}
                title="결재 연동 API 설명"
                isOpen={helpModalOpen}
                setIsOpen={setHelpModalOpen}>
                <div style={{ borderBottom: '1px solid black', marginTop: '10px' }}></div>
                <p style={INFO_MSG_STYLES}>결재 문서 유형 - 결재 양식을 의미합니다.
                    <br />양식 관리 페이지에서 결재 양식 페이지에서 존재하는 결재 양식 유형을 확인할 수 있습니다.</p>
                <p style={INFO_MSG_STYLES}>트리거 타입 - 연동 API가 호출되는 시점을 나타냅니다.
                    <br />트리거 타입은 결재 문서 상태와 관련 있습니다.</p>
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
    </MainContainer>
}