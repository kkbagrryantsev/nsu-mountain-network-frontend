import { useState } from "react";
import "./SignIn.css";

async function loginUser(credentials) {
  return fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

function SignIn({ setToken, setActive }) {
  const [data, setData] = useState({
    login: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username: data.login,
      password: data.password,
    });
    setToken(token);
    console.log(token);
    setActive(false);
  };

  function handleInputChange(e, name) {
    setData({ ...data, [name]: e.target.value });
  }

  return (
    <div className="signInContainer">
      <h1>Вход</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default SignIn;
