"use client";

import onSuccess from "@/src/auth/user-auth";
import AlertDismiss, { AlertType } from "@/src/components/alerts/dismiss";
import Input from "@/src/components/forms/input";
import SelectOtp from "@/src/components/forms/select-otp";
import FormLogo from "@/src/components/logos/form-logo";
import { getActiveOtp, removeActiveOtp } from "@/src/cookies/otp-cookies";
import { AuthenticatorResponse } from "@/src/fetcher/enable-auth";
import otpAuth from "@/src/fetcher/otp-auth";
import resendOtp, { OtpResendResp } from "@/src/fetcher/resend-otp";
import { useRouter } from "next/navigation";
import {ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

const OTP_TIMEOUT = 60;

export default function Otp({params: {}, searchParams}:{
    params: {
        user_id: string
    },
    searchParams: any
}){
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAlert, setIsAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [alertType, setAlertType] = useState<AlertType>("info");
    const formRef = useRef<HTMLFormElement | null>(null);
    const passCode = useRef<HTMLInputElement | null>(null);
    const [tOut, setTOut] = useState(OTP_TIMEOUT);
    const [otp, setOtp] = useState<SuccessAuthResponse | AuthenticatorResponse | null>(null);
    const [sendType, setSendType] = useState<ResendType>("");
    const [otpType, setOtpType] = useState<string>("");
    const router = useRouter();

    useEffect(()=>{
        const otpData = getActiveOtp();
        if (!otpData){
            router.back();
            return
        }
        setOtp(otpData[0]);
        setSendType(otpData[0].sotp_type);
        setOtpType(otpData[1]);
        const start = setInterval(()=>{
            setTOut(res=>res > 0 ? res - 1 : 0);
        }, 1000);
        return () => clearTimeout(start)
    }, [router])

    const onConfirm = async ()=>{
        if (formRef.current?.reportValidity()){
            try{
                setIsLoading(true);
                const [statusCode, data] = await otpAuth(passCode.current?.value || "", otp?.access_token || "");
                if (statusCode == 200){
                    const successData = (data as SuccessAuthResponse)
                    switch (otpType){
                        case "1":
                            onSuccess(successData, router, searchParams);
                            break
                        default:
                            router.back();
                            break
                    }
                }else{
                    setMessage((data as DefaultResponse).message || "Internal Server Error");
                    setAlertType("error");
                    setIsAlert(true);
                }
            }finally{
                setIsLoading(false);
            }
        }else{
            setMessage("Invalid Passcode");
            setAlertType("error");
            setIsAlert(true);
        }
    }
    const onResent = async ()=>{
        const [statusCode , data] = await resendOtp(otp?.access_token, sendType);
        if (statusCode == 200){
            setSendType((data as OtpResendResp).sotp_type)
            setMessage((data as OtpResendResp).mesg);
            setAlertType("info");
            setIsAlert(true);
        }else if (statusCode == 404){
            router.back()
        }else{
            setMessage((data as DefaultResponse).message || "Internal Server Error");
            setAlertType("error");
            setIsAlert(true);
        }
        setTOut(OTP_TIMEOUT);
    }

    const onBack = ()=>{
        router.back()
    }

    const onSelect = (e: ChangeEvent<HTMLSelectElement>)=>{
        setSendType(e.target.value as ResendType);
    }

    return (
        <div className="flex flex-col justify-center items-center my-auto h-full">
            <div className="container border rounded-md w-full max-w-md flex flex-col p-5 space-y-2">
                <div className="h-5"></div>
                <FormLogo/>
                <p className="font-semibold text-slate-600 text-sm text-center">Otp Auth Form</p>
                {
                    otp && (otp as AuthenticatorResponse).image ? (
                    <div className="flex flex-col justify-center items-center">
                        <div className="h-52 w-52" style={{
                            backgroundImage: `url(data:image/png;base64,${(otp as AuthenticatorResponse).image})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            }}>
                        </div>
                        <p>{(otp as AuthenticatorResponse).key}</p>
                    </div>):null
                }
                <form ref={formRef}>
                    <Input innerRef={passCode} label="PassCode" pattern="^[0-9]{6}$" minLength={6} maxLength={6} type="text" placeHolder="eg. 000000" required/>
                    <div className="h-2"></div>
                    {
                        sendType == "auth" ? (
                            <p className="text-xs">Please Check OTP code in Authenticator or click here to use recovery codes</p>
                        ):(
                            <div>
                                <SelectOtp disabled={tOut !== 0} onChange={onSelect} value={sendType} />
                            </div>
                        )
                    }
                </form>

                <div className="flex flex-row space-x-1 text-center">
                    <div className="w-full"><button onClick={onConfirm} className="btn-primary w-full">{isLoading ? "Confirming" : "Confirm"}</button></div>
                    {
                        sendType !== "auth" ? (
                            <div className="w-full"><button onClick={onResent} className="btn-secondary w-full" disabled={tOut != 0}>Resend Code ({tOut})</button></div>
                        ):null
                    }
                </div>
                <div className="flex flex-row space-x-1 text-center">
                    <div className="w-full"><button onClick={onBack} className="btn-secondary w-full">Back</button></div>
                </div>
                <div className="h-5"></div>
            </div>
            <AlertDismiss show={isAlert} setShow={setIsAlert} type={alertType}>{message}</AlertDismiss>
        </div>
    );
}
