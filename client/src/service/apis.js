const BASE_URL = process.env.REACT_APP_BASE_URL

// ??USER APIS
export const userEndpoints = {
    LOGIN_API: BASE_URL + "/user/login",
    REGISTER_API: BASE_URL + "/user/signup",
    FETCH_PROFILE: BASE_URL + "/user/fetchMyProfile",
    LOGOUT_API: BASE_URL + "/user/logout",
    ALL_SESSION_API: BASE_URL + "/user/getsession",
}



