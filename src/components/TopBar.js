import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {CiUser} from "react-icons/ci";
import Modal from "./Modal";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {activatePopUp} from "../slices/modalsSlice";
import "./TopBar.css";
import logo from "../resources/logo.png";
import {updateToken} from "../slices/tokenSlice";

function AuthButtons() {
    const dispatch = useDispatch()
    return <div className="authButtons__wrapper">
        <button onClick={() => dispatch(activatePopUp('signIn'))}>
            Войти
        </button>
        <button onClick={() => dispatch(activatePopUp('signUp'))}>
            Зарегистрироваться
        </button>
    </div>
}

function Profile() {
    const dispatch = useDispatch()
    return (<div className="profile__wrapper">
        <button
            onClick={() => dispatch(updateToken({"access_token": ''}))}
            style={{padding: "5px 7px", background: "transparent", border: "2px #467474 solid"}}>
            {<CiUser size={"20px"} color={"#467474"}/>}
        </button>
    </div>)
}

function Sections() {
    const isSignedIn = useSelector((state) => state.token.value)
    if (isSignedIn) {
        return (<div className="sections__wrapper">
            <NavLink to="." end>
                Главная
            </NavLink>
            <NavLink to="expeditions">
                Походы
            </NavLink>
            <NavLink to="equipment">
                Снаряжение
            </NavLink>
        </div>)
    } else {
        return <div className="sections__wrapper"></div>
    }
}

function TopBar() {
    const isSignedIn = useSelector((state) => state.token.value)
    return (<header>
        <Modal name='signIn'>
            <SignIn/>
        </Modal>
        <Modal name='signUp'>
            <SignUp/>
        </Modal>

        <div className="topBar__wrapper">
            <img style={{maxHeight: "100%"}} src={logo} alt="Error"/>
            <Sections/>
            {isSignedIn ? <Profile/> : <AuthButtons/>}
        </div>
    </header>)
}

export default TopBar;
