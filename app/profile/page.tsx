"use client";

import { getActiveUser, getTokenByUserId } from "@/src/cookies/auth-cookies";
import { setActiveOtp } from "@/src/cookies/otp-cookies";
import emailConfirm from "@/src/fetcher/email-confirm";
import enable2Fa from "@/src/fetcher/enable-2fa";
import enableAuth from "@/src/fetcher/enable-auth";
import getProfileDetail, { UserDetail } from "@/src/fetcher/get-profile-detail";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const defaultAvatar = "https://i.imgur.com/WxNkK7J.png";

export default function Profile({searchParams}:{
    searchParams: any
}){
    const [menu, setMenu] = useState(0);
    const [firstname, setFirstname] = useState("Lwin Maung");
    const [lastname, setLastname] = useState("Maung");
    const [email, setEmail] = useState("lwinmgmg@mail.com");
    const [phone, setPhone] = useState("");
    const [token, setToken] = useState("");
    const [isEmail, setIsEmail] = useState(false);
    const [is2Fa, setIs2Fa] = useState(false);
    const [isPhone, setIsPhone] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const router = useRouter();

    const onClickProfile = ()=>{
        setMenu(0);
    }
    const onClickAccount = ()=>{
        setMenu(1);
    }

    const onConfirmEmail = async ()=>{
        var [statusCode, resp] = await emailConfirm(token);
        if (statusCode === 200){
            setActiveOtp([resp as SuccessAuthResponse, "2"]);
            router.push("/otp");
        }
    }
    const onEnable2Fa = async ()=>{
        var [statusCode, resp] = await enable2Fa(token);
        if (statusCode === 200){
            setActiveOtp([resp as SuccessAuthResponse, "2"]);
            router.push("/otp");
        }
    }
    const onEnableAuth = async ()=>{
        var [statusCode, resp] = await enableAuth(token);
        if (statusCode === 200){
            setActiveOtp([resp as SuccessAuthResponse, "3"]);
            router.push("/otp");
        }
    }

    useEffect(()=>{
        const userCode = getActiveUser();
        const tkn = getTokenByUserId(userCode || "")
        if (userCode && tkn){
            setToken(tkn);
            getProfileDetail(tkn).then(
                ([statusCode, userDetail])=>{
                    userDetail = userDetail as UserDetail
                    if (statusCode == 200){
                        setFirstname(userDetail.firstname);
                        setLastname(userDetail.lastname);
                        setEmail(userDetail.email);
                        setPhone(userDetail.phone);
                        setIsEmail(userDetail.is_email);
                        setIs2Fa(userDetail.is_2fa);
                        setIsPhone(userDetail.is_phone);
                        setIsAuth(userDetail.is_auth);
                    }
                }
            )
        }else{
            router.push("/accounts");
        }
    }, []);
    return (
        <div className="flex flex-col justify-center items-center my-auto h-full">
            <div className="w-full max-w-md text-center rounded-lg border flex flex-col items-center p-5">
                <div className="flex flex-col justify-stretch items-center p-1 rounded-full ring-1 ring-slate-200">
                    <div className="w-24 h-24 rounded-full ring-1 ring-slate-100 flex flex-row justify-center items-center relative" style={{
                    backgroundImage: `url(${defaultAvatar})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    }}>
                    <div className="p-1 absolute rounded-full bottom-0 right-0 cursor-pointer hover:ring-1 hover:bg-slate-200"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg></div>
                    </div>
                </div>
                <div className="h-5"></div>
                <h2 className="text-center text-xl font-bold">{firstname} {lastname}</h2>
                <div className="h-5"></div>
                
                <div className="w-full">
                    <div className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
                        <div className="me-2">
                            <button onClick={onClickProfile} className={"inline-block p-4 rounded-t-lg hover:border focus:border hover:border-b-0 focus:border-b-0" + (menu===0 ? " border border-b-0":"")}>Profile</button>
                        </div>
                        <div className="me-2">
                            <button onClick={onClickAccount} className={"inline-block p-4 rounded-t-lg hover:border focus:border hover:border-b-0 focus:border-b-0" + (menu===1 ? " border border-b-0":"")}>Account</button>
                        </div>
                    </div>
                </div>
                {
                menu === 0 ? (
                    <div className="text-left space-y-5 w-full px-5 pt-5">
                        <div>
                            <label className="text-sm font-medium text-slate-700">First Name</label>
                            <input value={firstname} onChange={(e)=>setFirstname(e.currentTarget.value)} placeholder="First Name" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700">First Name</label>
                            <input value={lastname} onChange={(e)=>setLastname(e.currentTarget.value)} placeholder="Last Name" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700">First Name</label>
                            <input value={email} readOnly placeholder="Email" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700">First Name</label>
                            <input value={phone} readOnly placeholder="Phone" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                        </div>
                        <div className="space-x-2">
                            <button className="btn-primary">Save</button>
                            <button className="btn-secondary">Cancel</button>
                        </div>
                    </div>
                ) : null
                }
                {
                menu === 1 ? (
                <div className="text-left space-y-5 w-full px-5  pt-5">
                    <div>
                        <button className="btn-primary">Change Password</button>
                    </div>
                    <div>
                        <p className="text-sm"><span className="font-bold">Email Confirm Status : </span>{isEmail ? "Yes" : "No"}</p>
                        {
                            isEmail ? null:(<button onClick={onConfirmEmail} className="btn-primary">Confirm Email</button>)
                        }
                    </div>
                    <div>
                        <p className="text-sm"><span className="font-bold">Phone Confirm Status : </span>{isPhone ? "Yes" : "No"}</p>
                        {
                            isPhone ? null:(<button className="btn-primary">Confirm Phone</button>)
                        }
                    </div>
                    <div>
                        <p className="text-sm"><span className="font-bold">2FA Status : </span>{is2Fa ? "Yes" : "No"}</p>
                        {
                            is2Fa ? null:(<button onClick={onEnable2Fa} className="btn-primary">Enable 2FA</button>)
                        }
                    </div>
                    <div>
                        <p className="text-sm"><span className="font-bold">Is Enabled Authenticator? : </span>{isAuth ? "Yes" : "No"}</p>
                        {
                            isAuth ? null:(<button onClick={onEnableAuth} className="btn-primary">Enable Authenticator</button>)
                        }
                    </div>
                </div>
                ):null
                }
            <div className="h-5"></div>
            <div className="flex flex-row w-full">
                <Link className="btn-secondary shadow-sm hover:shadow-lg text-center w-full" href={{ pathname: '/accounts', query: searchParams }}>Back to my accounts</Link>
            </div>
            <div className="h-5"></div>
            </div>
        </div>
    );
}
