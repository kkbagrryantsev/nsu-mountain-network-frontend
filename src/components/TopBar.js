import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {activatePopUp} from "../slices/modalsSlice";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Modal from "./Modal";
import styles from "./TopBar.module.css";
import logo from "../resources/logo.png";
import {CiUser} from "react-icons/ci";

function TopBar() {
    const isSignedIn = !useSelector((state) => state.token.value)
    const dispatch = useDispatch()
    return (<header>
        <Modal name='signIn'>
            <SignIn/>
        </Modal>
        <Modal name='signUp'>
            <SignUp/>
        </Modal>
        <div className={styles.topBarWrapper}>
            <div className={styles.logoWrapper}>
                <img className={styles.logo} src={logo} alt="logo.svg"/>
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
            {isSignedIn ? (<div className={styles.login}>
                <button onClick={() => dispatch(activatePopUp('signIn'))}>Войти</button>
                <button onClick={() => dispatch(activatePopUp('signUp'))}>
                    Зарегистрироваться
                </button>
            </div>) : (<div className={styles.login}>
                <button style={{padding: "5px 7px", background: "transparent", border: "2px #467474 solid"}}>{<CiUser size={"20px"} color={"#467474"}/>}</button>
            </div>)}
        </div>
    </header>);
}

export default TopBar;
