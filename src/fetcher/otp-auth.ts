export default async function otpAuth(passCode: string, accessToken: string): Promise<[number, SuccessAuthResponse | DefaultResponse]>{
    const formData = new FormData();
    formData.append("passcode", passCode);
    formData.append("access_token", accessToken);
    const resp = await fetch("/api/user/v1/func/user/otp_auth", {
        method: "POST",
        body: formData
    })
    return [resp.status, await resp.json() as SuccessAuthResponse]
}