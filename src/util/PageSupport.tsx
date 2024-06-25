
export const convertBtnNumToPageNum = (btnNum: number) => {
    if (btnNum > 0) {
        return btnNum - 1;
    }
}