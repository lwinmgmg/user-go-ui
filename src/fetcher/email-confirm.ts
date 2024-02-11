export default async function emailConfirm(token: string) :Promise<[number, SuccessAuthResponse | DefaultResponse]>{
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`)
    const resp = await fetch("/api/user/v1/user/email_confirm", {
        method: "GET",
        headers: headers
    })
    return [resp.status, await resp.json() as SuccessAuthResponse]
}
