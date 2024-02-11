import Cookies from "universal-cookie";

const USERLIST_KEY = "fksjdjfksjkfjskjaf";
const ACTIVE_USER_KEY = "kdslfskfjafsdlfa";
const AUTH_TIMEOUT = 30 * 24 * 3600

export function getUserList(): Array<string>{
    const cookie = new Cookies();
    const users = cookie.get(USERLIST_KEY);
    if (users && Object.keys(users).length !== 0){
        return users as Array<string>
    }
    return [];
}

export function setUserList(userCode: string){
    const cookie = new Cookies();
    const users = cookie.get(USERLIST_KEY);
    const userSet = new Set([userCode, ...(users && Object.keys(users).length !== 0 ? users : [])])
    cookie.set(USERLIST_KEY, [...userSet.values()], {
        maxAge: AUTH_TIMEOUT
    });
}

export function removeUserFromList(userCode: string){
    const cookie = new Cookies();
    const users =  getUserList();
    if (users){
        const newUsers = new Set([...users.filter(user=>user != userCode)]);
        cookie.set(USERLIST_KEY, [...newUsers.values()], {
            maxAge: AUTH_TIMEOUT
        });
    }
}

export function setAuthCookie(data: SuccessAuthResponse) {
    const cookie = new Cookies();
    setUserList(data.user_id);
    cookie.set(data.user_id, data.access_token, {
        maxAge: AUTH_TIMEOUT
    });
}

export function getTokenByUserId(userCode: string): string | undefined{
    const cookie = new Cookies();
    return cookie.get(userCode);
}

export function removeTokenByUserId(userCode: string){
    const cookie = new Cookies();
    cookie.remove(userCode);
}

export function setActiveUser(userCode: string){
    const cookie = new Cookies();
    cookie.set(ACTIVE_USER_KEY, userCode, {
        maxAge: AUTH_TIMEOUT
    });
}

export function getActiveUser(): string | undefined{
    const cookie = new Cookies();
    return cookie.get(ACTIVE_USER_KEY);
}
