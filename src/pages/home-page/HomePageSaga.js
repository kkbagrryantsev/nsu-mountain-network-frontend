import { authorizeUser, fetchUserData, registerUser } from "./HomePageActions";
import { call, takeEvery, put } from "redux-saga/effects";
import { execApiCall } from "utils/ApiUtils";
import { apiGetUserData, apiLogin } from "api/ApiCalls";
import { saveAccessToken, saveRefreshToken, saveUserRoles } from "api/Cookie";
import { createErrorToast, createSuccessToast } from "models/ToastModel";
import { updateUserData } from "../profile-page/ProfilePageSlice";
import { paths } from "routePaths";
import { redirect } from "../../utils/RedirectUtils";

export function* homePageSagaWatcher() {
  yield takeEvery(authorizeUser, sagaLoginUser);
  yield takeEvery(registerUser, sagaRegisterUser);
  yield takeEvery(fetchUserData, sagaFetchUserData);
}

function* sagaLoginUser(action) {
  yield call(execApiCall, {
    mainCall: () => apiLogin(action.payload),
    *onSuccess(response) {
      saveAccessToken(response.data.access_token);
      saveRefreshToken(response.data.refresh_token);
      createSuccessToast(`Вы успешно вошли в аккаунт`);
      yield put(fetchUserData());
      yield put(redirect(paths.INDEX));
    },
    onFail401() {
      createErrorToast(`Неверный логин или пароль`);
    },
    onAnyError() {
      createErrorToast(`Неверный логин или пароль`);
    },
  });
}

function* sagaRegisterUser(action) {
  yield call(execApiCall, {
    mainCall: () => apiLogin(action.payload),
    onSuccess() {
      createSuccessToast(
        `Отправлена заявка на регистрацию. Проверьте свою почту`
      );
    },
    onAnyError() {
      createErrorToast(`Ошибка сервера`);
    },
  });
}

function* sagaFetchUserData() {
  yield call(execApiCall, {
    mainCall: () => apiGetUserData(),
    *onSuccess(response) {
      yield put(updateUserData(response.data.user));
      saveUserRoles(response.data.user.user_roles);
    },
    onAnyError() {
      createErrorToast(`Ошибка сервера`);
    },
  });
}
