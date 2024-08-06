import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";
import { notification } from "antd";

import {
  getOrderListRequest,
  getOrderListSuccess,
  getOrderListFail,
  orderProductRequest,
  orderProductSuccess,
  orderProductFail,
  updateOrderProductRequest,
  updateOrderProductSuccess,
  updateOrderProductFail,
  deleteOrderProductRequest,
  deleteOrderProductSuccess,
  deleteOrderProductFail,
} from "../slicers/order.slice";
import { deleteCartRequest } from "../slicers/cart.slice";

function* getOrderListSaga(action) {
  try {
    const { userId } = action.payload;
    const result = yield axios.get("http://localhost:3500/orders", {
      params: {
        _embed: "orderDetails",
        ...(userId && { userId: userId }),
      },
    });
    yield put(getOrderListSuccess({ data: result.data }));
  } catch (e) {
    yield put(getOrderListFail({ error: "Lỗi..." }));
  }
}
function* updateOrderListSaga(action) {
  try {
    const { data } = action.payload;
    yield axios.patch(`http://localhost:3500/orders/${data.id}`, {
      status: data.message,
    });
    yield put(getOrderListRequest({ userId: data.userId }));
    yield put(updateOrderProductSuccess());
    yield notification.success({ message: "Update order status successfully!" });
  } catch (e) {
    yield put(updateOrderProductFail({ error: "Lỗi..." }));
  }
}
function* deleteOrderListSaga(action) {
  try {
    const { data } = action.payload;
    yield axios.delete(`http://localhost:3500/orders/${data.id}`);
    yield put(getOrderListRequest({ userId: data.userId }));
    yield put(deleteOrderProductSuccess());
    yield notification.success({ message: "Order deleted successfully!" });
  } catch (e) {
    yield put(deleteOrderProductFail({ error: "Lỗi..." }));
  }
}

function* orderProductSaga(action) {
  try {
    const { data, callback } = action.payload;
    const { cartList, ...orderData } = data;
    const orderResult = yield axios.post("http://localhost:3500/orders", orderData);
    for (let i = 0; i < cartList.length; i++) {
      yield axios.post("http://localhost:3500/orderDetails", {
        orderId: orderResult.data.id,
        productId: cartList[i].productId,
        productName: cartList[i].name,
        price: cartList[i].price,
        image: cartList[i].image,
        quantity: cartList[i].quantity,
      });
      yield put(deleteCartRequest({ id: cartList[i].id, callback: () => null }));
    }
    yield callback();
    yield put(orderProductSuccess());
  } catch (e) {
    yield put(orderProductFail({ error: "Lỗi..." }));
  }
}

export default function* categorySaga() {
  yield takeEvery(getOrderListRequest, getOrderListSaga);
  yield takeEvery(orderProductRequest, orderProductSaga);
  yield takeEvery(updateOrderProductRequest, updateOrderListSaga);
  yield takeEvery(deleteOrderProductRequest, deleteOrderListSaga);
}
