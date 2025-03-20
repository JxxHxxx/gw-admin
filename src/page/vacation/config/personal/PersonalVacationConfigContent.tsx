


export default function PersonalVacationConfigContent() {
    const handleOnClickButton = () => {
        const notification = new Notification('결재 승인 요청', {
            body : "(결재 문서 명) - 기안자(XXX)로 부터 결재 승인 요청이 왔습니다"
        });
    }

    return <>
        <button id="enable"
        onClick={handleOnClickButton}>알림 생성</button>
        <p>개인연차 수정 페이지</p>
    </>
}