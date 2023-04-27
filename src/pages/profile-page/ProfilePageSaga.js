import { call, put, takeEvery } from "redux-saga/effects";
import { execApiCall } from "../../utils/ApiUtils";
import { updateUserData } from "./ProfilePageSlice";
import { saveUserRoles } from "../../api/Cookie";
import { getMyProfileAction } from "./ProfilePageActions";
import { apiGetMyProfile } from "../../api/auth/ApiCalls";
import { apiGetRequests } from "api/ApiCalls";
import { updateItems } from "./RequestsSlice";

export function* profilePageSagaWatcher() {
  yield takeEvery(getMyProfileAction, sagaGetMyProfile, sagaGetItemsInUse);
}

function* sagaGetMyProfile(action) {
  yield call(execApiCall, {
    mainCall: () => apiGetMyProfile(),
    *onSuccess(response) {
      // TODO Will be deprecated when user roles api call is patched
      saveUserRoles(response.data.user.user_roles);
      yield put(updateUserData(response.data.user));
    },
  });
}

function* sagaGetItemsInUse(action) {
  yield call(execApiCall, {
    mainCall: () => apiGetRequests(action.payload),
    *onSuccess(response) {
      yield put(updateItems(response.data.item_in_use));
    },
  });
}
