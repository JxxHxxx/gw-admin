import { ReactNode, useState } from "react";
import Button from "../../../component/button/Button";

interface formComponentState {
    nodes: ReactNode[]
}

export default function FormCreate() {

    const [formComponent, setFormComponent] = useState<formComponentState>({
        nodes: []
    });

    const handleAddComponent = () => {
        setFormComponent((prev) => ({
            nodes: [...prev.nodes, <p key={prev.nodes.length}>테스트</p>]
        }))
    }

    return <>
        <h3>양식 관리</h3>
        <div style={{ margin: '50px' }}></div>
        <div style={{
            border: '1px solid gray',
            borderRadius: '1%',
            margin: '20px',
            padding: '20px',
            height: '500px',
            width : '900px'
        }}>
            <div className="title_div" style={{ textAlign: 'center' }}>
                <div style={{ borderBottom: '1px solid black', padding: '2px', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button name='컴포넌트 추가' onClick={handleAddComponent}></Button>
                    <Button name='결재선 적용'></Button>
                </div>
                <div style={{ padding: '10px' }}></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ flex: '3',  }}>
                        <label htmlFor="title">
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
                        {formComponent.nodes && formComponent.nodes}
                    </div>
                    <div style={{ flex: '1', border: '1px solid black' }}></div>
                </div>
            </div>
        </div>
    </>
}