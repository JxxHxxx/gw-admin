import { useState } from "react";
import Button from "../../../component/button/Button";


export default function CreateConfirmForm() {

    const [formComponent, setFormComponent] = useState();

    const handleAddComponent = () => {
        setFormComponent(<p>컴포넌트 추가</p>)
    }

    return <>
        <h3>결재 문서 양식 만들기</h3>
        <div style={{ margin: '50px' }}></div>
        <div style={{
            border: '1px solid black',
            margin: '20px',
            padding: '20px',
            height: '500px'
        }}>
            <div className="title_div" style={{ textAlign: 'center' }}>
                <div style={{ borderBottom: '1px solid black', padding: '2px', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button name='컴포넌트 추가' onClick={handleAddComponent}></Button>
                    <Button name='결재선 적용'></Button>
                </div>
                <div style={{ padding: '10px' }}></div>
                <label htmlFor="title" style={{}}>
                    <input id="title"
                        placeholder="결재 문서의 제목을 입력해주세요"
                        className="input_confirm_form"
                        style={{
                            border: '0px',
                            borderBottom: '1px solid black',
                            paddingBottom: '0px',
                            width: '550px',
                            fontSize: '18px',
                            height: '40px'
                        }} />
                </label>
                <div style={{ margin: '20px' }}></div>
                {formComponent && formComponent}
            </div>
        </div>
    </>
}