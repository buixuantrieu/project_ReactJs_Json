import {
  getFavoriteRequest,
  getFavoriteSuccess,
  getFavoriteFail,
  addFavoriteRequest,
  addFavoriteSuccess,
  addFavoriteFail,
  unFavoriteRequest,
  unFavoriteSuccess,
  unFavoriteFail,
} from "../slicers/favorite.slice";

import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

//Get Favorite Saga

function* getFavoriteSaga(action) {
  try {
    const { useId } = action.payload;
    const result = yield axios.get("http://localhost:3500/favorites", {
      params: {
        userId: useId,
        _expand: "product",
      },
    });
    yield put(getFavoriteSuccess({ data: result.data }));
  } catch (e) {
    yield put(getFavoriteFail({ error: "error" }));
  }
}

function* addFavoriteSaga(action) {
  try {
    const { data, callback } = action.payload;

    yield axios.post("http://localhost:3500/favorites", data);
    yield callback();
    yield put(addFavoriteSuccess());
  } catch (e) {
    yield put(addFavoriteFail({ error: "error" }));
  }
}
function* unFavoriteSaga(action) {
  try {
    const { id, callback } = action.payload;
    yield axios.delete(`http://localhost:3500/favorites/${id}`);
    yield callback();
    yield put(unFavoriteSuccess());
  } catch (e) {
    yield put(unFavoriteFail({ error: "error" }));
  }
}

export default function* favoriteSaga() {
  yield takeEvery(getFavoriteRequest, getFavoriteSaga);
  yield takeEvery(addFavoriteRequest, addFavoriteSaga);
  yield takeEvery(unFavoriteRequest, unFavoriteSaga);
}
