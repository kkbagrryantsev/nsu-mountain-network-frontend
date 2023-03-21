import React from "react";
import { useSelector } from "react-redux";

import TestModal from "./TestModal";

const modalComponentLookupTable = {
  TestModal,
};

export function ModalManager() {
  const currentModal = useSelector((state) => state.modalsProvider.modal);

  let renderedModal;

  if (currentModal) {
    const { modalType, modalProps = {} } = currentModal;
    const ModalComponent = modalComponentLookupTable[modalType];

    renderedModal = <ModalComponent {...modalProps} />;
  }

  return <span>{renderedModal}</span>;
}

export default ModalManager;
