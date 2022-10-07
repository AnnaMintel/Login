import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { login, statuses } from "../../redux-bll/loginReducer";
import s from "../../ui/login/Login.module.css";
import "../../App.css";
import EmailIcon from "@mui/icons-material/Email";
import LockOpenIcon from "@mui/icons-material/LockOpen";

export const Login = ({ message }) => {
  const dispatch = useDispatch();
  let status = useSelector((state) => state.login.status);
  let isAuth = useSelector((state) => state.auth.isAuth);

  const initialData = {
    email: "",
    password: "",
    rememberMe: false,
  };
  const [data, setData] = useState(initialData);

  const onLoginClick = () =>{
    dispatch(login(data));
    setData(initialData);
  }

  let errorMessageBlock = status === statuses.ERROR && (
    <div className="error">{message}</div>
  );

  if (isAuth) {
    return <Navigate to={"/main"} />;
  }

  return (
    <form className={s.loginBlock}>
      <h1>Login</h1>
      <div>
        <div className={s.userEmail}>
          <input
            type="text"
            placeholder="Enter Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.currentTarget.value })}
          />
          <EmailIcon className={s.icon1} />
        </div>

        <div className={s.userPassword}>
          <input
            type="password"
            placeholder="Enter Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.currentTarget.value })}
          />
          <LockOpenIcon className={s.icon2} />
        </div>
      </div>

      <div>
        <button
          className={s.button}
          type="submit"
          disabled={status === statuses.INPROGRESS}
          onClick={onLoginClick}
        >
          LOGIN
        </button>
      </div>
      {errorMessageBlock}
    </form>
  );
};

