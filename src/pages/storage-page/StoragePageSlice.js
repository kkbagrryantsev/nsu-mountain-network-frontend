import { createSlice } from "@reduxjs/toolkit";
import { StateWithLoader } from "../../utils/StoreUtils";
import LoadingState from "../../enums/LoadingState";

const initialState = {
  items: new StateWithLoader([], LoadingState.LOADING),
  cart: [],
};

export const storagePageSlice = createSlice({
  name: "HomePage",
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
    addToCart: (state, action) => {
      if (state.cart.some((i) => i.item_id === action.payload.item_id)) {
        state.cart.forEach((i) => {
          if (i.item_id === action.payload.item_id) {
            i.item_quantity_current = i.item_quantity_current + 1;
          }
        });
      } else {
        state.cart.push({ ...action.payload, item_quantity_current: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const item = state.cart.find((i) => i.item_id === action.payload.item_id);
      if (item) {
        if (item.item_quantity_current === 1) {
          state.cart = state.cart.filter(
            (i) => i.item_id !== action.payload.item_id
          );
        } else {
          state.cart.forEach((i) => {
            if (i.item_id === action.payload.item_id) {
              i.item_quantity_current = i.item_quantity_current - 1;
            }
          });
        }
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  updateItems,
  setIsLoadingItems,
  setErrorLoadingItems,
  addToCart,
  removeFromCart,
  clearCart,
} = storagePageSlice.actions;
