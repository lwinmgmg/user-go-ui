"use client";

import Input from "@/src/components/forms/input";
import FormLogo from "@/src/components/logos/form-logo";
import { ChangeEvent, MouseEventHandler, useEffect, useRef, useState } from "react";

export default function Otp({params: {}, searchParams}:{
    params: {
        user_id: string
    },
    searchParams: any
}){
    const sTOutRef = useRef<NodeJS.Timeout | null>(null)
    const formRef = useRef<HTMLFormElement | null>(null)
    const [tOut, setTOut] = useState(6);
    const computeTimeout = ()=>{
        console.log("Current -> ", sTOutRef.current);
        if (sTOutRef.current){
            return
        }
        console.log("DKJFKJSKDF");
        sTOutRef.current = setInterval(() => {
            setTOut(res=>{
                if (res == 0 && sTOutRef.current){
                    clearTimeout(sTOutRef.current);
                    sTOutRef.current = null;
                }
                console.log("TO");
                return res > 0 ? res - 1 : 0
            });
        }, 1000);
    }
    useEffect(()=>{
        return () => (sTOutRef.current ? clearTimeout(sTOutRef.current) : undefined);
    }, [computeTimeout])

    const onConfirm = ()=>{
        if (formRef.current?.reportValidity()){

        }
    }

    return (
        <div className="flex flex-col justify-center items-center my-auto h-full">
            <div className="container border rounded-md w-full max-w-md flex flex-col p-5 space-y-2">
                <div className="h-5"></div>
                <FormLogo/>
                <p className="font-semibold text-slate-600 text-sm text-center">Otp Auth Form</p>
                <form ref={formRef}>
                    <Input label="PassCode" pattern="^[0-9]{6}$" minLength={6} maxLength={6} type="number" placeHolder="eg. 000000" required/>
                </form>
                <div className="flex flex-row space-x-1 text-center">
                    <div className=" w-full"><button onClick={onConfirm} className="btn-primary w-full">Confirm</button></div>
                    <div className="w-full"><button className="btn-secondary w-full" disabled>Resend Code ({tOut})</button></div>
                </div>
                <div className="h-5"></div>
            </div>
        </div>
    );
}