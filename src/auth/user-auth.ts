"use client"

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { setActiveUser, setAuthCookie } from "../cookies/auth-cookies";

export default async function onSuccess(data: SuccessAuthResponse, router: AppRouterInstance, searchParams: {}){
    const params = new URLSearchParams(searchParams);
    switch (data.token_type){
        case "Bearer":
            router.push("/accounts" + "?" + params.toString());
            setAuthCookie(data);
            setActiveUser(data.user_id);
    }
}