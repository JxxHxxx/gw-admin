import { Fragment } from "react/jsx-runtime";
import Input from "../../component/input/Input";
import { useEffect, useRef, useState } from "react";
import Button from "../../component/button/Button";
import '../../component/button/button.css'
import '../../component/input/input.css'
import '../login/loginPage.css'
import { useNavigate } from "react-router-dom";
import AuthApi from "../../api/AuthApi";

interface signInState {
    id: string;
    password: string;
    failMsg: string | string[] | null;
    requesting: boolean;
}

export default function LoginPage() {
    const [signIn, setSignIn] = useState<signInState>({
        id: '',
        password: '',
        requesting: false,
        failMsg: null
    });

    const initFocusForRef = useRef<HTMLInputElement>(null);

    const handleIdOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignIn((prev) => ({
            ...prev,
            failMsg: null,
            id: event.target.value
        }))
    }

    const handlePasswordOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignIn((prev) => ({
            ...prev,
            failMsg: null,
            password: event.target.value
        }))
    }

    const nav = useNavigate();

    const handleOnClickLoginButton = async (requestBody: object) => {
        setSignIn((prev) => ({
            ...prev,
            requesting: true
        }))
        const response = await AuthApi.SignIn(requestBody);

        if (response.status === 200) {
            const loginResponse = response.data.data;
            sessionStorage.setItem('memberId', loginResponse.memberId);
            sessionStorage.setItem('name', loginResponse.name);
            sessionStorage.setItem('companyId', loginResponse.companyId);
            sessionStorage.setItem('companyName', loginResponse.companyName);
            sessionStorage.setItem('departmentId', loginResponse.departmentId);
            sessionStorage.setItem('departmentName', loginResponse.departmentName);

            nav('/vacation/hist')
        }
        else if (response.code === 'ERR_BAD_REQUEST' && response.response.data.status === 400) {
            setSignIn((prev) => ({
                ...prev,
                requesting: false,
                failMsg: '아이디/비밀번호가 올바르지 않습니다'
            }))
        }
        else if (response.code === 'ERR_NETWORK') {
            setSignIn((prev) => ({
                ...prev,
                requesting: false,
                failMsg: '서비스 점검중입니다'
            }))
        }
        else {
            setSignIn((prev) => ({
                ...prev,
                requesting: false,
                failMsg: '관리자에게 문의하세요'
            }))
        }
    }

    const handleOnKeyDownEnte = (event) => {
        if (event.key === 'Enter') {
            handleOnClickLoginButton({
                memberId: signIn.id,
                password: signIn.password
            });
        }
    }

    useEffect(() => {
        if(initFocusForRef.current) {
            console.log('init complete');
            initFocusForRef.current.focus();
        }
    }, [])

    return <Fragment>
        <div className="input-container">
            <div style={{ 'marginBottom': '5px' }}>
                <Input
                    ref={initFocusForRef}
                    className="bi"
                    onChange={handleIdOnChange}
                    onKeyDown={handleOnKeyDownEnte}
                    placeholder="아이디를 입력해주세요" />
            </div>
            <div style={{ 'marginBottom': '5px' }}>
                <Input
                    className="bi"
                    onChange={handlePasswordOnChange}
                    onKeyDown={handleOnKeyDownEnte}
                    type="password"
                    placeholder="비밀번호를 입력해주세요" />
            </div>
            {Array.isArray(signIn.failMsg) ?
                (<div className="signin_err_msg">
                    {signIn.failMsg.map(msg => <>
                        {msg} <br />
                    </>)}
                </div>) :
                (<div className="signin_err_msg">
                    {signIn.failMsg}
                </div>)}
            <div>
                <Button
                    name={signIn.requesting ? "waiting..." : "sign-in"}
                    className="bb"
                    onClick={() => handleOnClickLoginButton({
                        memberId: signIn.id,
                        password: signIn.password
                    })} />
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