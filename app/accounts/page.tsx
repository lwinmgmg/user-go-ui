"use client";

import AccountItem from "@/src/components/accounts/account-item";
import { getUserList } from "@/src/cookies/auth-cookies";
import { useEffect, useState } from "react";

export default function Accounts({searchParams}:{
    searchParams: any
}){
    const [users, setUsers] = useState<string[]>([]);

    useEffect(()=>{
        setUsers(getUserList());
    }, [])
    return (
        <div className="flex flex-col justify-center items-center my-auto h-full">
            <div className="container border rounded-md w-full max-w-md flex flex-col p-5 divide-y-2 bg-slate-50">
                {
                    users.map(user=><AccountItem key={user} userId={user} />)
                }
            </div>
        </div>
    );
}