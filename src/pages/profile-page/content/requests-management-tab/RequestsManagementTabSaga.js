import { call, takeEvery, put } from "redux-saga/effects";
import { execApiCall } from "utils/ApiUtils";
import {
  approveBookRequestsAction,
  commentBookingRequestAction,
  fulfillBookRequestAction,
  getItemsInUseByTypeAction,
  patchBookRequestAction,
  rejectBookRequestsAction,
  returnBookedItemsAction,
} from "./RequestsManagementTabActions";
import {
  apiApproveBookRequests,
  apiCommentBookRequest,
  apiFulfillBookRequest,
  apiGetItemsInUseHistory,
  apiModifyBookRequest,
  apiRejectBookRequests,
  apiReturnBookedItems,
} from "api/models/ApiCalls";
import { removeRequests, updateRequests } from "./RequestsManagementTabSlice";
import { createErrorToast, createSuccessToast } from "models/ToastModel";

export function* requestsManagementTabSagaWatcher() {
  yield takeEvery(getItemsInUseByTypeAction, sagaGetItemsInUseByType);
  yield takeEvery(commentBookingRequestAction, sagaCommentBookingRequest);
  yield takeEvery(approveBookRequestsAction, sagaApproveBookRequests);
  yield takeEvery(rejectBookRequestsAction, sagaRejectBookRequests);
  yield takeEvery(patchBookRequestAction, sagaPatchBookRequest);
  yield takeEvery(fulfillBookRequestAction, sagaFulfillBookRequest);
  yield takeEvery(returnBookedItemsAction, sagaReturnBookedItems);
}

function* sagaGetItemsInUseByType(action) {
  yield call(execApiCall, {
    mainCall: () => apiGetItemsInUseHistory(action.payload),
    *onSuccess(response) {
      const items = response.data.items.filter((i) => i.item_quantity > 0);
      yield put(
        updateRequests({
          type: action.payload,
          data: items,
        })
      );
    },
  });
}

function* sagaCommentBookingRequest(action) {
  yield call(execApiCall, {
    mainCall: () => apiCommentBookRequest(action.payload),
    onSuccess() {},
    onAnyError() {
      createErrorToast("Сообщение не было отправлено");
    },
  });
}

function* sagaPatchBookRequest(action) {
  const data = {
    use_ids: action.payload.items.map((item) => {
      return {
        description: action.payload.description,
        use_id: item.id,
        quantity: item.quantity,
      };
    }),
  };
  yield call(execApiCall, {
    mainCall: () => apiModifyBookRequest(data),
    onSuccess(ignore) {},
    onAnyError() {
      createErrorToast("Не удалось изменить количество");
    },
  });
}

function* sagaApproveBookRequests(action) {
  const data = {
    use_ids: action.payload.ids.map((id) => {
      return { description: "ass", use_id: id };
    }),
  };
  yield call(execApiCall, {
    mainCall: () => apiApproveBookRequests(data),
    *onSuccess(ignore) {
      createSuccessToast("Заявка принята");
      yield put(
        removeRequests({ type: "requested", data: action.payload.ids })
      );
    },
    onAnyError() {
      createErrorToast("Не удалось принять заявку");
    },
  });
}

function* sagaRejectBookRequests(action) {
  const data = {
    use_ids: action.payload.ids.map((id) => {
      return { description: "ass", use_id: id };
    }),
  };
  yield call(execApiCall, {
    mainCall: () => apiRejectBookRequests(data),
    *onSuccess(ignore) {
      createSuccessToast("Заявка отклонена");
      yield put(
        removeRequests({ type: "requested", data: action.payload.ids })
      );
    },
    onAnyError() {
      createErrorToast("Не удалось отклонить заявку");
    },
  });
}

function* sagaFulfillBookRequest(action) {
  const data = {
    use_ids: action.payload.map((id) => {
      return { use_id: id };
    }),
  };
  yield call(execApiCall, {
    mainCall: () => apiFulfillBookRequest(data),
    *onSuccess(ignore) {
      yield put(removeRequests({ type: "booked", data: action.payload }));
    },
    onAnyError() {
      createErrorToast("Не удалось выдать");
    },
  });
}

function* sagaReturnBookedItems(action) {
  const data = {
    use_ids: action.payload.map((i) => {
      return { use_id: i.use_id, quantity: i.item_quantity };
    }),
  };
  yield call(execApiCall, {
    mainCall: () => apiReturnBookedItems(data),
    *onSuccess(ignore) {
      createSuccessToast("Предметы возвращены на склад");
      yield put(
        removeRequests({
          type: "taken",
          data: action.payload.map((i) => i.use_id),
        })
      );
    },
    onAnyError() {
      createErrorToast("Не удалось вернуть");
    },
  });
}
