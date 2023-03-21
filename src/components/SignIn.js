import {useState} from "react";
import "./SignIn.css";
import {useDispatch} from "react-redux";
import {updateToken} from "../slices/tokenSlice";
import {signIn} from "../api/Queries";
import {disablePopUp} from "../slices/modalsSlice";

function SignIn() {
    const dispatch = useDispatch()
    const [credentials, setCredentials] = useState({
        login: "", password: "",
    });

    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        const token = await signIn({...credentials});
        dispatch(updateToken(token))
        setCredentials({login: '', password: ''})
        dispatch(disablePopUp('signIn'))
    };

    function handleInputChange(e, name) {
        setCredentials({...credentials, [name]: e.target.value});
    }

    return (<div className="signInContainer">
        <h1>Вход</h1>
        <form onSubmit={handleSignInSubmit}>
            <label>
                Логин:
                <input
                    type="text"
                    value={credentials.login}
                    onChange={(e) => handleInputChange(e, "login")}
                />
            </label>
            <label>
                Пароль:
                <input
                    type="password"
                    value={credentials.password}
                    onChange={(e) => handleInputChange(e, "password")}
                />
            </label>
            <button type="submit">Войти</button>
        </form>
    </div>);
}

export default SignIn;
