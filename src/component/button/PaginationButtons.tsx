import { Fragment } from "react/jsx-runtime";
import Button from "./Button";

interface PaginationButtonsProp {
    pageNums: number[];
    selectedNum: number;
    showOnePageButtonAmount: number;
    handleClickPageNumButton: () => void;
}

export default function PaginationButtons({
    pageNums = [],
    selectedNum = 0,
    showOnePageButtonAmount = 0,
    handleClickPageNumButton = () => { } }: PaginationButtonsProp) {
    
    

    const handleNextButtons = () => {
        selectedNum = selectedNum - showOnePageButtonAmount
        pageNums = pageNums.map(num => num + showOnePageButtonAmount);
    }

    const handlePreviousButtons = () => {
        selectedNum = selectedNum - showOnePageButtonAmount
        pageNums = pageNums.map(num => num - showOnePageButtonAmount);
    }

    return <Fragment>
        <Button className={"bs"} name={"<"} onClick={handlePreviousButtons} />
        {pageNums.map(nowNum => <Button
            className={nowNum === selectedNum ? "bs_selected" : "bs"}
            name={nowNum}
            onClick={handleClickPageNumButton} />)}
        <Button className={"bs"} name={">"} onClick={handleNextButtons} />
    </Fragment>
}