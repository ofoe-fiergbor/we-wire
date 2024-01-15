'use client'
import {ChangeEvent, useState} from "react";
import {Button, Input} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone, UserOutlined} from "@ant-design/icons";

import styles from './styles.module.css';
import {bodyTexts, FormType} from "@/app/components/auth/form/constants";
import {signIn, signUp} from "@/libs/api/auth";
import {useRouter} from "next/navigation";


export default function AuthForm(){
    const router = useRouter();
    const [formType, setFromType] = useState<FormType>(FormType.SIGN_IN);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();

    const toggleForm = () => {
        setFromType(prevState => {
            if (prevState === FormType.SIGN_IN) return FormType.SIGN_UP;
            return FormType.SIGN_IN;
        })
        setUsername('')
        setPassword('')
    }

    const handleSubmit = async () => {
        if (!username || !password) {
            return;
        }
        setIsLoading(true)
        if (FormType.SIGN_IN === formType) {
            const response = await signIn(username, password)
                .then(res => res.json())
                .catch(error => console.log(error))
            if (response.access_token) {
                localStorage.setItem('access_token', response.access_token);
            }
            setIsLoading(false)
            router.replace('wallets/balances')
            return;
        }
        const response = await signUp(username, password)
            .catch(error => console.log(error));
        if (response && response.status === 201) {
            setFromType(FormType.SIGN_IN)
            setUsername('')
            setPassword('')
        }
        setIsLoading(false)
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>{bodyTexts[formType].heading}</h1>
            <form className={styles.formContainer}>
                <Input
                    value={username}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    size="large" placeholder="username" prefix={<UserOutlined/>}/>
                <Input.Password
                    size="large"
                    placeholder="password"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    iconRender={(visible: boolean) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                />
                <Button loading={isLoading} onClick={handleSubmit} size="large" type="primary">
                    {bodyTexts[formType].buttonLabel}
                </Button>
            </form>
            <p className={styles.textCenter}>{bodyTexts[formType].footerText}
                <a
                    onClick={toggleForm}
                    className={styles.link}>
                    {bodyTexts[formType].linkText}
                </a>
            </p>
        </div>
    );
}
