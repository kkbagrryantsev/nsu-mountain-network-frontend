import { takeEvery, put } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";

export const redirect = createAction("redirect", function (url, init) {
  init = init || "";
  return { payload: { url: url, init: init } };
});

export function* redirectSagaWatcher() {
  yield takeEvery(redirect, sagaRedirect);
}

function* sagaRedirect(action) {
  const { url, init } = action.payload;
  const origin = window.location.origin;
  window.location.href = `${origin}/${url}?${init}`;
}
