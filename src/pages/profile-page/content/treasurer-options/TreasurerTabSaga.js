import { call, takeEvery, put } from "redux-saga/effects";
import { execApiCall } from "utils/ApiUtils";
import { setAllUsers } from "./TreasurerTabSlice";
import { getAllUsersAction } from "./TreasurerTabActions";
import { apiGetAllUsers, apiModifyUserBalance } from "api/models/ApiCalls";
import LoadingState from "enums/LoadingState";
import { createSuccessToast } from "models/ToastModel";
import { modifyUserBalanceAction } from "./TreasurerTabActions";
import { createErrorToast } from "models/ToastModel";

export function* treasurerTabSagaWatcher() {
  yield takeEvery(getAllUsersAction, sagaGetAllUsers);
  yield takeEvery(modifyUserBalanceAction, sagaModifyUserBalance);
}

function* sagaGetAllUsers(action) {
  yield call(execApiCall, {
    mainCall: () => apiGetAllUsers(action.payload),
    *onSuccess(response) {
      const data = response.data;
      yield put(setAllUsers({ data: data.users, status: LoadingState.LOADED }));
    },
    *onAnyError() {
      yield put(setAllUsers({ data: [], status: LoadingState.ERROR }));
    },
  });
}

function* sagaModifyUserBalance(action) {
  yield call(execApiCall, {
    mainCall: () =>
      apiModifyUserBalance(action.payload.user.user_login, action.payload),
    onSuccess() {
      createSuccessToast("Баланс обновлён");
    },
    *onAnyError() {
      yield createErrorToast("He удалось выполнить запрос");
    },
  });
}
