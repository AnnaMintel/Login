import { axiosInstance } from "../dal/axios-instance";

const SET_STATUS = 'APP/LOGIN/SET_STATUS';
const SET_MESSAGE = 'APP/LOGIN/SET_MESSAGE';

export const statuses = {
    INIT: 'INIT',
    ERROR: 'ERROR',
    INPROGRESS: 'INPROGRESS',
    CAPTCH: 'CAPTCHA',
    SUCCESS: 'SUCCESS'
}

let initialState = {
    status: statuses.INIT,
    message: ''
}

export const setStatus = (status) => ({ type: SET_STATUS, status })
export const setMessage = (message) => ({ type: SET_MESSAGE, message })

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
            alert('you are loggined');
        } else {
            dispatch(setStatus(statuses.ERROR));
            dispatch(setMessage(res.data.messages[0]));
        }
    })
}

export const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SET_MESSAGE:
            return {
                ...state,
                message: action.message
            }
        default:
            return state
    }
}
