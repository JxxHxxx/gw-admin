import { Fragment } from "react/jsx-runtime";
import List from "../list/List";
import ListItem from "../list/ListItem";


export default function Sidebar() {

    return <Fragment>
        <List className="side_ul">
            <ListItem className="side_li"
            content="메뉴1"/>
            <ListItem className="side_li"
            content="메뉴2"/>
            <ListItem className="side_li"
            content="메뉴3"/>
        </List>
    </Fragment>
}