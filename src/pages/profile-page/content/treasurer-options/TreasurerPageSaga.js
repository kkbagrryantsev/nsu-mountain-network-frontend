import { call, takeEvery, put } from "redux-saga/effects";
import { execApiCall } from "../../../../utils/ApiUtils";
import { setAllUsers } from "./TreasurerPageSlice";
import { getAllUsersAction } from "./TreasurerPageActions";
import { apiGetAllUsers, apiModifyUserBalance } from "../../../../api/models/ApiCalls";
import LoadingState from "../../../../enums/LoadingState";
import { createSuccessToast } from "models/ToastModel";
import { modifyUserBalanceAction } from "./TreasurerPageActions";
import { createErrorToast } from "models/ToastModel";

export function* treasurerPageSagaWatcher() {
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
      //yield createErrorToast("He удалось загрузить данные пользователей");
    },
  });
}

function* sagaModifyUserBalance(action) {
  
  const requestBody = {
    user: {
      user_login: action.payload.currentUserID,
      money: parseInt(action.payload.formValue.newBalance, 10),
    }
  };
  yield call(execApiCall, {
    mainCall: () => apiModifyUserBalance(action.payload.currentUserID, requestBody),
    *onSuccess() {
      createSuccessToast("Баланс обновлён");
    },
    *onAnyError() {
      yield createErrorToast("He удалось выполнить запрос");
    },
  });
}
