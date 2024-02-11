export default async function enable2Fa(token: string) :Promise<[number, SuccessAuthResponse | DefaultResponse]>{
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`)
    const resp = await fetch("/api/user/v1/user/enable_2fa", {
        method: "GET",
        headers: headers
    })
    return [resp.status, await resp.json() as SuccessAuthResponse]
}
