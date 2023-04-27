import { call, takeEvery, put } from "redux-saga/effects";
import { execApiCall } from "../../utils/ApiUtils";
import { apiGetAvailableItems } from "../../api/models/ApiCalls";
import { getItems } from "./StoragePageActions";
import { updateItems } from "./StoragePageSlice";

export function* storagePageSagaWatcher() {
  yield takeEvery(getItems, sagaGetItems);
}

function* sagaGetItems(action) {
  yield call(execApiCall, {
    mainCall: () => apiGetAvailableItems(action.payload),
    *onSuccess(response) {
      yield put(updateItems(response.data.items));
    },
  });
}
