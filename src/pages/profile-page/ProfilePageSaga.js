import { call, put, takeEvery } from "redux-saga/effects";
import { execApiCall } from "../../utils/ApiUtils";
import { updateUserData } from "./ProfilePageSlice";
import { saveUserRoles } from "../../api/Cookie";
import { getMyProfileAction } from "./ProfilePageActions";
import { apiGetMyProfile } from "../../api/auth/ApiCalls";

export function* profilePageSagaWatcher() {
  yield takeEvery(getMyProfileAction, sagaGetMyProfile);
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
