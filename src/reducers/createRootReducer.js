import { combineReducers } from "redux";
import { homePageSlice } from "../pages/home-page/HomePageSlice";
import { modalsSlice } from "../components/modals/ModalProviderSlice";
import { storagePageSlice } from "../pages/storage-page/StoragePageSlice";
import { profilePageSlice } from "../pages/profile-page/ProfilePageSlice";

export const rootReducer = combineReducers({
  homePage: homePageSlice.reducer,
  profilePage: profilePageSlice.reducer,
  modalsProvider: modalsSlice.reducer,
  storagePage: storagePageSlice.reducer,
});
