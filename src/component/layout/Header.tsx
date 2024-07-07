import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

import '../layout/header.css';
import { URL_BATCH_EXECUTION_HIST, URL_CONFIRM_DOCUMENTS, URL_MESSAGE_RESYNC } from "../../constant/link/UrlConstant";

interface HeaderProp {
    menu?: string
}

export default function Header({ menu = '' }: HeaderProp) {
    const nav = useNavigate();

    return <Fragment>
        <ul style={{
            'display': 'flex',
            'listStyleType': 'none',
            'backgroundColor': '#00285e',
            'height': '45px',
            'alignItems': 'center', // 세로축 정렬
            'justifyContent': 'left', // 가로축 정렬
            'fontSize': '15px',
            'color': 'white',
            'fontWeight': 'bold'
        }}>
            <li style={{ 'marginRight': '20px', 'cursor': 'pointer' }}>
                <span className={menu === 'vacation' ? 'present_menu' : 'not_present_menu'} onClick={() => {
                    nav('/vacation');
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
                    nav(URL_BATCH_EXECUTION_HIST)
                }}>배치 관리</span>
            </li>
            <li style={{ 'marginRight': '20px', 'cursor': 'pointer' }}>
                <span className={menu === 'message' ? 'present_menu' : 'not_present_menu'} onClick={() => {
                    nav(URL_MESSAGE_RESYNC)
                }}>메시지 관리</span>
            </li>
        </ul>
    </Fragment>
}