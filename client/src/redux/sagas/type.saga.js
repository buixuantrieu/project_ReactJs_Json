import {
  createTypeRequest,
  createTypeSuccess,
  createTypeFail,
  getTypeRequest,
  getTypeSuccess,
  getTypeFail,
  updateTypeRequest,
  updateTypeSuccess,
  updateTypeFail,
  deleteTypeRequest,
  deleteTypeSuccess,
  deleteTypeFail,
  getTypeDeletedRequest,
  getTypeDeletedSuccess,
  getTypeDeletedFail,
} from "../slicers/type.slice";

import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

//Create Type Saga

function* createTypeSaga(action) {
  try {
    const { data } = yield action.payload;
    yield axios.post("http://localhost:3500/types", data);
    put(createTypeSuccess());
  } catch (e) {
    yield put(createTypeFail({ error: "Lỗi" }));
  }
}

//Get Type Saga

function* getTypeSaga(action) {
  const { keywords } = action.payload;
  try {
    const result = yield axios.get("http://localhost:3500/types", {
      params: {
        isDelete: false,
        ...(keywords && { q: keywords }),
      },
    });
    yield put(getTypeSuccess({ data: result.data }));
  } catch (e) {
    yield put(getTypeFail({ error: "Lỗi" }));
  }
}

//Get Type Deleted Saga

function* getTypeDeletedSaga(action) {
  try {
    const result = yield axios.get("http://localhost:3500/types", {
      params: {
        isDelete: true,
      },
    });
    yield put(getTypeDeletedSuccess({ data: result.data }));
  } catch (e) {
    yield put(getTypeDeletedFail({ error: "Lỗi" }));
  }
}

//Update Type Saga

function* updateTypeSaga(action) {
  try {
    const { id, data, callback } = action.payload;
    yield axios.patch(`http://localhost:3500/types/${id}`, data);
    yield callback();
    yield put(updateTypeSuccess());
  } catch (e) {
    yield put(updateTypeFail({ error: "Lỗi" }));
  }
}

//Delete Type Saga

function* deleteTypeSaga(action) {
  try {
    const { id, status, callback } = action.payload;
    yield axios.patch(`http://localhost:3500/types/${id}`, {
      isDelete: status,
    });
    yield callback();
    yield put(deleteTypeSuccess());
  } catch (e) {
    yield put(deleteTypeFail({ error: "Lỗi" }));
  }
}

export default function* TypeSaga() {
  yield takeEvery(createTypeRequest, createTypeSaga);
  yield takeEvery(getTypeRequest, getTypeSaga);
  yield takeEvery(getTypeDeletedRequest, getTypeDeletedSaga);
  yield takeEvery(updateTypeRequest, updateTypeSaga);
  yield takeEvery(deleteTypeRequest, deleteTypeSaga);
}
