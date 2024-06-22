import { Fragment } from "react/jsx-runtime";
import Button from "./Button";
import { useState } from "react";

interface PaginationButtonsProp {
    pageNums: number[];
    totalPages: number;
    selectedNum: number;
    showOnePageButtonAmount: number;
    sendSelectedNumCallback: (nowNum: number) => void;
}

interface paginationState {
    pageNumsState: number[];
    selectedNumState: number;
}

export default function PaginationButtons({
    pageNums = [], // 현재 페이지에서 보여줄 버튼 번호들
    totalPages = 0, // 총 페이지
    selectedNum = 0, // 현재 선택한 버튼의 번호
    showOnePageButtonAmount = 0, // 한 페이지에 보여줄 버튼의 양
    sendSelectedNumCallback // 콜백함수, 현재 선택한 버튼의 번호를 상위 컴포넌트로 전이
}: PaginationButtonsProp) {

    const [pagination, setPagination] = useState<paginationState>({
        pageNumsState: pageNums,
        selectedNumState: selectedNum,
    });
    // '>' 버튼을 눌렀을 때 이벤트 
    const handleNextButton = () => {
        if (pagination.selectedNumState + showOnePageButtonAmount > totalPages) {
            return
        }
        setPagination((prev) => ({
            ...prev,
            selectedNumState: prev.selectedNumState + showOnePageButtonAmount,
            pageNumsState: prev.pageNumsState.map(num => num + showOnePageButtonAmount)
        }))

        sendSelectedNumCallback(pagination.selectedNumState + showOnePageButtonAmount);
    }
    // '<' 버튼을 눌렀을 때 이벤트 
    const handlePreviousButton = () => {
        if (pagination.selectedNumState - showOnePageButtonAmount <= 0) {
            return;
        }

        setPagination((prev) => ({
            ...prev,
            selectedNumState: prev.selectedNumState - showOnePageButtonAmount,
            pageNumsState: prev.pageNumsState.map(num => num - showOnePageButtonAmount)
        }))

        sendSelectedNumCallback(pagination.selectedNumState - showOnePageButtonAmount);
    }
    const handleClickPageNumButton = (nowNum: number) => {
        setPagination((prev) => ({
            ...prev,
            selectedNumState: nowNum
        }))
        sendSelectedNumCallback(nowNum);
    }


    return <Fragment>
        <Button className={"bs"} name={"<"} onClick={handlePreviousButton} />
        {pagination.pageNumsState
            .filter(nowNum => nowNum <= totalPages)
            .map(nowNum => <Button
                className={nowNum === pagination.selectedNumState ? "bs_selected" : "bs"}
                name={nowNum}
                onClick={() => handleClickPageNumButton(nowNum)} />)}
        <Button className={"bs"} name={">"} onClick={handleNextButton} />
    </Fragment>
}
