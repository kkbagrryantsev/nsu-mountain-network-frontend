import { call, takeEvery, put } from "redux-saga/effects";
import { execApiCall } from "../../utils/ApiUtils";
import { setAllItems } from "./StoragePageSlice";
import { getAvailableItemsAction } from "./StoragePageActions";
import { apiGetAvailableItems } from "../../api/models/ApiCalls";
import LoadingState from "../../enums/LoadingState";

export function* storagePageSagaWatcher() {
  yield takeEvery(getAvailableItemsAction, sagaGetAvailableItems);
}

function* sagaGetAvailableItems(action) {
  yield call(execApiCall, {
    mainCall: () => apiGetAvailableItems(action.payload),
    *onSuccess(response) {
      const data = response.data;
      yield put(setAllItems({ data: data.items, status: LoadingState.LOADED }));
    },
    *onAnyError() {
      yield put(setAllItems({ data: [], status: LoadingState.ERROR }));
    },
  });
}
