import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import commonReducer from "./redux/slicers/common.slice";
import categoryReducer from "./redux/slicers/category.slice";
import typeReducer from "./redux/slicers/type.slice";
import productReducer from "./redux/slicers/product.slice";
import authReducer from "./redux/slicers/auth.slice";
import sendMailReducer from "./redux/slicers/send-mail.slice";
import cartReducer from "./redux/slicers/cart.slice";
import favoriteReducer from "./redux/slicers/favorite.slice";
import reviewReducer from "./redux/slicers/review.slice";
import locationReducer from "./redux/slicers/location.slice";
import orderReducer from "./redux/slicers/order.slice";

import rootSaga from "./redux/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    common: commonReducer,
    category: categoryReducer,
    type: typeReducer,
    product: productReducer,
    auth: authReducer,
    mail: sendMailReducer,
    cart: cartReducer,
    favorite: favoriteReducer,
    review: reviewReducer,
    location: locationReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }),
    sagaMiddleware,
  ],
});
sagaMiddleware.run(rootSaga);
export default store;
