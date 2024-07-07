import { Fragment } from "react/jsx-runtime";
import ListGroup from "../../component/list/ListGroup";
import List from "../../component/list/List";
import { Link } from "react-router-dom";
import { URL_MESSAGE_HIST, URL_MESSAGE_RESYNC } from "../../constant/link/UrlConstant";


export default function MessageSidebar() {

    return <Fragment>
        <ListGroup className="side_ul">
            <Link style={{ 'textDecoration': 'none' }} to={URL_MESSAGE_RESYNC}>
                <List className="side_li" content="재동기 처리" />
            </Link>
            <Link style={{ 'textDecoration': 'none' }} to={URL_MESSAGE_HIST}>
                <List className="side_li" content="메시지 처리 이력" />
            </Link>
        </ListGroup>
    </Fragment>
}