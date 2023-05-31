import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import LoadingState from "enums/LoadingState";

const itemsAdapter = createEntityAdapter({
  selectId: (item) => item.use_id,
});

const initialState = {
  items: {
    booked: itemsAdapter.getInitialState({ loading: LoadingState.LOADING }),
    requested: itemsAdapter.getInitialState({
      loading: LoadingState.LOADING,
    }),
    taken: itemsAdapter.getInitialState({ loading: LoadingState.LOADING }),
  },
};

export const requestsManagementTabSlice = createSlice({
  name: "RequestsManagementTab",
  initialState,
  reducers: {
    updateRequests: (state, action) => {
      itemsAdapter.setAll(
        state.items[action.payload.type],
        action.payload.data
      );
      state.items[action.payload.type].loading = LoadingState.LOADED;
    },
    removeRequests: (state, action) => {
      itemsAdapter.removeMany(
        state.items[action.payload.type],
        action.payload.data
      );
    },
    removeRequest: (state, action) => {
      itemsAdapter.removeOne(
        state.items[action.payload.type],
        action.payload.data
      );
    },
    updateRequest: (state, action) => {
      itemsAdapter.updateOne(
        state.items[action.payload.type],
        action.payload.data
      );
    },
  },
});

export const bookedRequestsSelectors = itemsAdapter.getSelectors(
  (state) => state.requestsTab.items.booked
);
export const requestedRequestsSelectors = itemsAdapter.getSelectors(
  (state) => state.requestsTab.items.requested
);
export const takenRequestsSelectors = itemsAdapter.getSelectors(
  (state) => state.requestsTab.items.taken
);

export const { updateRequests, updateRequest, removeRequests, removeRequest } =
  requestsManagementTabSlice.actions;
