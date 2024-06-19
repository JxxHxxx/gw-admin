import { Fragment } from "react/jsx-runtime";
import Input from "../../component/input/Input";
import { useState } from "react";
import Button from "../../component/button/Button";

import '../../component/button/button.css'
import '../../component/input/input.css'
import '../login/loginPage.css'
import { useNavigate } from "react-router-dom";

interface signInState {
    id: string;
    password: string;
    failFlag: boolean // 로그인 시도 시 성공 유무
    failMsg: string | string[] | null;
}

export default function LoginPage() {
    const [signIn, setSignIn] = useState<signInState>({
        id: '',
        password: '',
        failFlag: false,
        failMsg: ''
    });

    const handleIdOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignIn((prev) => ({
            ...prev,
            id: event.target.value
        }))
    }

    const handlePasswordOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignIn((prev) => ({
            ...prev,
            password: event.target.value
        }))
    }

    const nav = useNavigate();

    const handleOnClickLoginButton = () => {
        if (signIn.id === '' || signIn.password === '') {
            setSignIn((prev) => ({
                ...prev,
                failFlag: true,
                failMsg: '아이디/비밀번호를 입력해주세요'
            }))
        } else if (signIn.id === signIn.password) {
            setSignIn((prev) => ({
                ...prev,
                failFlag: false,
                failMsg: null
            }))
            nav('/')
        } else {
            setSignIn((prev) => ({
                ...prev,
                failFlag: true,
                failMsg: ['아이디 또는 비밀번호를 잘못 입력했습니다.', '입력하신 내용을 다시 확인해주세요.']
            }))
        }
    }

    return <Fragment>
        <div className="input-container">
            <div style={{ 'marginBottom': '5px' }}>
                <Input
                    className="bi"
                    onChange={handleIdOnChange}
                    placeholder="아이디를 입력해주세요" />
            </div>
            <div style={{ 'marginBottom': '5px' }}>
                <Input
                    className="bi"
                    onChange={handlePasswordOnChange}
                    type="password"
                    placeholder="비밀번호를 입력해주세요" />
            </div>
            {signIn.failFlag && <div className="signin_err_msg">
                {Array.isArray(signIn.failMsg) ? signIn.failMsg.map(msg => {
                    <>
                        msg <br />
                    </>
                }) : { signIn.failMsg }}
            </div>}
            <div>
                <Button
                    name="sign-in"
                    className="bb"
                    onClick={handleOnClickLoginButton} />
            </div>
        </div>
        <div style={{ 'textAlign': 'center', 'marginTop': '25px' }}>
            <p className="copy-right">
                Copyright JxxHxxx. All Rights Reserved
            </p>
            <a className="git-page" href="https://github.com/JxxHxxx">
                Visit JxxHxx Github
            </a>
        </div>
    </Fragment>
}