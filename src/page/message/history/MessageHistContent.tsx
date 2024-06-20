import { Fragment } from "react/jsx-runtime";

import PaginationButtons from "../../../component/button/PaginationButtons";

export default function MessageHistContent() {
    return <Fragment>
        <PaginationButtons pageNums={[1,2,3,4,5]} selectedNum={1} showOnePageButtonAmount={5}/>
    </Fragment>
}
