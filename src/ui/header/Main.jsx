import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import { logOut, me } from "../../redux-bll/authReducer";
import '../../App.css';

export const Main = () => {
  let isAuth = useSelector((state) => state.auth.isAuth);
  let userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();

  const onLogOutClick = () =>  dispatch(logOut());

  if (!isAuth) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      {isAuth && (
        <div>
          {userInfo.userName} - <span onClick={onLogOutClick}><NavLink to="login">Log Out</NavLink></span>
        </div>
      )}
      {!isAuth && (
        <div>
          <NavLink to="login">Sign In</NavLink>
        </div>
      )}
    </div>
  );
};

