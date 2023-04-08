import { createAction } from "@reduxjs/toolkit";

export const updateData = createAction("user/updateData");
export const returnItem = createAction("user/returnItem", function (data) {
  return {
    payload: {
      use_ids: [data],
    },
  };
});
export const getItemData = createAction("items/getItem");
