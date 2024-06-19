import { Fragment } from "react/jsx-runtime";


export default function Header() {
    return <Fragment>
        <ul style={{'display':'flex',
            'listStyleType':'none', 
            'backgroundColor':'#00285e', 
            'height': '45px',
             'alignItems':'center', // 세로축 정렬
             'justifyContent':'left', // 가로축 정렬
             'fontSize' : '15px',
             'color': 'white',
             'fontWeight': 'bold'
             }}>
            <li style={{'marginRight':'15px'}}>
                <span>휴가 관리</span>
            </li>
            <li style={{'marginRight':'15px'}}>
                <span>결재 관리</span>
            </li>
            <li style={{'marginRight':'15px'}}>
                <span>배치 관리</span>
            </li>
            <li style={{'marginRight':'15px'}}>
                <span>메시지 관리</span>
            </li>
        </ul>
    </Fragment>
}