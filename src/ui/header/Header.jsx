import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import { logOut, me } from "../../redux-bll/AuthReducer";
import '../../App.css';

export const Header = ({}) => {
  let isAuth = useSelector((state) => state.auth.isAuth);
  let userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();

  const onLogOutClick = () =>  dispatch(logOut());

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

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.props.me();
  }

  render() {
    return <Header {...this.props} />;
  }
}

let mapStateToProps = (s) => ({
  userInfo: s.auth.userInfo,
  isAuth: s.auth.isAuth,
});

let mapDispatchToProps = (dispatch) => ({
  me: () => {
    dispatch(me());
  },
  logOut: () => {
    dispatch(logOut());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
