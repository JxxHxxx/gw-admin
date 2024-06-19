import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";


export default function Header() {
    const nav = useNavigate();

    

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
            <li style={{'marginRight':'15px' ,'cursor':'pointer'}}>
                <span onClick={() => nav('/vacation')}>휴가 관리</span>
            </li>
            <li style={{'marginRight':'15px','cursor':'pointer'}}>
                <span onClick={() => nav('/confirm')}>결재 관리</span>
            </li>
            <li style={{'marginRight':'15px','cursor':'pointer'}}>
                <span onClick={() => nav('/batch')}>배치 관리</span>
            </li>
            <li style={{'marginRight':'15px','cursor':'pointer'}}>
                <span onClick={() => nav('/message')}>메시지 관리</span>
            </li>
        </ul>
    </Fragment>
}