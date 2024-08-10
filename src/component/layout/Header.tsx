import { useNavigate } from "react-router-dom";

import '../layout/header.css';
import { URL_BATCH_CONFIGURATION, URL_CONFIRM_DOCUMENTS, URL_MESSAGE_RESYNC, URL_VACATION_HIST } from "../../constant/link/UrlConstant";
import List from "../list/List";

interface HeaderProp {
    menu?: string
}

export default function Header({ menu = '' }: HeaderProp) {
    const nav = useNavigate();

    return <List className="list_header">
        <li style={{ 'marginRight': '20px', 'cursor': 'pointer' }}>
            <span className={menu === 'userorg' ? 'present_menu' : 'not_present_menu'} onClick={() => {
                nav('/userorg');
            }}
            >사용자/부서 관리</span>
        </li>
        <li style={{ 'marginRight': '20px', 'cursor': 'pointer' }}>
            <span className={menu === 'vacation' ? 'present_menu' : 'not_present_menu'} onClick={() => {
                nav(URL_VACATION_HIST);
            }}
            >휴가 관리</span>
        </li>
        <li style={{ 'marginRight': '20px', 'cursor': 'pointer' }}>
            <span className={menu === 'confirm' ? 'present_menu' : 'not_present_menu'} onClick={() => {
                nav(URL_CONFIRM_DOCUMENTS)
            }}>결재 관리</span>
        </li>
        <li style={{ 'marginRight': '20px', 'cursor': 'pointer' }}>
            <span className={menu === 'batch' ? 'present_menu' : 'not_present_menu'} onClick={() => {
                nav(URL_BATCH_CONFIGURATION)
            }}>배치 관리</span>
        </li>
        <li style={{ 'marginRight': '20px', 'cursor': 'pointer' }}>
            <span className={menu === 'message' ? 'present_menu' : 'not_present_menu'} onClick={() => {
                nav(URL_MESSAGE_RESYNC)
            }}>메시지 관리</span>
        </li>
    </List>
}