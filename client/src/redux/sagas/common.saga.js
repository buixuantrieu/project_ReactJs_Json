import { uploadImageRequest, uploadImageSuccess, uploadImageFail } from "../slicers/common.slice";

import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

//Upload Image Saga

function* uploadImageSaga(action) {
  try {
    const { formData, callback, callbackTwo } = action.payload;
    const response = yield axios.post("http://localhost:4000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) {
      const { filenames } = yield response.data;
      yield put(uploadImageSuccess({ filenames }));
      yield callback(filenames);
      yield callbackTwo();
    }
  } catch (e) {
    yield put(uploadImageFail({ error: "Lỗi" }));
  }
}

export default function* imageSaga() {
  yield takeEvery(uploadImageRequest, uploadImageSaga);
}
