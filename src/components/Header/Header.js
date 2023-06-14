import { NavLink } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <NavLink className="header__link" to="/">
        Home
      </NavLink>
      <NavLink className="header__link" to="/classroom">
        Classroom
      </NavLink>
      <NavLink className="header__link" to="/subject">
        Subject
      </NavLink>
      <NavLink className="header__link" to="/user">
        User
      </NavLink>
      <NavLink className="header__link" to="/login">
        Login
      </NavLink>
    </header>
  );
};

export default Header;
