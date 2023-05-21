import { all } from "redux-saga/effects";
import { homePageSagaWatcher } from "../pages/home-page/HomePageSaga";
import { storagePageSagaWatcher } from "../pages/storage-page/StoragePageSaga";
import { cartPageSagaWatcher } from "../pages/cart-page/CartPageSaga";
import { profilePageSagaWatcher } from "../pages/profile-page/ProfilePageSaga";
import { redirectSagaWatcher } from "../utils/RedirectUtils";
import { treasurerPageSagaWatcher } from "pages/profile-page/content/treasurer-options/TreasurerPageSaga";

function getSagas() {
  return [
    homePageSagaWatcher(),
    storagePageSagaWatcher(),
    cartPageSagaWatcher(),
    profilePageSagaWatcher(),
    redirectSagaWatcher(),
    treasurerPageSagaWatcher(),
  ];
}

export default function* rootSaga() {
  yield all(getSagas().filter((saga) => !!saga));
}
