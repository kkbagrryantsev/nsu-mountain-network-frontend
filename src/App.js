import { BrowserRouter, Routes, Route } from "react-router-dom";
import Default from "./layouts/Default";
import NotFound from "./components/NotFound";
import "./App.css";
import Modal from "./components/Modal";
import { useState } from "react";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import useToken from "./components/useToken";

function App() {
  const { token, setToken } = useToken();
  const [modalSignUp, setModalSignUp] = useState(false);
  const [modalSignIn, setModalSignIn] = useState(false);
  return (
    <BrowserRouter>
      <Modal active={modalSignUp} setActive={setModalSignUp}>
        <SignUp />
      </Modal>
      <Modal active={modalSignIn} setActive={setModalSignIn}>
        <SignIn setToken={setToken} setActive={setModalSignIn} />
      </Modal>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              !token ? (
                <Default
                  loggedIn
                  setModalSignUp={setModalSignUp}
                  setModalSignIn={setModalSignIn}
                />
              ) : (
                <Default
                  setModalSignUp={setModalSignUp}
                  setModalSignIn={setModalSignIn}
                />
              )
            }
          >
            <Route index element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
