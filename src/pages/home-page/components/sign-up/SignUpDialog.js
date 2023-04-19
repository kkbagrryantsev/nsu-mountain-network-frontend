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
import { signUpAction } from "../../HomePageActions";

function SignUpDialog({ isActive, setIsActive }) {
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    phone: "",
    login: "",
    password: "",
  });

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    dispatch(
      signUpAction(
        {
          ...formValue,
        } || null
      )
    );
  };

  return (
    <MDBModal show={isActive} setShow={setIsActive} tabIndex="-1">
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Регистрация</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={() => setIsActive(!isActive)}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <MDBValidation
              isValidated
              className={"d-flex flex-column align-items-center gap-1"}
              onSubmit={onSubmit}
            >
              <MDBValidationItem feedback invalid>
                <MDBInput
                  value={formValue.name}
                  name="name"
                  onChange={onChange}
                  required
                  label="Имя"
                />
              </MDBValidationItem>
              <MDBValidationItem feedback invalid>
                <MDBInput
                  value={formValue.email}
                  name="email"
                  type="email"
                  onChange={onChange}
                  required
                  label="Почта"
                />
              </MDBValidationItem>
              <MDBValidationItem feedback invalid>
                <MDBInput
                  value={formValue.phone}
                  name="phone"
                  type="number"
                  onChange={onChange}
                  required
                  label="Номер телефона"
                />
              </MDBValidationItem>
              <MDBValidationItem feedback invalid>
                <MDBInput
                  value={formValue.login}
                  name="login"
                  onChange={onChange}
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
                  required
                  label="Пароль"
                />
              </MDBValidationItem>
              <MDBBtn type="submit" color={"primary"}>
                Зарегистрироваться
              </MDBBtn>
            </MDBValidation>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}

export default SignUpDialog;
