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

function ChangeBalanceDialog({ isActive, setIsActive, currentUserName, currentUserID }) {
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    newBalance: ""
  });

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const auser = {
    uid: currentUserID,
    ubal: formValue
  }

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
                //dispatch(modifyUserBalanceAction(formValue || null, currentUserID));
                dispatch(modifyUserBalanceAction(auser));
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