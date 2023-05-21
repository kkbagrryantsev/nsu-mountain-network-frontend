import { call, takeEvery, put } from "redux-saga/effects";
import { execApiCall } from "../../utils/ApiUtils";
import { bookItemsAction } from "./CartPageActions";
import { createErrorToast, createSuccessToast } from "../../models/ToastModel";
import { apiBookItems } from "api/models/ApiCalls";
import { clearCart } from "./CartPageSlice";

export function* cartPageSagaWatcher() {
  yield takeEvery(bookItemsAction, sagaBookItems);
}

function* sagaBookItems(action) {
  console.log(action.payload);
  yield call(execApiCall, {
    mainCall: () => apiBookItems(action.payload),
    *onSuccess() {
      yield put(clearCart());
      createSuccessToast("Предметы успешно забронированы");
    },
    onAnyError() {
      createErrorToast(`Что-то пошло не так`);
    },
  });
}
