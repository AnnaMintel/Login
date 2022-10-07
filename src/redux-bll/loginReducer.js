import { axiosInstance } from "../dal/axios-instance";
import { me, setIsAuth } from "./authReducer";

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
    status: 'INIT',
    message: ''
}

export const setStatus = (status) => ({ type: SET_STATUS, status })
export const setMessage = (message) => ({ type: SET_MESSAGE, message })

export const loginReducer = (state = initialState, action) => {
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

//thunk
export const login = (payload) => (dispatch) => {
    dispatch(setStatus(statuses.INPROGRESS));

    axiosInstance.post('auth/login', payload).then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(setStatus(statuses.SUCCESS));
            dispatch(setIsAuth(true));
            // dispatch(me());
        } else {
            dispatch(setStatus(statuses.ERROR));
            dispatch(setMessage(res.data.messages[0]));
        }
    })
}