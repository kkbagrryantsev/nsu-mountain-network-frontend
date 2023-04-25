import { call, put, takeEvery } from "redux-saga/effects";
import { execApiCall } from "../../utils/ApiUtils";
import { updateUserData } from "./ProfilePageSlice";
import { saveUserRoles } from "../../api/Cookie";
import { getMyProfileAction } from "./ProfilePageActions";
import { apiGetMyProfile } from "../../api/auth/ApiCalls";
import { apiGetRequests } from "api/ApiCalls";
import { updateItems } from "pages/storage-page/StoragePageSlice";


export function* profilePageSagaWatcher() {
  yield takeEvery(getMyProfileAction, sagaGetMyProfile, sagaGetRequests);
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

function* sagaGetRequests(type) {
  yield call(execApiCall, {
    mainCall: () => apiGetRequests(type),
    *onSuccess(response) {
      yield put(updateItems(response.data.item_in_use));
    },
  });
}
