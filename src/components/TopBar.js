import { NavLink } from "react-router-dom";
import styles from "./TopBar.module.css";
import logo from "../resources/logo.png";

const TopBar = ({ loggedIn, setModalSignUp, setModalSignIn }) => {
  return (
    <header>
      <div className={styles.topBarWrapper}>
        <div className={styles.logoWrapper}>
          <img className={styles.logo} src={logo} alt="logo.svg" />
        </div>
        <div className={styles.pages}>
          <NavLink className={styles.singleLink} to="." end>
            Главная
          </NavLink>
          <NavLink className={styles.singleLink} to="expeditions">
            Походы
          </NavLink>
          <NavLink className={styles.singleLink} to="equipment">
            Снаряжение
          </NavLink>
        </div>
        {loggedIn ? (
          <div className={styles.login}>
            <button onClick={() => setModalSignIn(true)}>Войти</button>
            <button onClick={() => setModalSignUp(true)}>
              Зарегистрироваться
            </button>
          </div>
        ) : (
          <div className={styles.login}>
            <button>Моя страница</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopBar;
