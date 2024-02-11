export default async function userSignup(firstname: string | undefined, lastname: string | undefined, username: string | undefined,
    password: string | undefined, email: string | undefined, phone: string | undefined) :Promise<[number, SuccessAuthResponse | DefaultResponse]>{
    const formData = new FormData();
    formData.append("username", username || "");
    formData.append("password", password || "");
    formData.append("firstname", firstname || "");
    formData.append("lastname", lastname || "");
    formData.append("email", email || "");
    formData.append("phone", phone || "")
    const resp = await fetch("/api/user/v1/func/user/signup", {
        method: "POST",
        body: formData
    })
    return [resp.status, await resp.json() as SuccessAuthResponse]
}
