import { call, takeEvery, put } from "redux-saga/effects";
import { execApiCall } from "../../utils/ApiUtils";
import { apiBookItems } from "../../api/ApiCalls";
import { bookItems } from "./CartPageActions";
import { createErrorToast, createSuccessToast } from "../../models/ToastModel";
import { clearCart } from "../storage-page/StoragePageSlice";
import { store } from "../../store/PersistedStore";

export function* cartPageSagaWatcher() {
  yield takeEvery(bookItems, sagaBookItems);
}

function* sagaBookItems() {
  const items = store.getState().storagePage.cart;
  const proper_items = items.map((item) => {
    return { item_id: item.item_id, quantity: item.item_quantity_current };
  });
  const payload = { payload: { items: proper_items } };
  console.log(payload.payload);
  yield call(execApiCall, {
    mainCall: () => apiBookItems(payload.payload),
    *onSuccess() {
      yield put(clearCart());
      createSuccessToast("Предметы успешно забронированы");
    },
    onAnyError() {
      createErrorToast(`Что-то пошло не так`);
    },
  });
}
