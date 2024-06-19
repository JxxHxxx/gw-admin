import { Fragment } from "react/jsx-runtime";
import ListGroup from "../../component/list/ListGroup";
import List from "../../component/list/List";


export default function BatchSidebar() {
    return <Fragment>
    <ListGroup className="side_ul">
        <List className="side_li"
        content="배치 실행 이력"/>
        <List className="side_li"
        content="배치 관리"/>
    </ListGroup>
</Fragment>
}