export type OtpResendResp = {
    access_token: string,
    sotp_type: ResendType,
    mesg: string
}

export default async function resendOtp(token: string | undefined, resendType: ResendType) :Promise<[number, OtpResendResp | DefaultResponse]>{
    const formData = new FormData();
    formData.append("access_token", token || "");
    formData.append("sotp_type", resendType || "");
    const resp = await fetch("/api/user/v1/func/user/resend_otp", {
        method: "POST",
        body: formData
    })
    return [resp.status, await resp.json() as OtpResendResp]
}
