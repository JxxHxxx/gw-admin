import { Fragment } from "react/jsx-runtime";
import Button from "./Button";
import { useState } from "react";

interface PaginationButtonsProp {
    pageNums: number[];
    totalPages: number;
    selectedNum: number;
    showOnePageButtonAmount: number;
    sendSelectedNumCallback: (nowNum: number) => any;
}

interface paginationState {
    pageNumsState: number[];
    selectedNumState: number;
}

export default function PaginationButtons({
    pageNums = [],
    totalPages = 0,
    selectedNum = 0,
    showOnePageButtonAmount = 0,
    sendSelectedNumCallback }: PaginationButtonsProp) {

    const [pagination, setPagination] = useState<paginationState>({
        pageNumsState: pageNums,
        selectedNumState: selectedNum,
    });

    const handleNextButtons = () => {
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

    const handlePreviousButtons = () => {
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
        <Button className={"bs"} name={"<"} onClick={handlePreviousButtons} />
        {pagination.pageNumsState
            .filter(nowNum => nowNum <= totalPages)
            .map(nowNum => <Button
                className={nowNum === pagination.selectedNumState ? "bs_selected" : "bs"}
                name={nowNum}
                onClick={() => handleClickPageNumButton(nowNum)} />)}
        <Button className={"bs"} name={">"} onClick={handleNextButtons} />
    </Fragment>
}
