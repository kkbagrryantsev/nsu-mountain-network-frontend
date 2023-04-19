import { call } from "redux-saga/effects";
import { createErrorToast } from "../models/ToastModel";
import { getAccessToken } from "../api/Cookie";

// TODO Add headers object
export const getAccessTokenHeader = () => {
  const token = getAccessToken();

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

export const getJSONHeader = () => {
  return {
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export function* execApiCall(args) {
  const {
    mainCall,
    onSuccess,
    onFail403,
    onFail400,
    onFailException,
    onAnyError,
    additionalAnyErrorHandling,
    withoutHandlingResponseStatus,
  } = args;

  try {
    const response = yield mainCall().catch((e) => e.response);

    if (withoutHandlingResponseStatus) {
      yield call(onSuccess, response);
    } else if (response.status >= 200 && response.status < 300) {
      yield call(onSuccess, response);
    } else if (response.status === 403) {
      if (selectPriority(onAnyError, onFail403)) {
        yield call(selectPriority(onAnyError, onFail403));
      } else {
        createErrorToast(
          `Возникла ошибка: ${response.data.message}. Повторите запрос`
        );
        if (additionalAnyErrorHandling) {
          yield call(additionalAnyErrorHandling);
        }
      }
    } else if (response.status >= 400 && response.status < 500) {
      if (onFail400) {
        yield call(onFail400, response);
      } else if (onAnyError) {
        yield call(onAnyError);
      } else {
        createErrorToast(`Возникла неизвестная ошибка`);
        if (additionalAnyErrorHandling) {
          yield call(additionalAnyErrorHandling);
        }
      }
    } else if (selectPriority(onAnyError, onFailException)) {
      yield call(selectPriority(onAnyError, onFailException));
    } else {
      createErrorToast(`Возникла неизвестная ошибка`);
      if (additionalAnyErrorHandling) {
        yield call(additionalAnyErrorHandling);
      }
    }
  } catch (e) {
    if (
      !withoutHandlingResponseStatus &&
      selectPriority(onAnyError, onFailException)
    ) {
      yield call(selectPriority(onAnyError, onFailException));
    } else if (!withoutHandlingResponseStatus) {
      createErrorToast(`Возникла неизвестная ошибка`);
      if (additionalAnyErrorHandling) {
        yield call(additionalAnyErrorHandling);
      }
    }
  }
}

function selectPriority(base, priority) {
  return priority ? priority : base;
}
