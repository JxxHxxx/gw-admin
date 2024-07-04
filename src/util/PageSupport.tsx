
export const convertBtnNumToPageNum = (btnNumVal: number) => {
    if (btnNumVal > 0) {
        return btnNumVal - 1;
    }
}