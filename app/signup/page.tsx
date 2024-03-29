"use client"
import FormLogo from "@/src/components/logos/form-logo";
import Input from "@/src/components/forms/input";
import Link from "next/link";
import GoogleSignup from "@/src/components/forms/google-signup";
import { FormEvent, useRef, useState } from "react";
import AlertDismiss, { AlertType } from "@/src/components/alerts/dismiss";
import userSignup from "@/src/fetcher/signup";
import onSuccess from "@/src/auth/user-auth";
import { useRouter } from "next/navigation";

export default function Signup({searchParams}:{
    searchParams: any
}){
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAlert, setIsAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [alertType, setAlertType] = useState<AlertType>("info");

    const firstname = useRef<HTMLInputElement | null>(null);
    const lastname = useRef<HTMLInputElement | null>(null);
    const username = useRef<HTMLInputElement | null>(null);
    const email = useRef<HTMLInputElement | null>(null);
    const phone = useRef<HTMLInputElement | null>(null);
    const password = useRef<HTMLInputElement | null>(null);
    const confirmPassword = useRef<HTMLInputElement | null>(null);

    const router = useRouter();

    const onSubmit = async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setIsLoading(true);
        if (password.current?.value != confirmPassword.current?.value){
            setMessage("Password are not same");
            setAlertType("error");
            setIsAlert(true);
            return
        }
        try{
            const [statusCode, resp] = await userSignup(firstname.current?.value, lastname.current?.value,
                username.current?.value, password.current?.value, email.current?.value, phone.current?.value);
            if (statusCode == 200){
                setMessage("Successfully Signup");
                setIsAlert(true);
                setAlertType("info");
                onSuccess(resp as SuccessAuthResponse, router, searchParams)
            }else{
                setMessage((resp as DefaultResponse).message || "Internal Server Error");
                setIsAlert(true);
                setAlertType("error");
            }
        }finally{
            setIsLoading(false);
        }
    }
    return (
        <div className="flex flex-col justify-center items-center my-auto h-full">
            <form className="container border rounded-md w-full max-w-md flex flex-col p-5 space-y-2" onSubmit={onSubmit}>
                <div className="h-5"></div>
                <FormLogo/>
                <p className="font-semibold text-slate-600 text-sm text-center">User Sign Up Form</p>
                <div className="h-3"></div>
                <div className="flex flex-row justify-between space-x-1">
                    <div>
                        <Input innerRef={firstname} placeHolder="First Name" label="First Name" required/>
                    </div>
                    <div>
                        <Input innerRef={lastname} placeHolder="Last Name" label="Last Name" />
                    </div>
                </div>
                <div>
                    <Input innerRef={email} label="Email" type="email" placeHolder="example@gmail.com" required/>
                </div>
                <div>
                    <Input innerRef={phone} label="Phone" type="text" placeHolder="Phone" required/>
                </div>
                <div>
                    <Input innerRef={username} label="Username" placeHolder="username" required/>
                </div>
                <div className="flex flex-row justify-between space-x-1">
                    <div>
                        <Input innerRef={password} placeHolder="Password" type="password" label="Password" autoComplete="new-password" required/>
                    </div>
                    <div>
                        <Input innerRef={confirmPassword} placeHolder="Confirm Password" type="password" label="Confirm Password" autoComplete="new-password" required/>
                    </div>
                </div>
                <div className="h-1"></div>
                <p className="text-xs text-slate-600">By creating an account, you agree to the Terms of use and Privacy Policy</p>
                <button className="btn-primary">{isLoading ? "Signing Up...":"Sign Up"}</button>
                <p className="text-sm text-slate-600">If you already have an account, please login <Link href={{ pathname: '/login', query: searchParams }} className="text-blue-400">here</Link></p>
                <p className="text-center text-sm font-bold">Or</p>
                <GoogleSignup />
                <Link className="btn-secondary shadow-sm hover:shadow-lg text-center" href={{ pathname: '/accounts', query: searchParams }}>Back to my accounts</Link>
                <div className="h-5"></div>
            </form>
            <AlertDismiss show={isAlert} setShow={setIsAlert} type={alertType}>{message}</AlertDismiss>
        </div>
    );
}