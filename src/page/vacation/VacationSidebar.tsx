import { Fragment } from "react/jsx-runtime";
import List from "../../component/list/List";
import ListItem from "../../component/list/ListItem";
import { Link } from "react-router-dom";
import { URL_VACATION_CONFIG_COMMON_CREATE, URL_VACATION_CONFIG_COMMON_SPECIAL, URL_VACATION_CONFIG_COMMON_UPDATE, URL_VACATION_CONFIG_PERSONAL, URL_VACATION_HIST } from "../../constant/link/UrlConstant";
import { useEffect, useState } from "react";

interface SidebarMenu {
    select: string;
}

export default function VacationSidebar({selectedMenu}) {

    const [menu, setMenu] = useState<SidebarMenu>({
        select: selectedMenu ? selectedMenu : ''
    });

    useEffect(() => {

    }, [menu.select])

    return <Fragment>
        <List className="side_ul">
            <ListItem className={menu.select === 'personal' ? "side_li selected" : "side_li"} content="개인 연차 관리" onClick={() => setMenu(() => ({ select: 'personal' }))} />
            {menu.select === 'personal' && <>
                <Link style={{ 'textDecoration': 'none' }} to={URL_VACATION_CONFIG_PERSONAL} state={{selectedMenu : menu.select}}>
                    <ListItem className="side_li_dp2" content="개인 연차 부여" />
                </Link>
                <Link style={{ 'textDecoration': 'none' }} to={URL_VACATION_HIST} state={{selectedMenu : menu.select}}>
                    <ListItem className="side_li_dp2" content="개인 연차 이력/수정" />
                </Link>
            </>}

            <List className="side_ul">
                <ListItem className={menu.select === 'common' ? "side_li selected" : "side_li"} content="공동 연차 관리" onClick={() => setMenu(() => ({ select: 'common' }))} />
                {menu.select === 'common' && <>
                    <Link style={{ 'textDecoration': 'none' }} to={URL_VACATION_CONFIG_COMMON_CREATE} state={{selectedMenu : menu.select}}>
                        <ListItem className="side_li_dp2" content="공동 연차 지정" />
                    </Link>
                    <Link style={{ 'textDecoration': 'none' }} to={URL_VACATION_CONFIG_COMMON_UPDATE} state={{selectedMenu : menu.select}}>
                        <ListItem className="side_li_dp2" content="공동 연차 수정" />
                    </Link>
                    <Link style={{ 'textDecoration': 'none' }} to={URL_VACATION_CONFIG_COMMON_SPECIAL} state={{selectedMenu : menu.select}}>
                        <ListItem className="side_li_dp2" content="경조사 정책 추가" />
                    </Link>
                </>
                }
            </List>
        </List>
    </Fragment>
}