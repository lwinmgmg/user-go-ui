export type UserDetail = {
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    img_url?: string,
    user_id: string
    is_auth: boolean,
    is_email: boolean,
    is_2fa: boolean,
    is_phone: boolean
}

export default async function getProfileDetail(token: string) :Promise<[number, UserDetail | DefaultResponse]>{
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`)
    const resp = await fetch("/api/user/v1/user/profile_detail", {
        method: "GET",
        headers: headers
    })
    return [resp.status, await resp.json() as UserDetail]
}