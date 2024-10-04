import { Fragment } from "react/jsx-runtime";
import List from "../../component/list/List";
import ListItem from "../../component/list/ListItem";
import { Link } from "react-router-dom";
import { URL_APPROVAL_LINE, URL_CONFIRM_DOCUMENTS, URL_CONFIRM_DOCUMENTS_CREATE, URL_CONFIRM_DOCUMENTS_MAPPING_API } from "../../constant/link/UrlConstant";


export default function ConfirmSidebar() {
    return <Fragment>
        <List className="side_ul">
            <Link style={{ 'textDecoration': 'none' }} to={URL_CONFIRM_DOCUMENTS}>
                <ListItem className="side_li" content="결재 문서 이력" />
            </Link>
            <Link style={{ 'textDecoration': 'none' }} to={URL_APPROVAL_LINE}>
                <ListItem className="side_li" content="결재선 관리" />
            </Link>
            <Link style={{ 'textDecoration': 'none' }} to={URL_CONFIRM_DOCUMENTS_MAPPING_API}>
                <ListItem className="side_li" content="API 연동" />
            </Link>
            <Link style={{ 'textDecoration': 'none' }} to={URL_CONFIRM_DOCUMENTS_CREATE}>
                <ListItem className="side_li" content="양식 관리" />
            </Link>
        </List>
    </Fragment>
}