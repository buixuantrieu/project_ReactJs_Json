import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { notification } from "antd";

import {
  getReviewListRequest,
  getReviewListSuccess,
  getReviewListFailure,
  reviewProductRequest,
  reviewProductSuccess,
  reviewProductFailure,
  deleteReviewProductRequest,
  deleteReviewProductSuccess,
  deleteReviewProductFailure,
} from "../slicers/review.slice";

function* getReviewListSaga(action) {
  try {
    const { productId } = action.payload;
    const result = yield axios.get("http://localhost:3500/reviews", {
      params: {
        _expand: "user",
        _sort: "createdAt",
        _order: "desc",
        ...(productId && { productId: productId }),
      },
    });
    yield put(getReviewListSuccess({ data: result.data }));
  } catch (e) {
    yield put(getReviewListFailure({ error: "Lỗi" }));
  }
}

function* reviewProductSaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.post("http://localhost:3500/reviews", data);
    yield put(reviewProductSuccess({ data: result.data }));
    yield put(getReviewListRequest({ productId: data.productId }));
    notification.success({ message: "Comment Success!" });
  } catch (e) {
    yield put(reviewProductFailure({ error: "Lỗi" }));
  }
}
function* deleteReviewProductSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`http://localhost:3500/reviews/${id}`);
    yield put(deleteReviewProductSuccess());
    yield put(getReviewListRequest({ productId: "" }));
    yield notification.success({ message: "Delete Comment Success!" });
  } catch (e) {
    yield put(deleteReviewProductFailure({ error: "Lỗi" }));
  }
}
export default function* reviewSaga() {
  yield takeEvery(getReviewListRequest, getReviewListSaga);
  yield takeEvery(reviewProductRequest, reviewProductSaga);
  yield takeEvery(deleteReviewProductRequest, deleteReviewProductSaga);
}
