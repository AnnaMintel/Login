import { useDispatch } from "react-redux";
import { axiosInstance } from "../dal/axios-instance";

const SET_IS_AUTH = 'APP/AUTH/SET_IS_AUTH';
const SET_USER_INFO = 'APP/AUTH/SET_USER_INFO';

let initialState = {
    isAuth: false,
    userInfo: {
        userId: null,
        userName: null,
        avatarUrl: ''
    }
}

export const setIsAuth = (value) => ({ type: SET_IS_AUTH, value });
export const setIsUserInfo = (userId, userName) => ({ type: SET_USER_INFO, userId, userName });

//thunk
export const me = () => (dispatch) => {
    axiosInstance.get('auth/me')
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsAuth(true));
                dispatch(setIsUserInfo(res.data.data.userId, res.data.data.login));
            }
        })
}

export const logOut = () => (dispatch) => {
    axiosInstance.get('auth/logout')
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsAuth(false));
                dispatch(setIsUserInfo(null, null));
            } else {
                dispatch(setIsAuth(false));
            }
        })
}

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_AUTH:
            return {
                ...state,
                isAuth: action.value
            }
        case SET_USER_INFO:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    userId: action.userId,
                    userName: action.userName
                }
            }
        default:
            return state
    }
}

//thunk
export const login = (login, pass, rm, captcha) => (dispatch) => {
    dispatch(setStatus(statuses.INPROGRESS));

    axiosInstance.post('auth/login', {
        email: login,
        password: pass,
        rememberMe: rm
    }).then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(setStatus(statuses.SUCCESS));
            dispatch(setIsAuth(true));
        } else {
            dispatch(setStatus(statuses.ERROR));
            dispatch(setMessage(res.data.messages[0]));
        }
    })
}