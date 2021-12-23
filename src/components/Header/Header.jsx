import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

const Header = () => {
  return (
    <header className={s["header-section"]}>
      <nav className={s.navigation}>
        <NavLink exact to="/" className={s.link} activeClassName={s.active}>
          Home
        </NavLink>

        <NavLink to="/movies" className={s.link} activeClassName={s.active}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
