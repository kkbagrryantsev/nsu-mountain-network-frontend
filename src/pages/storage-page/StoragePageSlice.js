import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import LoadingState from "../../enums/LoadingState";

const itemsAdapter = createEntityAdapter({
  selectId: (item) => item.item_id,
});

const initialState = {
  items: itemsAdapter.getInitialState({
    loading: LoadingState.LOADING,
  }),
};

export const storagePageSlice = createSlice({
  name: "StoragePage",
  initialState,
  reducers: {
    setAllItems(state, action) {
      itemsAdapter.setAll(state.items, action.payload.data);
      state.items.loading = action.payload.status;
    },
  },
});

export const { setAllItems } = storagePageSlice.actions;

export const itemSelectors = itemsAdapter.getSelectors(
  (state) => state.storagePage.items
);
