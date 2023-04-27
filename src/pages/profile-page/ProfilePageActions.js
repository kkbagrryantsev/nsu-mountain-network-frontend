import { createAction } from "@reduxjs/toolkit";

export const getMyProfileAction = createAction("auth/my_profile");
export const bookItemsAction = createAction("models/items/book");
export const unbookItemsAction = createAction("models/items/use/unbook");

//export const getItemsInUseHistoryAction = createAction("models/item_in_use");

export const getItemsInUseHistoryAction = createAction(
  "models/item_in_use/type",
  function (data) {
    return {
      payload: {
        type: data,
      },
    };
  }
); 
export const getItemDataAction = createAction("models/items/id");
