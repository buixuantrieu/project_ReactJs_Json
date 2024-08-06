import {
  addCartRequest,
  addCartSuccess,
  addCartFail,
  getCartRequest,
  getCartSuccess,
  getCartFail,
  updateCartRequest,
  updateCartSuccess,
  updateCartFail,
  deleteCartFail,
  deleteCartSuccess,
  deleteCartRequest,
} from "../slicers/cart.slice";
import { notification } from "antd";

import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

//Add Cart Saga

function* addCartSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.get("http://localhost:3500/carts", {
      params: {
        userId: data.userId,
        productId: data.productId,
      },
    });
    if (result.data.length > 0) {
      yield axios.patch(`http://localhost:3500/carts/${result.data[0].id}`, {
        quantity: result.data[0].quantity + data.quantity,
      });
      yield notification.success({ message: "Update Cart Success!" });
    } else {
      yield axios.post("http://localhost:3500/carts", data);
      yield notification.success({ message: "Add to Cart Success!" });
    }
    yield callback();
    yield put(addCartSuccess());
  } catch (e) {
    yield put(addCartFail({ error: "Failure" }));
  }
}

function* getCartSaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.get("http://localhost:3500/carts", {
      params: {
        userId: data.userId,
        _expand: "product",
      },
    });
    yield put(getCartSuccess({ data: result.data }));
  } catch (e) {
    yield put(getCartFail({ error: "Failure" }));
  }
}
function* updateCartSaga(action) {
  try {
    const { id, quantity, callback } = action.payload;
    yield axios.patch(`http://localhost:3500/carts/${id}`, {
      quantity: quantity,
    });
    yield callback();
    put(updateCartSuccess());
  } catch (e) {
    yield put(updateCartFail({ error: "Failure" }));
  }
}
function* deleteCartSaga(action) {
  try {
    const { id, callback } = action.payload;
    yield axios.delete(`http://localhost:3500/carts/${id}`);
    yield callback();
    put(deleteCartSuccess());
  } catch (e) {
    yield put(deleteCartFail({ error: "Failure" }));
  }
}

export default function* cartSaga() {
  yield takeEvery(addCartRequest, addCartSaga);
  yield takeEvery(getCartRequest, getCartSaga);
  yield takeEvery(updateCartRequest, updateCartSaga);
  yield takeEvery(deleteCartRequest, deleteCartSaga);
}
