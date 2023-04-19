import { call, takeEvery, put } from "redux-saga/effects";
import { execApiCall } from "utils/ApiUtils";
import { apiSignIn, apiSignUp } from "api/auth/ApiCalls";
import { saveAccessToken } from "api/Cookie";
import {
  createErrorToast,
  createInfoToast,
  createSuccessToast,
} from "models/ToastModel";
import { paths } from "routePaths";
import { redirect } from "utils/RedirectUtils";
import { signInAction, signUpAction } from "./HomePageActions";

export function* homePageSagaWatcher() {
  yield takeEvery(signInAction, sagaSignIn);
  yield takeEvery(signUpAction, sagaSignUp);
}

function* sagaSignIn(action) {
  yield call(execApiCall, {
    mainCall: () => apiSignIn(action.payload),
    *onSuccess(response) {
      saveAccessToken(response.data.access_token);
      yield put(redirect(paths.INDEX));
    },
    *onFail403() {
      createInfoToast(`Вы уже авторизованы`);
      yield put(redirect(paths.INDEX));
    },
    onFail400(response) {
      switch (response.status) {
        case 401:
          createErrorToast(`Неверный логин или пароль`);
          break;
        default:
          createErrorToast(`Ошибка. Повторите попытку позже...`);
      }
    },
  });
}

function* sagaSignUp(action) {
  yield call(execApiCall, {
    mainCall: () => apiSignUp(action.payload),
    onSuccess() {
      // TODO Add registration steps
      createSuccessToast(
        `Отправлена заявка на регистрацию. Проверьте свою почту`
      );
    },
    onFail403() {
      createErrorToast(`Пользователь с такими данными уже существует`);
    },
  });
}
