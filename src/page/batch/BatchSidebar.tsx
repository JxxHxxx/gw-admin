import { Fragment } from "react/jsx-runtime";
import List from "../../component/list/List";
import ListItem from "../../component/list/ListItem";
import { Link } from "react-router-dom";
import { URL_BATCH_CONFIGURATION, URL_BATCH_EXECUTION_HIST } from "../../constant/link/UrlConstant";


export default function BatchSidebar() {
    return <Fragment>
        <List className="side_ul">
            <Link style={{ 'textDecoration': 'none' }} to={URL_BATCH_CONFIGURATION}>
                <ListItem className="side_li" content="배치 관리" />
            </Link>
            <Link style={{ 'textDecoration': 'none' }} to={URL_BATCH_EXECUTION_HIST}>
                <ListItem className="side_li" content="배치 실행 이력" />
            </Link>
        </List>
    </Fragment>
}