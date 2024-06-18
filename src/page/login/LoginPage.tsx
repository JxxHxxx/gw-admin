import { Fragment } from "react/jsx-runtime";
import Input from "../../component/input/Input";
import { useState } from "react";
import Button from "../../component/button/Button";

import '../../component/button/button.css'
import '../../component/input/input.css'
import '../login/loginPage.css'

interface signInInfo {
    id: string | null;
    password: string | null;
}

export default function LoginPage() {
    const [signIn, setSignIn] = useState<signInInfo>({
        id: null,
        password: null
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

    const handleOnClickLoginButton = () => {
        alert('로그인 시도!!')
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
            <div>
                <Button
                    name="sign-in"
                    className="bb"
                    onClick={handleOnClickLoginButton} />
            </div>
        </div>
    </Fragment>
}