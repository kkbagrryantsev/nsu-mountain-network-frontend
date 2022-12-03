import { useState } from "react";
import "./SignUp.css";

function SignUp() {
  const [data, setData] = useState({
    names: "",
    email: "",
    phone: "",
    login: "",
    password: "",
    repeatPassword: "",
  });

  function handleInputChange(e, name) {
    setData({ ...data, [name]: e.target.value });
  }

  return (
    <div className="signUpContainer">
      <h1>Регистрация</h1>
      <form>
        <label>
          Фамилия, имя, отчество:
          <input
            type="text"
            value={data.names}
            onChange={(e) => handleInputChange(e, "names")}
          />
        </label>
        <label>
          Электронная почта:
          <input
            type="text"
            value={data.email}
            onChange={(e) => handleInputChange(e, "email")}
          />
        </label>
        <label>
          Номер телефона:
          <input
            type="text"
            value={data.phone}
            onChange={(e) => handleInputChange(e, "phone")}
          />
        </label>
        <label>
          Логин:
          <input
            type="text"
            value={data.login}
            onChange={(e) => handleInputChange(e, "login")}
          />
        </label>
        <label>
          Пароль:
          <input
            type="password"
            value={data.password}
            onChange={(e) => handleInputChange(e, "password")}
          />
        </label>
        <label>
          Повторите пароль:
          <input
            type="password"
            value={data.repeatPassword}
            onChange={(e) => handleInputChange(e, "repeatPassword")}
          />
        </label>
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}

export default SignUp;
