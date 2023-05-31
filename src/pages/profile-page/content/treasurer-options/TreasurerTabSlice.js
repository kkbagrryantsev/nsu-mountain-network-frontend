import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import LoadingState from "../../../../enums/LoadingState";

const usersAdapter = createEntityAdapter({
  selectId: (user) => user.user.user_id,
});

const initialState = {
  users: usersAdapter.getInitialState({
    loading: LoadingState.LOADING,
  }),
};

export const treasurerTabSlice = createSlice({
  name: "TreasurerTab",
  initialState,
  reducers: {
    setAllUsers(state, action) {
      usersAdapter.setAll(state.users, action.payload.data);
      state.users.loading = action.payload.status;
    },
  },
});

export const { setAllUsers } = treasurerTabSlice.actions;

export const userSelectors = usersAdapter.getSelectors(
  (state) => state.treasurerTab.users
);
