import { Fragment } from "react/jsx-runtime";
import List from "../../component/list/List";
import ListItem from "../../component/list/ListItem";
import { Link } from "react-router-dom";
import { URL_BATCH_CONFIGURATION, URL_BATCH_EXECUTION_HIST } from "../../constant/link/UrlConstant";
import { useEffect, useState } from "react";
import { SidebarProp, SidebarState } from "../../component/layout/Sidebar";


export default function BatchSidebar(
    { selectedMenu }: SidebarProp) {
    const [menu, setMenu] = useState<SidebarState>({
        select: selectedMenu ? selectedMenu : ''
    });

    console.log('sidebar refresh');

    useEffect(() => {
    }, [menu.select])

    return <Fragment>
        <List className="side_ul">
            <Link style={{ 'textDecoration': 'none' }}
                to={URL_BATCH_CONFIGURATION}>
                <ListItem className={menu.select === 'config' ? "side_li selected_li" : "side_li"} content="배치 관리" />
            </Link>
            <Link style={{ 'textDecoration': 'none' }}
                to={URL_BATCH_EXECUTION_HIST}>
                <ListItem className={menu.select === 'exeHist' ? "side_li selected_li" : "side_li"} content="배치 실행 이력" />
            </Link>
        </List>
    </Fragment>
}