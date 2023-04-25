import { createSlice } from "@reduxjs/toolkit";
import { StateWithLoader } from "../../utils/StoreUtils";
import LoadingState from "../../enums/LoadingState";

const initialState = {
  items_in_use: new StateWithLoader([], LoadingState.LOADING),
  //items_in_use: {}
};

export const requestsPageSlice = createSlice({
  name: "requestsPage",
  initialState,
  reducers: {
    updateItems: (state, action) => {
      state.items_in_use = new StateWithLoader(action.payload, LoadingState.LOADED);
      //state.items_in_use = action;
    },
  },
});

export const {
  updateItems,
} = requestsPageSlice.actions;
