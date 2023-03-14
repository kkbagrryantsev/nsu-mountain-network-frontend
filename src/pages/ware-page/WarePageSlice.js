import { createSlice } from "@reduxjs/toolkit";
import {
  getStateFromSessionStorage,
  getStateWithLoader,
  StateWithLoader,
} from "../../utils/WareUtils";
import LoadingState from "../../enums/LoadingState";

const initialState = {
  items: getStateWithLoader([]),
  selectedItems: getStateFromSessionStorage("selectedItems", []),
  filters: { sort: undefined, filter: {} },
};

const warePageSlice = createSlice({
  name: "WarePage",
  initialState,
  reducers: {
    updateItems: (state, action) => {
      state.items = new StateWithLoader(action.payload, LoadingState.LOADED);
    },
    setIsLoadingItems: (state) => {
      state.items = new StateWithLoader([], LoadingState.LOADING);
    },
    setErrorLoadingItems: (state) => {
      state.items = new StateWithLoader([], LoadingState.ERROR);
    },
    setSortKey: (state, action) => {
      state.filters.sort = action.payload;
    },
    // Accepts a structure of a filter key and a filter value
    setFilterKey: (state, action) => {
      state.filters.filter[action.payload.key] = action.payload.value;
    },
  },
});

export const {
  updateItems,
  setIsLoadingItems,
  setErrorLoadingItems,
  setSortKey,
  setFilterKey,
} = warePageSlice.actions;

export default warePageSlice.reducer;
