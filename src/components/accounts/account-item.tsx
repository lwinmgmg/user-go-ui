"use client";

import { getTokenByUserId, removeUserFromList } from "@/src/cookies/auth-cookies";
import getProfile, { UserInfo } from "@/src/fetcher/get-profile";
import { useEffect, useState } from "react";

const defaultAvatar = "https://i.imgur.com/WxNkK7J.png";


export default function AccountItem({
    userId,
}:{
    userId: string,
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
                }
            }
        );
    }, []);

    return user ? (
        <div className="h-20 flex flex-row rounded-md items-center px-5 cursor-pointer hover:bg-slate-100">
            <div className="h-16 w-16 ring-1 rounded-full" style={{
                backgroundImage: `url(${user.img_url == "" || user.img_url == undefined ? defaultAvatar : user.img_url})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                }}>
            </div>
            <div className="px-5 space-y-1">
                <p className="text-md font-semibold">{user.firstname} {user.lastname}</p>
                <p className="text-sm">{user.email}</p>
            </div>
        </div>
    ):null;
}