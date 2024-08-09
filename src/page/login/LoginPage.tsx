import { Fragment } from "react/jsx-runtime";
import Input from "../../component/input/Input";
import { useState } from "react";
import Button from "../../component/button/Button";

import '../../component/button/button.css'
import '../../component/input/input.css'
import '../login/loginPage.css'
import { useNavigate } from "react-router-dom";
import { SignIn } from "../../api/AuthApi";

interface signInState {
    id: string;
    password: string;
    failMsg: string | string[] | null;
}

export default function LoginPage() {
    const [signIn, setSignIn] = useState<signInState>({
        id: '',
        password: '',
        failMsg: null
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

    const handleOnClickLoginButton = async (requestBody: object) => {
        const {status, data} = await SignIn(requestBody)

        if(status === 200) {
            console.log('로그인 성공')
            const loginResponse = data.data;
            sessionStorage.setItem('memberId', loginResponse.memberId);
            sessionStorage.setItem('name', loginResponse.name);
            sessionStorage.setItem('companyId', loginResponse.companyId);
            sessionStorage.setItem('companyName', loginResponse.companyName);
            sessionStorage.setItem('departmentId', loginResponse.departmentId);
            sessionStorage.setItem('departmentName', loginResponse.departmentName);

            nav('/vacation/hist')
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
                    name="sign-in"
                    className="bb"
                    onClick={() => handleOnClickLoginButton({
                        memberId : signIn.id,
                        password : signIn.password
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