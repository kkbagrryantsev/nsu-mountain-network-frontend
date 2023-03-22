import { all } from "redux-saga/effects";
import { homePageSagaWatcher } from "../pages/home-page/HomePageSaga";
import { storagePageSagaWatcher } from "../pages/storage-page/StoragePageSaga";

function getSagas() {
  return [homePageSagaWatcher(), storagePageSagaWatcher()];
}

export default function* rootSaga() {
  yield all(getSagas().filter((saga) => !!saga));
}
