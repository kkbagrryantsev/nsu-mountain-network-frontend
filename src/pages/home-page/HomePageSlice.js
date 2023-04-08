import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ignore: true,
};

export const homePageSlice = createSlice({
  name: "HomePage",
  initialState,
  reducers: {
    updateIgnore: (state, action) => {
      state.ignore = action.payload;
    },
  },
});

export const { updateIgnore } = homePageSlice.actions;
