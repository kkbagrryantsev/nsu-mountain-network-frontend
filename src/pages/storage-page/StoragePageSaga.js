import { call, takeEvery, put } from "redux-saga/effects";
import { execApiCall } from "../../utils/ApiUtils";
import { apiGetItems } from "../../api/ApiCalls";
import { apiGetRequests } from "../../api/ApiCalls";
import { getItems, getRequests } from "./StoragePageActions";
import { updateItems } from "./StoragePageSlice";

export function* storagePageSagaWatcher() {
  yield takeEvery(getItems, sagaGetItems); 
  yield takeEvery(getRequests, sagaGetRequests);
}

function* sagaGetItems(action) {
  yield call(execApiCall, {
    mainCall: () => apiGetItems(action.payload),
    *onSuccess(response) {
      yield put(updateItems(response.data.items));
    },
  });
}

function* sagaGetRequests(action) {
  yield call(execApiCall, {
    mainCall: () => apiGetRequests(action.payload),
    *onSuccess(response) {
      yield put(updateItems(response.data.item_in_use));
      return response.data;
    },
  });
}

