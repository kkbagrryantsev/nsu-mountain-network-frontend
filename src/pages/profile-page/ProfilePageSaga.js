import { call, takeEvery, put } from "redux-saga/effects";
import { execApiCall } from "../../utils/ApiUtils";
import { updateUserData } from "./ProfilePageSlice";
import { getItemData, returnItem, updateData } from "./ProfilePageActions";
import { apiGetItemData, apiLogin, apiReturnItem } from "../../api/ApiCalls";
import { createErrorToast, createSuccessToast } from "../../models/ToastModel";

export function* profilePageSagaWatcher() {
  yield takeEvery(updateData, sagaUpdateData);
  yield takeEvery(returnItem, sagaReturnItem);
  yield takeEvery(getItemData, sagaGetItemData);
}

function* sagaUpdateData(action) {
  yield call(execApiCall, {
    mainCall: () => apiLogin(action.payload),
    *onSuccess(response) {
      console.log(response.data);
      yield put(updateUserData(response.data.items));
    },
  });
}

function* sagaReturnItem(action) {
  yield call(execApiCall, {
    mainCall: () => apiReturnItem(action.payload),
    *onSuccess() {
      createSuccessToast("Предметы возвращены успешно");
    },
    onAnyError() {
      createErrorToast("Предметы возвращены успешно");
    },
  });
}

function* sagaGetItemData(action) {
  yield call(execApiCall, {
    mainCall: () => apiGetItemData(action.payload),
    onSuccess(response) {
      return response.data;
    },
    onAnyError() {
      createErrorToast("Ошибка сервера");
    },
  });
}
