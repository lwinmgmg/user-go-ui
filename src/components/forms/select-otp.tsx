import { ChangeEvent, LegacyRef } from "react";

export default function SelectOtp({
    innerRef,
    value,
    onChange,
    disabled=false,
}:{
    innerRef?: LegacyRef<HTMLSelectElement>,
    disabled?: boolean,
    value?: string,
    onChange: (e: ChangeEvent<HTMLSelectElement>)=>void
}){
    return (
        <div>
            <p className="block mb-2 text-xs font-semibold text-gray-900">Otp Type</p>
            <select value={value} onChange={onChange} disabled={disabled} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option value="phone">Phone</option>
            <option value="email">Email</option>
            </select>
        </div>
    );
}