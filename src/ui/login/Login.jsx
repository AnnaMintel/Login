import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { login, statuses } from "../../redux-bll/LoginReducer";
import s from "../../ui/login/Login.module.css";
import '../../App.css';
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';

export const Login = ({ message }) => {
  const dispatch = useDispatch();
  let status = useSelector((state) => state.login.status);
  let isAuth = useSelector((state) => state.auth.isAuth);

  if (isAuth) {
    return <Navigate to={"/"} />;
  }

  let loginRef = React.createRef();
  let passwordRef = React.createRef();
  let rememberMeRef = React.createRef();

  const onLoginClick = () =>
    dispatch(
      login(
        loginRef.current.value,
        passwordRef.current.value,
        rememberMeRef.current.checked
      )
    );

  let errorMessageBlock = status === statuses.ERROR && (
    <div className="error">{message}</div>
  );

  return (
    <div className={s.loginBlock}>
      <form>
        <h1>Login</h1>
        <div>
          <div className={s.userEmail}>
            <input
              ref={loginRef}
              type="text"
              placeholder="Enter Email"
            />
            <EmailIcon className={s.icon1} />
          </div>

          <div className={s.userPassword}>
            <input ref={passwordRef} 
            type="password" 
            placeholder="Enter Password"
             />
            <LockOpenIcon className={s.icon2}  />
          </div>
        </div>
        {/* <div>
          <input ref={rememberMeRef} type="checkbox" />
        </div> */}
        <div>
          <button className={s.button}
            type="submit"
            disabled={status === statuses.INPROGRESS}
            onClick={onLoginClick}>LOGIN</button>
        </div>
        {errorMessageBlock}
      </form>
    </div>
  );
};

let mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  status: state.login.status,
  message: state.login.message,
  captchaUrl: state.login.captchaUrl,
});

let mapDispatchToProps = (dispatch) => ({
  login: (login, pass, rm) => {
    dispatch(login(login, pass, rm));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
