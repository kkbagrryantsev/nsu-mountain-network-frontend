import { takeEvery } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";

export const redirect = createAction("redirect", function (url, init) {
  init = init || "";
  return { payload: { url: url, init: init } };
});

export function* redirectSagaWatcher() {
  yield takeEvery(redirect, sagaRedirect);
}

function sagaRedirect(action) {
  const { url, init } = action.payload;
  window.location.pathname = url;
  window.location.search = init;
}
