import DefaultModal from "../../../component/modal/DefaultModal";

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

const INFO_MSG_STYLES = {
    fontSize: '14px', 
    fontFamily: 'MaruBuri', 
    color: 'black', 
    fontWeight: 'bold'
}


export default function MappingApiHelpModal({helpModalOpen, setHelpModalOpen}) {
    return <DefaultModal
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
}