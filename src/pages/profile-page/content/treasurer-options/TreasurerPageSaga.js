import { call, takeEvery, put } from "redux-saga/effects";
import { execApiCall } from "../../../../utils/ApiUtils";
import { setAllUsers } from "./TreasurerPageSlice";
import { getAllUsersAction } from "./TreasurerPageActions";
import { apiGetAllUsers } from "../../../../api/models/ApiCalls";
import LoadingState from "../../../../enums/LoadingState";

export function* treasurerPageSagaWatcher() {
  yield takeEvery(getAllUsersAction, sagaGetAllUsers);
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
