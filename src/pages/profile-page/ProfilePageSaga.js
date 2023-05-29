import { call, put, takeEvery } from "redux-saga/effects";
import { execApiCall } from "../../utils/ApiUtils";
import {
  removeMyItemsByTypeById,
  updateItemsByType,
  updateMyItemsByType,
  updateUserData,
} from "./ProfilePageSlice";
import { saveUserRoles } from "../../api/Cookie";
import {
  getItemsInUseHistoryAction,
  getMyItemsInUseHistoryAction,
  getMyProfileAction,
  unbookItemsAction,
} from "./ProfilePageActions";
import { apiGetMyProfile } from "../../api/auth/ApiCalls";
import {
  apiGetItemsInUseHistory,
  apiUnbookItems,
} from "../../api/models/ApiCalls";
import { createSuccessToast } from "../../models/ToastModel";

export function* profilePageSagaWatcher() {
  yield takeEvery(getMyProfileAction, sagaGetMyProfile);
  yield takeEvery(getItemsInUseHistoryAction, sagaGetItemsInUseHistory);
  yield takeEvery(getMyItemsInUseHistoryAction, sagaGetMyItemsInUseHistory);
  yield takeEvery(unbookItemsAction, sagaUnbookItems);
}

function* sagaGetMyProfile() {
  yield call(execApiCall, {
    mainCall: () => apiGetMyProfile(),
    *onSuccess(response) {
      // TODO Will be deprecated when user roles api call is patched
      saveUserRoles(response.data.user.user_roles);
      yield put(updateUserData(response.data.user));
    },
  });
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
    *onSuccess() {
      // TODO Fix item_id to use_id
      createSuccessToast("Бронь отменена");
      yield put(
        removeMyItemsByTypeById({
          type: "booked",
          data: action.payload.map((i) => i.item_id),
        })
      );
    },
  });
}

function* sagaGetItemsInUseHistory(action) {
  yield call(execApiCall, {
    mainCall: () => apiGetItemsInUseHistory(action.payload),
    *onSuccess(response) {
      yield put(
        updateItemsByType({ type: action.payload, data: response.data })
      );
    },
  });
}

function* sagaGetMyItemsInUseHistory(action) {
  yield call(execApiCall, {
    mainCall: () => apiGetMyProfile(),
    *onSuccess(response) {
      let items = response.data.user.items;
      switch (action.payload) {
        case "requested":
          items = items.filter((i) => i.is_confirm === 0);
          break;
        case "booked":
          items = items.filter((i) => i.is_confirm === 1);
          break;
        case "taken":
          items = items.filter((i) => i.is_confirm === 2);
          break;
      }
      items = items.filter((i) => i.item_quantity > 0);
      yield put(updateMyItemsByType({ type: action.payload, data: items }));
    },
  });
}
