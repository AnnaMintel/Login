import { axiosInstance } from "../dal/axios-instance";
import { setMessage, setStatus, statuses } from "./loginReducer";

const SET_IS_AUTH = 'APP/AUTH/SET_IS_AUTH';

let initialState = {
    isAuth: false
}

export const setIsAuth = (isAuth) => ({ type: SET_IS_AUTH, isAuth });

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_AUTH:
            return {
                ...state,
                isAuth: action.isAuth
            }
        default:
            return state;
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

//thunk
export const logOut = () => (dispatch) => {
    axiosInstance.delete('auth/login')
        .then((res) => {
            dispatch(setIsAuth(false));
        })
}