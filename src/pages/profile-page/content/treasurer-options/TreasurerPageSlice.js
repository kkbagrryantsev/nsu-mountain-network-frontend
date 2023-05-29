import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import LoadingState from "../../../../enums/LoadingState";

const usersAdapter = createEntityAdapter({
  selectId: (user) => user.user.user_id
});
 
const initialState = {
  users: usersAdapter.getInitialState({
    loading: LoadingState.LOADING,
  }),
};

export const treasurerPageSlice = createSlice({
  name: "TreasurerPage",
  initialState,
  reducers: {
    setAllUsers(state, action) {
      usersAdapter.setAll(state.users, action.payload.data);
      state.users.loading = action.payload.status;
    },
  },
});

export const { setAllUsers } = treasurerPageSlice.actions;

export const userSelectors = usersAdapter.getSelectors(
  (state) => state.treasurerPage.users
);
