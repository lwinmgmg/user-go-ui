export type AuthenticatorResponse = {
    token_type: string,
    access_token: string,
    user_id: string,
    key: string,
    image: string
    sotp_type: ResendType
}

export default async function enableAuth(token: string) :Promise<[number, AuthenticatorResponse | DefaultResponse]>{
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`)
    const resp = await fetch("/api/user/v1/user/enable_authenticator", {
        method: "GET",
        headers: headers
    })
    return [resp.status, await resp.json() as AuthenticatorResponse]
}
