import { Fragment } from "react/jsx-runtime";
import ListGroup from "../../component/list/ListGroup";
import List from "../../component/list/List";


export default function ConfirmSidebar() {
    return <Fragment>
    <ListGroup className="side_ul">
        <List className="side_li"
        content="결재 문서 이력"/>
        <List className="side_li"
        content="결재선 관리"/>
        <List className="side_li"
        content="결재 문서 관리"/>
    </ListGroup>
</Fragment>
}