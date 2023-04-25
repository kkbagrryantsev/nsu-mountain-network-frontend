import { call, takeEvery, put } from "redux-saga/effects";
import { execApiCall } from "../../utils/ApiUtils";
import { apiGetItems } from "../../api/ApiCalls";
import { getItems } from "./StoragePageActions";
import { updateItems } from "./StoragePageSlice";

export function* storagePageSagaWatcher() {
  yield takeEvery(getItems, sagaGetItems);
}

function* sagaGetItems(action) {
  yield call(execApiCall, {
    mainCall: () => apiGetItems(action.payload),
    *onSuccess(response) {
      yield put(updateItems(response.data.items));
    },
  });
}
