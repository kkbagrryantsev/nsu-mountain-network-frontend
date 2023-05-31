import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const myItemsAdapter = createEntityAdapter({
  selectId: (item) => item.item_id,
});

const initialState = {
  myItems: {
    requested: myItemsAdapter.getInitialState(),
    booked: myItemsAdapter.getInitialState(),
    taken: myItemsAdapter.getInitialState(),
  },
};

export const itemsManagementTabSlice = createSlice({
  name: "ItemsManagementTab",
  initialState,
  reducers: {
    updateMyItemsByType: (state, action) => {
      myItemsAdapter.setAll(
        state.myItems[action.payload.type],
        action.payload.data
      );
    },
    removeMyItemsByTypeById: (state, action) => {
      myItemsAdapter.removeMany(
        state.myItems[action.payload.type],
        action.payload.data
      );
    },
  },
});

export const myBookedItemsSelectors = myItemsAdapter.getSelectors(
  (state) => state.itemsTab.myItems.booked
);
export const myRequestedItemsSelectors = myItemsAdapter.getSelectors(
  (state) => state.itemsTab.myItems.requested
);
export const myTakenItemsSelectors = myItemsAdapter.getSelectors(
  (state) => state.itemsTab.myItems.taken
);

export const { updateMyItemsByType, removeMyItemsByTypeById } =
  itemsManagementTabSlice.actions;
