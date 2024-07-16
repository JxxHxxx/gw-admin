import { Fragment } from "react/jsx-runtime";
import ListGroup from "../../component/list/ListGroup";
import List from "../../component/list/List";
import { Link } from "react-router-dom";
import { URL_APPROVAL_LINE, URL_CONFIRM_DOCUMENTS, URL_CONFIRM_DOCUMENTS_CREATE } from "../../constant/link/UrlConstant";


export default function ConfirmSidebar() {
    return <Fragment>
        <ListGroup className="side_ul">
            <Link style={{ 'textDecoration': 'none' }} to={URL_CONFIRM_DOCUMENTS}>
                <List className="side_li" content="결재 문서 이력" />
            </Link>
            <Link style={{ 'textDecoration': 'none' }} to={URL_APPROVAL_LINE}>
                <List className="side_li" content="결재선 관리" />
            </Link>
            <Link style={{ 'textDecoration': 'none' }} to={URL_CONFIRM_DOCUMENTS_CREATE}>
                <List className="side_li"
                    content="결재 문서 만들기" />
            </Link>
        </ListGroup>
    </Fragment>
}