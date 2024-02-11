export type UserInfo = {
    firstname: string,
    lastname: string,
    email: string,
    img_url?: string,
    user_id: string
}

export default async function getProfile(token: string) :Promise<[number, UserInfo | DefaultResponse]>{
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`)
    const resp = await fetch("/api/user/v1/user/profile", {
        method: "GET",
        headers: headers
    })
    return [resp.status, await resp.json() as UserInfo]
}