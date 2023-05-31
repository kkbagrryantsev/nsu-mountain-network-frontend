import { createSlice } from "@reduxjs/toolkit";
import { StateWithLoader } from "../../utils/StoreUtils";
import LoadingState from "enums/LoadingState";

const initialState = {
  user: new StateWithLoader({}, LoadingState.LOADING),
};

export const profilePageSlice = createSlice({
  name: "ProfilePage",
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      state.user = new StateWithLoader(action.payload, LoadingState.LOADED);
    },
  },
});

export const { updateUserData } = profilePageSlice.actions;
