import { Link } from "react-router-dom";
import List from "../../component/list/List";
import ListItem from "../../component/list/ListItem";
import { SidebarProp } from "../../component/layout/Sidebar";
import { URL_ORGANIZATION_MANAGE, URL_USER_MANAGE } from "../../constant/link/UrlConstant";

export default function UserOrgSidebar() {

    return <>
        <List className="side_ul">
            <Link style={{ 'textDecoration': 'none' }} to={URL_USER_MANAGE}>
                <ListItem className="side_li" content="사용자 관리" />
            </Link>
            <Link style={{ 'textDecoration': 'none' }} to={URL_ORGANIZATION_MANAGE}>
                <ListItem className="side_li" content="부서 관리" />
            </Link>
        </List>
    </>
}