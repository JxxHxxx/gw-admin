import { Fragment } from "react/jsx-runtime";
import ListGroup from "../list/ListGroup";
import List from "../list/List";


export default function Sidebar() {

    return <Fragment>
        <ListGroup className="side_ul">
            <List className="side_li"
            content="메뉴1"/>
            <List className="side_li"
            content="메뉴2"/>
            <List className="side_li"
            content="메뉴3"/>
        </ListGroup>
    </Fragment>
}