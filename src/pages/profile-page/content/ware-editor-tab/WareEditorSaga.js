import { call, put, takeEvery } from "redux-saga/effects";
import { execApiCall } from "utils/ApiUtils";
import { getCategoriesListAction } from "./WareEditorActions";
import { apiGetCategoriesList } from "../../../../api/models/ApiCalls";
import { setAllCategories } from "./CategoriesSlice";

export function* wareEditorSagaWatcher() {
  yield takeEvery(getCategoriesListAction, sagaGetCategoriesList);
}

function* sagaGetCategoriesList() {
  yield call(execApiCall, {
    mainCall: () => apiGetCategoriesList(),
    *onSuccess(response) {
      yield put(setAllCategories(response.data.categories));
    },
  });
}
