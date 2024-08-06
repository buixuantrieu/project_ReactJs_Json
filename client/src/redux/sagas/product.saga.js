import {
  createProductRequest,
  createProductSuccess,
  createProductFail,
  getProductRequest,
  getProductSuccess,
  getProductFail,
  updateProductRequest,
  updateProductSuccess,
  updateProductFail,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFail,
  getProductDeletedRequest,
  getProductDeletedSuccess,
  getProductDeletedFail,
  getProductDetailRequest,
  getProductDetailSuccess,
  getProductDetailFail,
} from "../slicers/product.slice";

import { takeEvery, put, debounce } from "redux-saga/effects";
import axios from "axios";

//Create Product Saga

function* createProductSaga(action) {
  try {
    const { data } = yield action.payload;
    yield axios.post("http://localhost:3500/products", data);
    put(createProductSuccess());
  } catch (e) {
    yield put(createProductFail({ error: "Lỗi" }));
  }
}

//Get Product Saga

function* getProductSaga(action) {
  const { categoryId, typeId, keywords, priceOrder, lte, gte, page, limit, more } = action.payload;
  try {
    const result = yield axios.get("http://localhost:3500/products", {
      params: {
        isDelete: false,
        categoryId: categoryId,
        typeId: typeId,
        ...(priceOrder && {
          _sort: "price",
          _order: priceOrder,
        }),
        _limit: limit,
        _page: page,
        ...(gte && { price_gte: gte }),
        ...(lte && { price_lte: lte }),
        ...(keywords && { q: keywords }),
        _expand: ["category", "type"],
      },
    });
    yield put(
      getProductSuccess({
        data: result.data,
        meta: {
          total: parseInt(result.headers["x-total-count"]),
          page: page,
          limit: limit,
        },
        more: more,
      })
    );
  } catch (e) {
    yield put(getProductFail({ error: "Lỗi" }));
  }
}

//Get ProductDetail Saga

function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:3500/products/${id}`, {
      params: {
        isDelete: true,
      },
    });
    yield put(getProductDetailSuccess({ data: result.data }));
  } catch (e) {
    yield put(getProductDetailFail({ error: "Lỗi" }));
  }
}

//Get Product Delete Saga

function* getProductDeletedSaga(action) {
  try {
    const result = yield axios.get("http://localhost:3500/products", {
      params: {
        isDelete: true,
      },
    });
    yield put(getProductDeletedSuccess({ data: result.data }));
  } catch (e) {
    yield put(getProductDeletedFail({ error: "Lỗi" }));
  }
}

//Update Product Saga

function* updateProductSaga(action) {
  try {
    const { id, data, callback } = action.payload;
    yield axios.patch(`http://localhost:3500/products/${id}`, data);
    yield callback();
    yield put(updateProductSuccess());
  } catch (e) {
    yield put(updateProductFail({ error: "Lỗi" }));
  }
}

//Delete Product Saga

function* deleteProductSaga(action) {
  try {
    const { id, status, callback } = action.payload;
    yield axios.patch(`http://localhost:3500/products/${id}`, {
      isDelete: status,
    });
    yield callback();
    yield put(deleteProductSuccess());
  } catch (e) {
    yield put(deleteProductFail({ error: "Lỗi" }));
  }
}

export default function* productSaga() {
  yield takeEvery(createProductRequest, createProductSaga);
  yield debounce(100, getProductRequest, getProductSaga);
  yield takeEvery(getProductDeletedRequest, getProductDeletedSaga);
  yield takeEvery(updateProductRequest, updateProductSaga);
  yield takeEvery(deleteProductRequest, deleteProductSaga);
  yield takeEvery(getProductDetailRequest, getProductDetailSaga);
}
