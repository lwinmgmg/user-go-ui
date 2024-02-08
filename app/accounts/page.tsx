"use client";

import AccountItem from "@/src/components/accounts/account-item";
import FormLogo from "@/src/components/logos/form-logo";
import { getUserList, removeTokenByUserId, removeUserFromList } from "@/src/cookies/auth-cookies";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Accounts({searchParams}:{
    searchParams: any
}){
    const [users, setUsers] = useState<string[]>([]);
    const removeUser = (userCode: string)=>{
        removeUserFromList(userCode);
        removeTokenByUserId(userCode);
        setUsers([...getUserList()]);
    }
    useEffect(()=>{
        setUsers([...getUserList()]);
    }, [])
    return (
        <div className="flex flex-col justify-center items-center my-auto h-full">
            <div className="w-full max-w-md text-center rounded-lg border flex flex-col items-center p-5">
                <div className="h-5"></div>
                <FormLogo/>
                <p className="font-semibold text-slate-600 text-sm text-center">Account Center</p>
                {
                    users && users.length > 0 ? <div className="container flex flex-col p-5 divide-y-2 bg-slate-50">
                        {
                            users.map(user=><AccountItem removeUser={removeUser} key={user} userId={user} />)
                        }
                    </div> : null
                }
                <div className="h-2"></div>
                <Link href={{ pathname: '/login', query: searchParams }} className="btn-secondary w-1/2 flex flex-row justify-evenly"><span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" /></svg></span>Add an account</Link>
                <div className="h-5"></div>
            </div>
        </div>
    );
}
