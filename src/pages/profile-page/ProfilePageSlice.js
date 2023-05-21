import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { StateWithLoader } from "../../utils/StoreUtils";
import LoadingState from "../../enums/LoadingState";

const myItemsAdapter = createEntityAdapter({
  selectId: (item) => item.item_id,
});

// TODO make normalized states
const initialState = {
  items: {
    booked: [],
    requested: [],
    rejected: [],
    taken: [],
  },
  user: new StateWithLoader({}, LoadingState.LOADING),
  myItems: {
    requested: myItemsAdapter.getInitialState(),
    booked: myItemsAdapter.getInitialState(),
    taken: myItemsAdapter.getInitialState(),
  },
};

export const profilePageSlice = createSlice({
  name: "ProfilePage",
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      state.user = new StateWithLoader(action.payload, LoadingState.LOADED);
    },
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
    updateItemsByType: (state, action) => {
      state.items[action.payload.type] = action.payload.data;
    },
  },
});

export const myBookedItemsSelectors = myItemsAdapter.getSelectors(
  (state) => state.profilePage.myItems.booked
);
export const myRequestedItemsSelectors = myItemsAdapter.getSelectors(
  (state) => state.profilePage.myItems.requested
);
export const myTakenItemsSelectors = myItemsAdapter.getSelectors(
  (state) => state.profilePage.myItems.taken
);

export const {
  updateUserData,
  updateItemsByType,
  updateMyItemsByType,
  removeMyItemsByTypeById,
} = profilePageSlice.actions;
