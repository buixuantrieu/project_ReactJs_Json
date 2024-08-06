import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

import { sendMailRequest, sendMailSuccess, sendMailFail } from "../slicers/send-mail.slice";

//SendMail Saga

function* sendMailSaga(action) {
  try {
    const { data } = action.payload;

    yield axios.post("http://localhost:4000/send-email", {
      email: data.email,
      html: data.html,
    });
    put(sendMailSuccess());
  } catch (e) {
    yield put(sendMailFail({ error: "error" }));
  }
}
export default function* categorySaga() {
  yield takeEvery(sendMailRequest, sendMailSaga);
}
