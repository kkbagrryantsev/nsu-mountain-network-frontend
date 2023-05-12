import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const cartAdapter = createEntityAdapter({
  selectId: (item) => item.item_id,
});

const initialState = {
  cart: cartAdapter.getInitialState(),
};

export const cartPageSlice = createSlice({
  name: "CartPage",
  initialState,
  reducers: {
    changeCartItemQuantity(state, action) {
      cartAdapter.upsertOne(state.cart, action.payload);
    },
    removeFromCart(state, action) {
      cartAdapter.removeOne(state.cart, action.payload);
    },
    clearCart(state) {
      cartAdapter.removeAll(state.cart);
    },
  },
});

export const { changeCartItemQuantity, removeFromCart, clearCart } =
  cartPageSlice.actions;

export const cartSelectors = cartAdapter.getSelectors(
  (state) => state.cartPage.cart
);
