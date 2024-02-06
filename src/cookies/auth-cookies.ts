import Cookies from "universal-cookie";

const USERLIST_KEY = "fksjdjfksjkfjskjaf";
const ACTIVE_USER_KEY = "kdslfskfjafsdlfa";

export function getUserList(): Array<string>{
    const cookie = new Cookies();
    const users = cookie.get(USERLIST_KEY);
    if (users){
        return users as Array<string>
    }
    return [];
}

export function setUserList(userCode: string){
    const cookie = new Cookies();
    const users = cookie.get(USERLIST_KEY);
    const userSet = new Set([userCode, ...(users ? users : [])])
    cookie.set(USERLIST_KEY, [...userSet.values()]);
}

export function removeUserFromList(userCode: string){
    const cookie = new Cookies();
    const users =  getUserList();
    const newUsers = new Set(users.filter(user=>user != userCode));
    cookie.set(USERLIST_KEY, newUsers);
}

export function setAuthCookie(data: SuccessAuthResponse) {
    const cookie = new Cookies();
    setUserList(data.user_id);
    cookie.set(data.user_id, data.access_token);
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
    cookie.set(ACTIVE_USER_KEY, userCode);
}

export function getActiveUser(): string | undefined{
    const cookie = new Cookies();
    return cookie.get(ACTIVE_USER_KEY);
}
