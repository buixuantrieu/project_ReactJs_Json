import {
  createCategoryRequest,
  createCategorySuccess,
  createCategoryFail,
  getCategoryRequest,
  getCategorySuccess,
  getCategoryFail,
  updateCategoryRequest,
  updateCategorySuccess,
  updateCategoryFail,
  deleteCategoryRequest,
  deleteCategorySuccess,
  deleteCategoryFail,
  getCategoryDeletedRequest,
  getCategoryDeletedSuccess,
  getCategoryDeletedFail,
} from "../slicers/category.slice";

import { takeEvery, put, debounce } from "redux-saga/effects";
import axios from "axios";

//Create Category Saga

function* createCategorySaga(action) {
  try {
    const { data } = yield action.payload;
    yield axios.post("http://localhost:3500/categories", data);
    put(createCategorySuccess());
  } catch (e) {
    yield put(createCategoryFail({ error: "Lỗi" }));
  }
}

//getCategory Saga

function* getCategorySaga(action) {
  const { keywords } = action.payload;
  try {
    const result = yield axios.get("http://localhost:3500/categories", {
      params: {
        isDelete: false,
        ...(keywords && { q: keywords }),
      },
    });
    yield put(getCategorySuccess({ data: result.data }));
  } catch (e) {
    yield put(getCategoryFail({ error: "Lỗi" }));
  }
}

//Get Category Deleted Saga

function* getCategoryDeletedSaga(action) {
  try {
    const result = yield axios.get("http://localhost:3500/categories", {
      params: {
        isDelete: true,
      },
    });
    yield put(getCategoryDeletedSuccess({ data: result.data }));
  } catch (e) {
    yield put(getCategoryDeletedFail({ error: "Lỗi" }));
  }
}

//Update Category Saga

function* updateCategorySaga(action) {
  try {
    const { id, data, callback } = action.payload;
    yield axios.patch(`http://localhost:3500/categories/${id}`, data);
    yield callback();
    yield put(updateCategorySuccess());
  } catch (e) {
    yield put(updateCategoryFail({ error: "Lỗi" }));
  }
}

//Delete Category Saga

function* deleteCategorySaga(action) {
  try {
    const { id, status, callback } = action.payload;
    yield axios.patch(`http://localhost:3500/categories/${id}`, {
      isDelete: status,
    });
    yield callback();
    yield put(deleteCategorySuccess());
  } catch (e) {
    yield put(deleteCategoryFail({ error: "Lỗi" }));
  }
}

export default function* categorySaga() {
  yield takeEvery(createCategoryRequest, createCategorySaga);
  yield debounce(300, getCategoryRequest, getCategorySaga);
  yield takeEvery(getCategoryDeletedRequest, getCategoryDeletedSaga);
  yield takeEvery(updateCategoryRequest, updateCategorySaga);
  yield takeEvery(deleteCategoryRequest, deleteCategorySaga);
}
