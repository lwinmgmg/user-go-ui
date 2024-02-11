type DefaultResponse ={
    code: number,
    message: string,
    data: any
};
type ResendType = "phone" | "email" | "auth" | "";

type SuccessAuthResponse = {
    token_type: string,
    access_token: string,
    user_id: string,
    sotp_type: ResendType
};
