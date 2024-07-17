import { Fragment } from "react/jsx-runtime";
import List from "../../component/list/List";
import ListItem from "../../component/list/ListItem";


export default function VacationSidebar() {
    return <Fragment>
    <List className="side_ul">
        <ListItem className="side_li"
        content="휴가 이력"/>
        <ListItem className="side_li"
        content="개인 연차 설정"/>
        <ListItem className="side_li"
        content="공동 연차 지정"/>
        <ListItem className="side_li"
        content="연차 정책"/>
    </List>
</Fragment>
}