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
import { modifyUserBalanceAction } from "../TreasurerPageActions";

function ChangeBalanceDialog(props) {
  const { isActive, setIsActive, currentUserName, currentUserLogin } = props;
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    newBalance: ""
  });

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  return (
    <MDBModal show={isActive} setShow={setIsActive} tabIndex="-1">
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Обновить баланс пользователя {currentUserName}</MDBModalTitle>
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
                var money = parseInt(formValue.newBalance, 10);
                dispatch(modifyUserBalanceAction({user:{user_login: currentUserLogin, money}}));
                props.setBalance(formValue.newBalance);
              }}
              isValidated
            >
              <MDBValidationItem feedback invalid>
                <MDBInput
                  value={formValue.newBalance}
                  name="newBalance"
                  onChange={onChange}
                  id="newBalanceInput"
                  required
                  label="Новое значение"
                />
              </MDBValidationItem>
              
              <MDBBtn type="submit">Сохранить</MDBBtn>
            </MDBValidation>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}

export default ChangeBalanceDialog;
