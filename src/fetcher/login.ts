export type SuccessLoginResponse = {
    token_type: string,
    access_token: string
};

export default async function userLogin(username: string | undefined, password: string | undefined) :Promise<[number, SuccessLoginResponse | DefaultResponse]>{
    const formData = new FormData();
    formData.append("username", username || "");
    formData.append("password", password || "");
    const resp = await fetch("/api/user/v1/func/user/login", {
        method: "POST",
        body: formData
    })
    return [resp.status, await resp.json() as SuccessLoginResponse]
}
