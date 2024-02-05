"use client";

import AlertDismiss, { AlertType } from "@/src/components/alerts/dismiss";
import GoogleLogin from "@/src/components/forms/google-login";
import Input from "@/src/components/forms/input";
import FormLogo from "@/src/components/logos/form-logo";
import userLogin, { SuccessLoginResponse } from "@/src/fetcher/login";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";

export default function Signup(){
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAlert, setIsAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [alertType, setAlertType] = useState<AlertType>("info");
    const username = useRef<HTMLInputElement | null>(null);
    const password = useRef<HTMLInputElement | null>(null);
    const router = useRouter()

    const onSuccess = async (data: SuccessLoginResponse)=>{
        switch (data.token_type){
            case "Bearer":
                router.push("/");
        }
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setIsLoading(true);
        try{
            const [statusCode, resp] = await userLogin(username.current?.value, password.current?.value)
            if (statusCode != 200){
                setMessage((resp as DefaultResponse).message);
                setIsAlert(true);
                setAlertType("error");
            }
            await onSuccess(resp as SuccessLoginResponse);
        }
        catch(e){
            setMessage("Error on connecting backend");
            setIsAlert(true);
            setAlertType("error")
        }finally{
            setIsLoading(false);
        }
    }
    return (
        <main className="flex flex-row justify-center items-center h-full">
            <form className="container border rounded-md w-full max-w-md flex flex-col p-5 space-y-2" onSubmit={onSubmit}>
                <div className="h-5"></div>
                <FormLogo />
                <div className="h-3"></div>
                <div>
                    <Input innerRef={username} label="Username" placeHolder="Username or Email" />
                </div>
                <div>
                    <Input innerRef={password} placeHolder="Password" type="password" label="Password" />
                </div>
                <div className="h-1"></div>
                <button className="btn-primary shadow-sm hover:shadow-lg">{isLoading?"Logging in...":"Login"}</button>
                <p className="text-sm text-slate-600">If you don't have an account, please Signup <Link href="/signup" className="text-blue-400">here</Link></p>
                <p className="text-center text-sm font-bold">Or</p>
                <GoogleLogin />
                <div className="h-5"></div>
            </form>
            <AlertDismiss show={isAlert} setShow={setIsAlert} type={alertType}>{message}</AlertDismiss>
        </main>
    );
}