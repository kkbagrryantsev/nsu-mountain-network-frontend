import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: null,
};

export const modalsSlice = createSlice({
  name: "ModalsProvider",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.modal = action.payload;
    },
    hideModal: (state) => {
      state.modal = null;
    },
    toggleModal: (state, action) => {
      state.modal = !!state.modal ? null : action.payload;
    },
  },
});

export const { showModal, hideModal, toggleModal } = modalsSlice.actions;
