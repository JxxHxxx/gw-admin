import { Fragment } from "react/jsx-runtime";
import ListGroup from "../../component/list/ListGroup";
import List from "../../component/list/List";


export default function VacationSidebar() {
    return <Fragment>
    <ListGroup className="side_ul">
        <List className="side_li"
        content="휴가 이력"/>
        <List className="side_li"
        content="개인 연차 설정"/>
        <List className="side_li"
        content="공동 연차 지정"/>
        <List className="side_li"
        content="연차 정책"/>
    </ListGroup>
</Fragment>
}