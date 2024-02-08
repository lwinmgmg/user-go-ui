"use client";

import { getTokenByUserId, removeTokenByUserId, removeUserFromList } from "@/src/cookies/auth-cookies";
import getProfile, { UserInfo } from "@/src/fetcher/get-profile";
import { useEffect, useState } from "react";

const defaultAvatar = "https://i.imgur.com/WxNkK7J.png";


export default function AccountItem({
    userId,
    removeUser,
}:{
    userId: string,
    removeUser: (userCode: string)=>void
}){
    const [user, setUser] = useState<UserInfo>();

    useEffect(()=>{
        const token = getTokenByUserId(userId);
        getProfile(token || "").then(
            ([statusCode, userInfo])=>{
                if (statusCode == 200){
                    setUser(userInfo as UserInfo);
                }else if(statusCode == 401){
                    removeUserFromList(userId);
                    removeTokenByUserId(userId);
                }
            }
        );
    }, []);

    const logout = ()=>{
        removeUser(userId);
    }

    return user ? (
        <div className="flex flex-row items-center justify-between">
            <button className="h-20 grow rounded-s-lg flex flex-row items-center px-5 cursor-pointer hover:bg-slate-200 focus:bg-slate-300">
                <div className="h-16 w-16 ring-1 rounded-full" style={{
                    backgroundImage: `url(${user.img_url == "" || user.img_url == undefined ? defaultAvatar : user.img_url})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    }}>
                </div>
                <div className="px-5 space-y-1 text-left">
                    <p className="text-md font-semibold">{user.firstname} {user.lastname}</p>
                    <p className="text-sm">{user.email}</p>
                </div>
            </button>
            <button onClick={logout} className="w-10 h-full rounded-e-md flex flex-col justify-center items-center cursor-pointer hover:bg-slate-200 focus:bg-slate-300">
                <div className=""><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg></div>
            </button>
        </div>
    ):null;
}