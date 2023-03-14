import {
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { authorizeUser } from "../HomePageActions";

function LoginModal({ isActive, setIsActive }) {
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    login: "",
    password: "",
  });

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  return (
    <MDBModal show={isActive} setShow={setIsActive} tabIndex="-1">
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Войти</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={() => setIsActive(!isActive)}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody
            className={"d-flex flex-column align-items-center gap-2"}
          >
            <MDBValidation
              className={"d-flex flex-column align-items-center gap-1"}
              onSubmit={() => {
                setIsActive();
                dispatch(authorizeUser(formValue || null));
              }}
              isValidated
            >
              <MDBValidationItem feedback invalid>
                <MDBInput
                  value={formValue.login}
                  name="login"
                  onChange={onChange}
                  id="loginInput"
                  required
                  label="Логин"
                />
              </MDBValidationItem>
              <MDBValidationItem feedback invalid>
                <MDBInput
                  value={formValue.password}
                  name="password"
                  type="password"
                  onChange={onChange}
                  id="passwordInput"
                  required
                  label="Пароль"
                />
              </MDBValidationItem>
              <MDBBtn type="submit">Войти</MDBBtn>
            </MDBValidation>
            <MDBBtn color={"tertiary"}>Восстановить пароль</MDBBtn>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}

export default LoginModal;
