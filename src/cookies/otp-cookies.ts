import Cookies from "universal-cookie";

const OTP_PREFIX = "OTP";
const MAX_TIMEOUT = 300;

export function setActiveOtp(userCode: string, value: SuccessAuthResponse){
    const cookie = new Cookies();
    cookie.set(OTP_PREFIX+userCode, value, {
        maxAge: MAX_TIMEOUT
    })
}

export function getActiveOtp(userCode: string): SuccessAuthResponse | null {
    const cookie = new Cookies();
    const otpData = cookie.get(OTP_PREFIX+userCode)
    if (otpData && Object.keys(otpData).length !== 0){
        return otpData
    }
    return null
}
