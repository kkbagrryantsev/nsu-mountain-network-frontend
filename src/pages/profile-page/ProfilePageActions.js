import { createAction } from "@reduxjs/toolkit";

export const getMyProfileAction = createAction("auth/my_profile");
export const unbookItemsAction = createAction("models/items/use/unbook");
export const getItemsInUseHistoryAction = createAction(
  "models/item_in_use/type"
);
export const getMyItemsInUseHistoryAction = createAction(
  "models/my_item_in_use/type"
);
