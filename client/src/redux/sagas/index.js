import { fork } from "redux-saga/effects";

import categorySaga from "./category.saga";
import commonSaga from "./common.saga";
import typeSaga from "./type.saga";
import productSaga from "./product.saga";
import authSaga from "./auth.saga";
import sendMailSaga from "./send-mail.saga";
import cartSaga from "./cart.saga";
import favoriteSaga from "./favorite.saga";
import reviewSaga from "./review.saga";
import locationSaga from "./location.saga";
import orderSaga from "./order.saga";

export default function* rootSaga() {
  yield fork(categorySaga);
  yield fork(commonSaga);
  yield fork(typeSaga);
  yield fork(productSaga);
  yield fork(authSaga);
  yield fork(sendMailSaga);
  yield fork(cartSaga);
  yield fork(favoriteSaga);
  yield fork(reviewSaga);
  yield fork(locationSaga);
  yield fork(orderSaga);
}
