import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login, statuses } from '../../redux-bll/LoginReducer';

export const Login = ({ message }) => {

    const dispatch = useDispatch();
    let status = useSelector(state => state.login.status);
    let isAuth = useSelector(state => state.auth.isAuth)

    if(isAuth) {
        return <Navigate to={'/'} />
    }

    let loginRef = React.createRef();
    let passwordRef = React.createRef();
    let rememberMeRef = React.createRef();

    const onLoginClick = () => dispatch( login(loginRef.current.value, passwordRef.current.value,
        rememberMeRef.current.checked))

    let errorMessageBlock = status === statuses.ERROR && <div className='error'>{message}</div>

    return <div>
        <div><input ref={loginRef} type='text' defaultValue='annikamintel99@yandex.ru' /></div>
        <div><input ref={passwordRef} type='password' defaultValue='123456789' /></div>
        <div><input ref={rememberMeRef} type='checkbox' /></div>
        <div><button disabled={status === statuses.INPROGRESS} onClick={onLoginClick}>LOGIN</button></div>
        {errorMessageBlock}
    </div>
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    status: state.login.status,
    message: state.login.message,
    captchaUrl: state.login.captchaUrl
})

let mapDispatchToProps = (dispatch) => ({
    login: (login, pass, rm) => {
        dispatch(login(login, pass, rm))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);