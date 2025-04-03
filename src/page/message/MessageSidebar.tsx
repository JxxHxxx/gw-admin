import { Fragment } from "react/jsx-runtime";
import List from "../../component/list/List";
import ListItem from "../../component/list/ListItem";
import { Link } from "react-router-dom";
import { URL_MESSAGE_DESTINATION, URL_MESSAGE_HIST, URL_MESSAGE_RESYNC } from "../../constant/link/UrlConstant";
import { useEffect, useState } from "react";
import { SidebarProp, SidebarState } from "../../component/layout/Sidebar";


export default function MessageSidebar({ selectedMenu }: SidebarProp) {
    const [menu, setMenu] = useState<SidebarState>({
        select: selectedMenu ? selectedMenu : ''
    });

    useEffect(() => {

    }, [menu.select])

    return <Fragment>
        <List className="side_ul">
            <Link style={{ 'textDecoration': 'none' }} to={URL_MESSAGE_DESTINATION}>
                <ListItem className={menu.select === "destination" ? "side_li selected_li" : "side_li"}
                    content="목적지 관리" />
            </Link>
            <Link style={{ 'textDecoration': 'none' }} to={URL_MESSAGE_RESYNC}>
                <ListItem className={menu.select === "retry" ? "side_li selected_li" : "side_li"}
                    content="재동기 처리" />
            </Link>
            <Link style={{ 'textDecoration': 'none' }} to={URL_MESSAGE_HIST}>
                <ListItem className={menu.select === "hist" ? "side_li selected_li" : "side_li"}
                    content="메시지 처리 이력" />
            </Link>
        </List>
    </Fragment>
}