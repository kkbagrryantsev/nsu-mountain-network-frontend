import { combineReducers } from "redux";
import { homePageSlice } from "../pages/home-page/HomePageSlice";
import { modalsSlice } from "../components/modals/ModalProviderSlice";
import { storagePageSlice } from "../pages/storage-page/StoragePageSlice";
import { profilePageSlice } from "../pages/profile-page/ProfilePageSlice";
import { cartPageSlice } from "../pages/cart-page/CartPageSlice";
import { categoriesSlice } from "../pages/profile-page/content/ware-editor-tab/CategoriesSlice";
import { treasurerTabSlice } from "../pages/profile-page/content/treasurer-options/TreasurerTabSlice";
import { requestsManagementTabSlice } from "../pages/profile-page/content/requests-management-tab/RequestsManagementTabSlice";
import { itemsManagementTabSlice } from "../pages/profile-page/content/items-management-tab/ItemsManagementTabSlice";

export const rootReducer = combineReducers({
  homePage: homePageSlice.reducer,
  profilePage: profilePageSlice.reducer,
  modalsProvider: modalsSlice.reducer,
  storagePage: storagePageSlice.reducer,
  cartPage: cartPageSlice.reducer,
  treasurerTab: treasurerTabSlice.reducer,
  categories: categoriesSlice.reducer,
  requestsTab: requestsManagementTabSlice.reducer,
  itemsTab: itemsManagementTabSlice.reducer,
});
