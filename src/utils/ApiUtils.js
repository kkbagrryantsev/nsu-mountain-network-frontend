import { call } from "redux-saga/effects";
import { createErrorToast } from "../models/ToastModel";
import { getAccessToken } from "../api/Cookie";

export const getAccessTokenHeader = (args) => {
  const token = getAccessToken();

  if (args === undefined) {
    args = {};
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      restrictAuthConfirm: args.restrictAuthConfirm,
    },
  };
};

export const getJSONHeader = () => {
  return {
    headers: {
      "Content-Type": "application/json",
      restrictAuthConfirm: true,
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
      console.log(e);
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
