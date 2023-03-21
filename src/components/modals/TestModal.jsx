import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { showModal, hideModal } from "./ModalProviderSlice";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-react-ui-kit";

export function TestModal() {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.modalsProvider.modal);

  return (
    <MDBModal show={show} setShow={showModal("TestModal")} tabIndex="-1">
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Modal title</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={() => dispatch(hideModal())}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>...</MDBModalBody>

          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={() => dispatch(hideModal())}>
              Close
            </MDBBtn>
            <MDBBtn>Save changes</MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}

export default TestModal;
