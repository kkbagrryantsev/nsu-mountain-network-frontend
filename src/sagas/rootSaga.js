import { all } from "redux-saga/effects";
import { homePageSagaWatcher } from "../pages/home-page/HomePageSaga";
import { storagePageSagaWatcher } from "../pages/storage-page/StoragePageSaga";
import { cartPageSagaWatcher } from "../pages/cart-page/CartPageSaga";
import { profilePageSagaWatcher } from "../pages/profile-page/ProfilePageSaga";
import { redirectSagaWatcher } from "../utils/RedirectUtils";
import { wareEditorSagaWatcher } from "../pages/profile-page/content/ware-editor-tab/WareEditorSaga";
import { treasurerTabSagaWatcher } from "../pages/profile-page/content/treasurer-options/TreasurerTabSaga";
import { requestsManagementTabSagaWatcher } from "../pages/profile-page/content/requests-management-tab/RequestsManagementTabSaga";
import { itemsManagementTabSagaWatcher } from "../pages/profile-page/content/items-management-tab/ItemsManagementTabSaga";

function getSagas() {
  return [
    homePageSagaWatcher(),
    storagePageSagaWatcher(),
    cartPageSagaWatcher(),
    profilePageSagaWatcher(),
    redirectSagaWatcher(),
    wareEditorSagaWatcher(),
    treasurerTabSagaWatcher(),
    requestsManagementTabSagaWatcher(),
    itemsManagementTabSagaWatcher(),
  ];
}

export default function* rootSaga() {
  yield all(getSagas().filter((saga) => !!saga));
}
