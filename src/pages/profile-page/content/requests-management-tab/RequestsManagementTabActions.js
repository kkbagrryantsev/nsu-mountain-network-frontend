import { createAction } from "@reduxjs/toolkit";

export const getItemsInUseByTypeAction = createAction("models/item_in_use");
export const approveBookRequestsAction = createAction(
  "models/items/use/approve"
);
export const rejectBookRequestsAction = createAction("models/items/use/reject");
export const giveBookedItemsAction = createAction("models/items/use/give");
export const commentBookingRequestAction = createAction(
  "models/items/use/comment"
);
export const patchBookRequestAction = createAction("models/items/use/patch");
export const returnBookedItemsAction = createAction("models/item/use/return");
export const fulfillBookRequestAction = createAction("models/item/use/give");
