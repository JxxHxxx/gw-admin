import { Fragment } from "react/jsx-runtime";
import List from "../../component/list/List";
import ListItem from "../../component/list/ListItem";
import { Link } from "react-router-dom";
import { URL_APPROVAL_LINE, URL_CONFIRM_DOCUMENTS, URL_CONFIRM_DOCUMENTS_CREATE, URL_CONFIRM_DOCUMENTS_MAPPING_API } from "../../constant/link/UrlConstant";
import { useEffect, useState } from "react";
import { SidebarProp, SidebarState } from "../../component/layout/Sidebar";


export default function ConfirmSidebar({ selectedMenu }: SidebarProp) {
    const [menu, setMenu] = useState<SidebarState>({
        select: selectedMenu ? selectedMenu : ''
    });

    useEffect(() => {

    }, [menu.select])

    return <Fragment>
        <List className="side_ul">
            <Link style={{ 'textDecoration': 'none' }} to={URL_CONFIRM_DOCUMENTS}>
                <ListItem className={menu.select === "confirmDocument" ? "side_li selected_li" : "side_li"}
                    content="결재 문서 이력" />
            </Link>
            <Link style={{ 'textDecoration': 'none' }} to={URL_APPROVAL_LINE}>
                <ListItem className={menu.select === "approvalLine" ? "side_li selected_li" : "side_li"}
                    content="결재선 관리" />
            </Link>
            <Link style={{ 'textDecoration': 'none' }} to={URL_CONFIRM_DOCUMENTS_MAPPING_API}>
                <ListItem className={menu.select === "mappingApi" ? "side_li selected_li" : "side_li"}
                    content="API 연동" />
            </Link>
            <Link style={{ 'textDecoration': 'none' }} to={URL_CONFIRM_DOCUMENTS_CREATE}>
                <ListItem className={menu.select === "confirmForm" ? "side_li selected_li" : "side_li"}
                    content="양식 관리" />
            </Link>
        </List>
    </Fragment>
}