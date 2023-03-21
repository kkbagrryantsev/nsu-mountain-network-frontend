import {combineReducers, configureStore} from "@reduxjs/toolkit";
import tokenSlice from "./slices/tokenSlice"
import modalsSlice from "./slices/modalsSlice";

const reducer = combineReducers({
    token: tokenSlice,
    modals: modalsSlice,
})
const store = configureStore({reducer: reducer})

export default store