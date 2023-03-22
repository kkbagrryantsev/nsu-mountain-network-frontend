import { combineReducers } from "redux";
import { homePageSlice } from "../pages/home-page/HomePageSlice";
import { modalsSlice } from "../components/modals/ModalProviderSlice";
import { storagePageSlice } from "../pages/storage-page/StoragePageSlice";

export const rootReducer = combineReducers({
  homePage: homePageSlice.reducer,
  modalsProvider: modalsSlice.reducer,
  storagePage: storagePageSlice.reducer,
});
