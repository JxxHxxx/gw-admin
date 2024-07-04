import { Fragment } from "react/jsx-runtime";
import Button from "./Button";
import { useEffect, useState } from "react";
import { BUTTON_SIZE } from "../../domain/pagination/Pagination";

interface PaginationButtonsProp {
    totalPages: number; // 총 페이지 수
    numOfBtnsToShow: number; // 한 섹션에 보여줄 버튼의 개수
    sendSelectedBtnNumToParent: (nowNum: number) => void; // 상위 컴포넌트로 현재 버튼 넘버를 보내주기 위한 콜백 함수
}

interface Pagination {
    startBtnNum: number;
    selectedBtnNum: number;
}

export default function PaginationButtons({
    totalPages = 0,
    numOfBtnsToShow = BUTTON_SIZE,
    sendSelectedBtnNumToParent
}: PaginationButtonsProp) {

    const [pagination, setPagination] = useState<Pagination>({
        startBtnNum: 1,
        selectedBtnNum: 1,
    });

    // '>' 버튼 클릭 이벤트
    const handleNextBtn = () => {
        if (pagination.selectedBtnNum >= totalPages) {
            alert('마지막 페이지 입니다')
            return;
        }
        else if (pagination.selectedBtnNum === pagination.startBtnNum + numOfBtnsToShow - 1) {
            setPagination((prev) => ({
                ...prev,
                startBtnNum: prev.startBtnNum + numOfBtnsToShow,
                selectedBtnNum: prev.startBtnNum + numOfBtnsToShow
            }))
            sendSelectedBtnNumToParent(pagination.selectedBtnNum + 1);
            return;
        }
        else {
            setPagination((prev) => ({
                ...prev,
                selectedBtnNum: prev.selectedBtnNum + 1
            }))
            sendSelectedBtnNumToParent(pagination.selectedBtnNum + 1);
        }
    }
    // '>>' 버튼 클릭 이벤트 
    const handleNextSectionBtn = () => {
        if (pagination.selectedBtnNum >= totalPages) {
            alert('마지막 페이지 입니다')
            return;
        }
        else if (pagination.selectedBtnNum < totalPages && pagination.startBtnNum + numOfBtnsToShow >= totalPages) {
            setPagination((prev) => ({
                ...prev,
                selectedBtnNum: totalPages,
            }))
            sendSelectedBtnNumToParent(totalPages);
            return;
        }
        else {
            setPagination((prev) => ({
                ...prev,
                startBtnNum: prev.startBtnNum + numOfBtnsToShow,
                selectedBtnNum: prev.startBtnNum + numOfBtnsToShow,
            }))
            sendSelectedBtnNumToParent(pagination.startBtnNum + numOfBtnsToShow);
        }
    }
    // '<' 버튼 클릭 이벤트
    const handlePreviousBtn = () => {
        if (pagination.selectedBtnNum <= 1) {
            alert('첫번째 페이지 입니다');
            return;
        }
        else if (pagination.selectedBtnNum === pagination.startBtnNum) {
            setPagination((prev) => ({
                ...prev,
                startBtnNum: prev.startBtnNum - numOfBtnsToShow,
                selectedBtnNum: prev.startBtnNum - 1,
            }))
            sendSelectedBtnNumToParent(pagination.selectedBtnNum - 1);
        }
        else {
            setPagination((prev) => ({
                ...prev,
                selectedBtnNum: prev.selectedBtnNum - 1,
            }))
            sendSelectedBtnNumToParent(pagination.selectedBtnNum - 1);
        }
    }
    // '<<' 버튼 클릭 이벤트 
    const handlePreviousSectionBtn = () => {
        // pagination.selectedBtnNum <= numOfBtnsToShow
        if (pagination.selectedBtnNum <= 1) {
            alert('첫번째 페이지 입니다');
            return;
        }
        else if (pagination.selectedBtnNum > 1 && pagination.selectedBtnNum <= numOfBtnsToShow) {
            setPagination((prev) => ({
                ...prev,
                selectedBtnNum: 1,
            }))

            sendSelectedBtnNumToParent(pagination.selectedBtnNum - numOfBtnsToShow);
        }
        else {
            setPagination((prev) => ({
                ...prev,
                startBtnNum: prev.startBtnNum - numOfBtnsToShow,
                selectedBtnNum: prev.startBtnNum - numOfBtnsToShow,
            }))

            sendSelectedBtnNumToParent(pagination.startBtnNum - numOfBtnsToShow);
        }

    }
    const handleClickPageNumButton = (nowNum: number) => {
        setPagination((prev) => ({
            ...prev,
            selectedBtnNum: nowNum
        }))
        sendSelectedBtnNumToParent(nowNum);
    }

    const renderButtons = () => {
        const renderResult: any[] = [];
        for (let nowBtnNum = pagination.startBtnNum; nowBtnNum < pagination.startBtnNum + numOfBtnsToShow; nowBtnNum++) {
            renderResult.push(<Button
                className={nowBtnNum === pagination.selectedBtnNum ? "bs_selected" : "bs"}
                name={nowBtnNum}
                onClick={() => handleClickPageNumButton(nowBtnNum)} />)

            if (nowBtnNum >= totalPages) {
                break;
            }
        }
        return renderResult;
    }

    return <Fragment>
        <Button className={"bs"} name={"<<"} onClick={handlePreviousSectionBtn} />
        <Button className={"bs"} name={"<"} onClick={handlePreviousBtn} />
        {renderButtons()}
        <Button className={"bs"} name={">"} onClick={handleNextBtn} />
        <Button className={"bs"} name={">>"} onClick={handleNextSectionBtn} />
    </Fragment>
}
