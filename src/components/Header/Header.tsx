import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";
import { AuthContext } from "../../App";
import { ROL } from "../../models/User";

const Header = (): JSX.Element => {
  const authInfo = React.useContext(AuthContext);
  return (
    <header className="header">
      <div className="header__home">
        <NavLink className="header__link" to="/">
          Home
        </NavLink>
      </div>

      {
        authInfo?.userInfo && (authInfo?.userInfo?.rol === ROL.TEACHER || authInfo?.userInfo?.rol === ROL.ADMIN) &&
        <>
          <NavLink className="header__link" to="/classroom">
            Classroom
          </NavLink>
          <NavLink className="header__link" to="/subject">
            Subject
          </NavLink>
          <NavLink className="header__link" to="/user">
            User
          </NavLink>
        </>
      }

      <div className="header__user-info">
        {authInfo?.userInfo ? (
          <>
            <span className="header__name">
              Hola {authInfo.userInfo.firstName}
            </span>
            <span className="header__logout" onClick={authInfo.logOut}>
              Salir
            </span>
          </>
        ) : (
          <NavLink className="header__link" to="/login">
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
