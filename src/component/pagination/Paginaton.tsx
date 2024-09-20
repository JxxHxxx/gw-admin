import { Context, ReactNode, useContext, useEffect } from "react";
import Button from "../button/Button";
import Table from "../table/Table";

export const ONE_PAGES_CONTENT_SIZE: number = 5; // 한 페이지에 보여줄 이력의 갯수
export const ONE_PAGES_CONTENT_SIZE_1: number = 1; // 한 페이지에 보여줄 이력의 갯수
export const ONE_PAGES_CONTENT_SIZE_10: number = 10; // 한 페이지에 보여줄 이력의 갯수
export const ONE_PAGES_CONTENT_SIZE_20: number = 20; // 한 페이지에 보여줄 이력의 갯수
export const BUTTON_SIZE: number = 5; // 페이지에서 보여줄 버튼의 갯수


// 페이지넘버를 버튼의 값으로 바꾸기 위한 조정 값
const RECON_VAL_PAGETOBTN = 1;
// 페이지네이션에서 보여줄 버튼의 개수
const PGN_BTN_AMT = 5;

interface PaginationProp<T> {
    paginationContext: Context<T>,
    sendToBtnNumber: (val: number) => void, // 버튼 넘버를 보내면 알아서 페이지 번호로 변환한다.  
    columns: string[],
    rows: ReactNode,
    children: ReactNode
}
export interface PaginationContextProp<T> {
    pageable: PageableProp,
    totalPages: number,
    content: T[]
}

export interface PageableProp {
    pageNumber: number
}

export default function Pagination({
    paginationContext,
    sendToBtnNumber,
    columns,
    rows,
    children }: PaginationProp<PaginationContextProp>) {

    const pnContext = useContext(paginationContext);
    const pageNum = pnContext.pageable.pageNumber;
    const startBtnNum = Math.floor(pageNum / PGN_BTN_AMT) * PGN_BTN_AMT + RECON_VAL_PAGETOBTN;
    const selectedBtnNum = pageNum + RECON_VAL_PAGETOBTN;
    const { totalPages } = pnContext

    // console.log('startBtnNum : ', startBtnNum, 'selectedBtnNum : ', selectedBtnNum);

    // <<
    const handlePreviousSectionBtn = () => {
        if (selectedBtnNum <= 1) {
            alert('첫 페이지 입니다')
            return;
        }
        else if (selectedBtnNum > 1 && selectedBtnNum <= PGN_BTN_AMT) {
            console.log('이전 버튼 페이지로 넘어갑니다.')
            sendToBtnNumber(1);
            return;
        }
        else {
            console.log('기존 버튼 페이지에서 이동합니다.')
            sendToBtnNumber(startBtnNum - 1);
        }
    }
    // <
    const handlePreviousBtn = () => {
        const subValue = 1;

        if (selectedBtnNum <= 1) {
            alert('첫 페이지 입니다')
            return;
        }
        else if (selectedBtnNum === startBtnNum + BUTTON_SIZE - 1) {
            // console.log('이전 버튼 페이지로 넘어갑니다.')
            sendToBtnNumber(selectedBtnNum - subValue);
            return;
        }
        else {
            // console.log('기존 버튼 페이지에서 이동합니다.')
            sendToBtnNumber(selectedBtnNum - subValue);
        }
    }
    // >
    const handleNextBtn = () => {
        const addValue = 1;
        if (selectedBtnNum >= totalPages) {
            alert('마지막 페이지 입니다')
            return;
        }
        else if (selectedBtnNum === startBtnNum + BUTTON_SIZE - 1) {
            // console.log('다음 버튼 페이지로 넘어갑니다.')
            sendToBtnNumber(selectedBtnNum + addValue);
            return;
        }
        else {
            // console.log('기존 버튼 페이지에서 이동합니다.')
            sendToBtnNumber(selectedBtnNum + addValue);
        }
    }
    // >>
    const handleNextSectionBtn = () => {
        if (selectedBtnNum >= totalPages) {
            alert('마지막 페이지 입니다')
            return;
        }

        // 마지막 버튼 페이지에서 마지막 버튼으로 이동하려고 할 때
        else if (selectedBtnNum < totalPages && selectedBtnNum > totalPages - BUTTON_SIZE + 1) {
            // totalPages 가 마지막 버튼 번호이기 때문에
            sendToBtnNumber(totalPages);
            return;
        }
        else {
            sendToBtnNumber(startBtnNum + BUTTON_SIZE);
        }
    }

    const handleClickPageNumButton = (nowNum: number) => {
        sendToBtnNumber(nowNum);
    }

    const renderButtons = () => {
        const renderElements: any[] = [];
        // 버튼 랜더링, 버튼에 들어갈 숫자 및 색상을 표현하기 위한 반법 작업
        for (let nowBtnNum = startBtnNum; nowBtnNum < startBtnNum + BUTTON_SIZE; nowBtnNum++) {
            renderElements.push(<Button
                className={nowBtnNum === selectedBtnNum ? "btn_pgn btn_pgn_selected round" : "btn_pgn round"}
                name={nowBtnNum}
                onClick={() => handleClickPageNumButton(nowBtnNum)} />)

            if (nowBtnNum >= totalPages) {
                break;
            }
        }
        return renderElements;
    }

    // 검색 버튼 눌렀을 때 서버에 재요청하면서 바뀌게 해야 함
    useEffect(() => {

    }, [pnContext.pageable.pageNumber])

    return <>
        <div className="pgnTableCtnV2">
            <Table columns={columns} rows={<>{rows}</>} className="table_bs tbw100" />
            {children}
        </div>
        <div className="pgnBtnGroupV2">
            <Button className={"btn_pgn round"} name={"<<"} onClick={handlePreviousSectionBtn} />
            <Button className={"btn_pgn round"} name={"<"} onClick={handlePreviousBtn} />
            {renderButtons()}
            <Button className={"btn_pgn round"} name={">"} onClick={handleNextBtn} />
            <Button className={"btn_pgn round"} name={">>"} onClick={handleNextSectionBtn} />
        </div>
    </>
}