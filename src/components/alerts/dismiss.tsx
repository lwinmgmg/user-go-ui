"use client";

import { useEffect, useState } from "react";

export type AlertType = "info" | "warn" | "error"

export default function AlertDismiss(
    {
        show=false,
        setShow,
        children,
        type = "info"
    }:{
        show?: boolean,
        setShow?: (e: boolean)=>void,
        type?: AlertType,
        children?: any
    }
){
    const [isShow, setIsShow] = useState<boolean>(false);
    useEffect(()=>{
        setIsShow(show);
        if (show){
            setTimeout(()=>{
                setIsShow(false);
                if (setShow){
                    setShow(false);
                }
            }, 5000);
        }
    }, [show, setShow]);
    var parentClassName = "flex items-center p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
    var childClassName = "ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
    switch (type){
        case "error":
            parentClassName = "flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            childClassName = "ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
    }

    return (
        <div className={`absolute bottom-0 ${isShow?"":"hidden"}`}>
            <div id="alert-1" className={parentClassName} role="alert">
            <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span className="sr-only">Info</span>
            <div className="ms-3 text-sm font-medium">
                {children}
            </div>
                <button type="button" onClick={()=>setIsShow(false)} className={childClassName} data-dismiss-target="#alert-1" aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
            </div>
        </div>
    );
}