import { all } from "redux-saga/effects";
import { homePageSagaWatcher } from "../pages/home-page/HomePageSaga";
import { storagePageSagaWatcher } from "../pages/storage-page/StoragePageSaga";
import { cartPageSagaWatcher } from "../pages/cart-page/CartPageSaga";
import { profilePageSagaWatcher } from "../pages/profile-page/ProfilePageSaga";

function getSagas() {
  return [
    homePageSagaWatcher(),
    storagePageSagaWatcher(),
    cartPageSagaWatcher(),
    profilePageSagaWatcher(),
  ];
}

export default function* rootSaga() {
  yield all(getSagas().filter((saga) => !!saga));
}
