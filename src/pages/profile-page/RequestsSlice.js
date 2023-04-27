import { createSlice } from "@reduxjs/toolkit";
import { StateWithLoader } from "../../utils/StoreUtils";
import LoadingState from "../../enums/LoadingState";

const initialState = {
  items_in_use: new StateWithLoader([], LoadingState.LOADING),
};

export const requestsPageSlice = createSlice({
  name: "RequestsPage",
  initialState,
  reducers: {
    updateItems: (state, action) => {
        state.items_in_use = new StateWithLoader(action.payload, LoadingState.LOADED);
    },
  },
});

export const {
  updateItems,
} = requestsPageSlice.actions;