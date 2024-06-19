import { Fragment } from "react/jsx-runtime";
import ListGroup from "../../component/list/ListGroup";
import List from "../../component/list/List";


export default function MessageSidebar() {
    return <Fragment>
    <ListGroup className="side_ul">
        <List className="side_li"
        content="메시지 처리 이력"/>
        <List className="side_li"
        content="재동기 처리"/>
    </ListGroup>
</Fragment>
}