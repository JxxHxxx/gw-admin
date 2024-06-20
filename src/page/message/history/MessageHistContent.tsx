import { Fragment } from "react/jsx-runtime";
import Button from "../../../component/button/Button";
import { useState } from "react";
import PaginationButtons from "../../../component/button/PaginationButtons";


interface buttonState {
    pageIdx: number[];
    selectedIdx: number;
}

export default function MessageHistContent() {
    const showAmount: number = 5;
    const [button, setButton] = useState<buttonState>({
        pageIdx: [1, 2, 3, 4, 5],
        selectedIdx: 1,
    });

    const handleCLickPageButton = (idx: number) => {
        setButton((prev) => ({
            ...prev,
            selectedIdx: idx
        }))
    }

    // 함수 명 고민 좀 더 
    const handleCLickNextPageButton = () => {
        setButton((prev) => ({
            ...prev,
            pageIdx: prev.pageIdx.map(idx => idx + showAmount),
            selectedIdx: prev.selectedIdx + showAmount
        }))
    }

    const handleCLickPreviousPageButton = () => {
        if (button.pageIdx[4] - 5 <= 0) {
            return;
        }
        setButton((prev) => ({
            ...prev,
            pageIdx: prev.pageIdx.map(idx => idx - showAmount),
            selectedIdx: prev.selectedIdx - showAmount
        }))
    }

    return <Fragment>
        <Button className={"bs"} name={"<<"} onClick={handleCLickPreviousPageButton} />
        {button.pageIdx.map(idx => <Button
            className={button.selectedIdx === idx ? "bs_selected" : "bs"}
            name={idx}
            onClick={() => handleCLickPageButton(idx)} />)}
        <Button className={"bs"} name={">>"} onClick={handleCLickNextPageButton} />
    </Fragment>
}
