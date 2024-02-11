import Cookies from "universal-cookie";

const OTP_KEY = "OTP_KEY";
const MAX_TIMEOUT = 300;

export function setActiveOtp(values: [SuccessAuthResponse, string]){
    const cookie = new Cookies();
    cookie.set(OTP_KEY, values, {
        maxAge: MAX_TIMEOUT
    })
}

export function getActiveOtp(): [SuccessAuthResponse, string] | null {
    const cookie = new Cookies();
    const otpData = cookie.get(OTP_KEY);
    if (otpData && Object.keys(otpData).length !== 0){
        return otpData
    }
    return null
}

export function removeActiveOtp(){
    const cookie = new Cookies();
    cookie.remove(OTP_KEY);
}
