import { Fragment } from "react/jsx-runtime";
import Button from "./Button";
import { useState } from "react";

interface PaginationButtonsProp {
    pageNums: number[];
    selectedNum: number;
    showOnePageButtonAmount: number;
    selectedNumCallback: (nowNum:number) => any;
}

interface paginationState {
    pageNumsState: number[];
    selectedNumState: number;
}

export default function PaginationButtons({
    pageNums = [],
    selectedNum = 0,
    showOnePageButtonAmount = 0,
    selectedNumCallback}: PaginationButtonsProp) {

    const [pagination, setPagination] = useState<paginationState>({
        pageNumsState: pageNums,
        selectedNumState: selectedNum,
    });

    const handleNextButtons = () => {
        setPagination((prev) => ({
            ...prev,
            selectedNumState: prev.selectedNumState + showOnePageButtonAmount,
            pageNumsState: prev.pageNumsState.map(num => num + showOnePageButtonAmount)
        }))
    }

    const handlePreviousButtons = () => {
        if(pagination.selectedNumState - showOnePageButtonAmount <= 0) {
            return;
        }

        setPagination((prev) => ({
            ...prev,
            selectedNumState: prev.selectedNumState - showOnePageButtonAmount,
            pageNumsState: prev.pageNumsState.map(num => num - showOnePageButtonAmount)
        }))
    }
    const handleClickPageNumButton = (nowNum:number) => {
        setPagination((prev) => ({
            ...prev,
            selectedNumState: nowNum
        }))
        selectedNumCallback(nowNum)
    }


    return <Fragment>
        <Button className={"bs"} name={"<"} onClick={handlePreviousButtons} />
        {pagination.pageNumsState.map(nowNum => <Button
            className={nowNum === pagination.selectedNumState ? "bs_selected" : "bs"}
            name={nowNum}
            onClick={() => handleClickPageNumButton(nowNum)} />)}
        <Button className={"bs"} name={">"} onClick={handleNextButtons} />
    </Fragment>
}
