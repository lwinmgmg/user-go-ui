type DefaultResponse ={
    code: number,
    message: string,
    data: any
};

type SuccessAuthResponse = {
    token_type: string,
    access_token: string,
    user_id: string
};
