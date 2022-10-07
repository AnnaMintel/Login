import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import { logOut, me } from "../../redux-bll/authReducer";
import "../../App.css";
import s from "../../ui/header/Main.module.css";

export const Main = () => {
  let isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  const onLogOutClick = () => dispatch(logOut());

  if (!isAuth) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className={s.mainBlock}>
      <h1>Welcome!</h1>
      <button onClick={onLogOutClick}>
        <NavLink className={s.navLink} to="/">
          Log Out
        </NavLink>
      </button>
    </div>
  );
};
