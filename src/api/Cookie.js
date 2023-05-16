import Cookies from "js-cookie";

const ACCESS_TOKEN = "access_token";
const USER_ROLES = "user_roles";

export const saveAccessToken = (token) => Cookies.set(ACCESS_TOKEN, token);
export const getAccessToken = () => Cookies.get(ACCESS_TOKEN);
export const deleteAccessToken = () => Cookies.remove(ACCESS_TOKEN);
export const saveUserRoles = (roles) => Cookies.set(USER_ROLES, roles);
export const getUserRoles = () => Cookies.get(USER_ROLES);
export const deleteUserRoles = () => Cookies.remove(USER_ROLES);
