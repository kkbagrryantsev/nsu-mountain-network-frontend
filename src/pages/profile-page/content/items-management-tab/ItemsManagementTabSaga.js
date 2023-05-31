import { call, put, takeEvery } from "redux-saga/effects";
import { createErrorToast } from "models/ToastModel";
import {
  getMyRequestsAction,
  unbookItemsAction,
} from "./ItemsManagementTabActions";
import { apiGetMyRequestsByType } from "api/auth/ApiCalls";
import { apiUnbookItems } from "api/models/ApiCalls";
import { execApiCall } from "utils/ApiUtils";
import { updateMyItemsByType } from "./ItemsManagementTabSlice";

export function* itemsManagementTabSagaWatcher() {
  yield takeEvery(unbookItemsAction, sagaUnbookItems);
  yield takeEvery(getMyRequestsAction, sagaGetMyRequests);
}

function* sagaUnbookItems(action) {
  const requestBody = {
    use_ids: action.payload.map((item) => {
      return {
        quantity: item.item_quantity,
        use_id: item.use_id,
      };
    }),
  };

  yield call(execApiCall, {
    mainCall: () => apiUnbookItems(requestBody),
    onSuccess() {},
    onAnyError() {
      createErrorToast("Не удалось отменить бронь");
    },
  });
}

function* sagaGetMyRequests(action) {
  yield call(execApiCall, {
    mainCall: () => apiGetMyRequestsByType(action.payload),
    *onSuccess(response) {
      const items = response.data.filter((i) => i.item_quantity > 0);
      yield put(updateMyItemsByType({ type: action.payload, data: items }));
    },
  });
}
