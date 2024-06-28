import { Fragment } from "react/jsx-runtime";
import ListGroup from "../../component/list/ListGroup";
import List from "../../component/list/List";
import { Link } from "react-router-dom";


export default function BatchSidebar() {
    return <Fragment>
        <ListGroup className="side_ul">
            <Link style={{ 'textDecoration': 'none' }} to={'/batch/hist'}>
                <List className="side_li" content="배치 실행 이력" />
            </Link>

            <Link style={{ 'textDecoration': 'none' }} to={'/batch/run'}>
                <List className="side_li" content="배치 관리" />
            </Link>

        </ListGroup>
    </Fragment>
}