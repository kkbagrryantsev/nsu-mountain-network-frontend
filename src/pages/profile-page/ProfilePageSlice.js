import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const profilePageSlice = createSlice({
  name: "ProfilePage",
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { updateUserData } = profilePageSlice.actions;
