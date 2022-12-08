import {useState} from "react";
import {signUp} from "../api/Queries";
import {CiCircleCheck} from "react-icons/ci";
import "./SignUp.css";
import Formsy from "formsy-react";
import Input from "./Input";

function SignUp() {
    const [signedUp, setSignedUp] = useState(false)
    const [active, setActive] = useState(false)
    const handleSignUpSubmit = async (e) => {
        console.log(e.login)
        const status = await signUp({name: e.text, email: e.email, phone: e.phone, login: e.login, password: e.password});
        if (status === 200) {
            setSignedUp(true)
        }
    };

    return !signedUp ? (<div className="signUpContainer">
        <h1>Регистрация</h1>
        <Formsy
            onValidSubmit={handleSignUpSubmit}
            onValid={() => setActive(true)}
            onInvalid={() => setActive(false)}
        >
                <Input title="Фамилия, имя, отчество" name="text" />
                <Input title="Электронная почта" name="email" validations="isEmail" validationError="Некорректный почтовый адрес" />
                <Input title="Номер телефона" name="phone" validationError="Некорректный номер телефона" />
                <Input title="Логин" name="login" validations="isAlpha" validationError="Некорректный логин" />
                <Input title="Пароль" name="password" />
            <button type="submit" disabled={!active}>Отправить</button>
        </Formsy>
    </div>) : (<div className="signUpContainer success">
        <CiCircleCheck color="green" size={70} />
        <h2>На вашу почту отправлено письмо для подтверждения заявки</h2>
    </div>);
}

export default SignUp;
