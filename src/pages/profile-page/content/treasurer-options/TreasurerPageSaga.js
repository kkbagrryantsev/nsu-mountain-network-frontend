import { call, takeEvery, put } from "redux-saga/effects";
import { execApiCall } from "../../../../utils/ApiUtils";
import { setAllUsers } from "./TreasurerPageSlice";
import { getAllUsersAction } from "./TreasurerPageActions";
import { apiGetAllUsers, apiModifyUserBalance } from "../../../../api/models/ApiCalls";
import LoadingState from "../../../../enums/LoadingState";
import { createSuccessToast } from "models/ToastModel";
import { modifyUserBalanceAction } from "./TreasurerPageActions";

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
    },
  });
}

function* sagaModifyUserBalance(action) {
  
  const requestBody = {
      user_id: action.payload.uid,
      user_money: parseInt(action.payload.ubal.newBalance, 10),
  };
  console.log(requestBody);
  yield call(execApiCall, {
    mainCall: () => apiModifyUserBalance(requestBody),
    *onSuccess() {
      createSuccessToast("Баланс обновлён");
    },
  });
}
