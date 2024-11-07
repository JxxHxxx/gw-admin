import { useNavigate } from "react-router-dom";

import '../layout/header.css';
import { URL_BATCH_CONFIGURATION, URL_CONFIRM_DOCUMENTS, URL_USER_MANAGE, URL_MESSAGE_RESYNC, URL_VACATION_HIST } from "../../constant/link/UrlConstant";
import List from "../list/List";
import ListItemV2 from "../list/ListItemV2";

interface HeaderProp {
    menu?: string
}

interface HeaderMenu {
    menuId: string
    url: string
    menuName: string
}

const headerMenuList: HeaderMenu[] = [
    { menuId: 'userOrg', url: URL_USER_MANAGE, menuName: '사용자/부서관리' },
    { menuId: 'vacation', url: URL_VACATION_HIST, menuName: '휴가 관리' },
    { menuId: 'confirm', url: URL_CONFIRM_DOCUMENTS, menuName: '결재 관리' },
    { menuId: 'batch', url: URL_BATCH_CONFIGURATION, menuName: '배치 관리' },
    { menuId: 'message', url: URL_MESSAGE_RESYNC, menuName: '메시지 관리' },
]

export default function Header({ menu = '' }: HeaderProp) {
    const nav = useNavigate();

    const handleOnClickMenu = (url: string) => {
        nav(url);
    }

    return <List className="list_header">
        {headerMenuList.map(headerMenu =>
            <ListItemV2 className="list_item_header">
                <span className={menu === headerMenu.menuId ? 'present_menu' : 'not_present_menu'}
                    onClick={() => handleOnClickMenu(headerMenu.url)} >{headerMenu.menuName}</span>
            </ListItemV2>)}
    </List>
}