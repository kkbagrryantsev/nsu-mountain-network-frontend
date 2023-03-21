import { combineReducers } from "redux";
import { homePageSlice } from "../pages/home-page/HomePageSlice";
import { modalsSlice } from "../components/modals/ModalProviderSlice";

export const rootReducer = combineReducers({
  homePage: homePageSlice.reducer,
  modalsProvider: modalsSlice.reducer,
});
