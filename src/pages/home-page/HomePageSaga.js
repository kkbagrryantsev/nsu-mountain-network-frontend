import { authorizeUser, registerUser } from "./HomePageActions";
import { call, takeEvery } from "redux-saga/effects";
import { execApiCall } from "../../utils/ApiUtils";
import { apiLogin } from "../../api/ApiCalls";
import { saveAccessToken, saveRefreshToken } from "../../api/Cookie";
import { createErrorToast, createSuccessToast } from "../../models/ToastModel";

export function* homePageSagaWatcher() {
  yield takeEvery(authorizeUser, sagaLoginUser);
  yield takeEvery(registerUser, sagaRegisterUser);
}

function* sagaLoginUser(action) {
  yield call(execApiCall, {
    mainCall: () => apiLogin(action.payload),
    onSuccess(response) {
      saveAccessToken(response.data.access_token);
      saveRefreshToken(response.data.refresh_token);
      createSuccessToast(`Вы успешно вошли в аккаунт`);
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
