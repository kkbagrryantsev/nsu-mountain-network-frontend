import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import LoadingState from "enums/LoadingState";

const categoryAdapter = createEntityAdapter({
  selectId: (item) => item.category_id,
});

const initialState = categoryAdapter.getInitialState({
  loading: LoadingState.LOADING,
});

export const categoriesSlice = createSlice({
  name: "Categories",
  initialState,
  reducers: {
    setLoadingStatus: (state, action) => {
      state.loading = action.payload;
    },
    setAllCategories: categoryAdapter.setAll,
    updateCategory: categoryAdapter.updateOne,
    removeCategory: categoryAdapter.removeOne,
  },
});

export const categoriesSelectors = categoryAdapter.getSelectors(
  (state) => state.categories
);

export const {
  setLoadingStatus,
  setAllCategories,
  updateCategory,
  removeCategory,
} = categoriesSlice.actions;
