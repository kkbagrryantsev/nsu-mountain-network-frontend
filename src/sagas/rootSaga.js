import { all } from "redux-saga/effects";
import { homePageSagaWatcher } from "../pages/home-page/HomePageSaga";

function getSagas() {
  return [homePageSagaWatcher()];
}

export default function* rootSaga() {
  yield all(getSagas().filter((saga) => !!saga));
}
