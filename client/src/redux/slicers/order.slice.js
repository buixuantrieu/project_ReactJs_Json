import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderList: {
    data: [],
    meta: {},
    loading: false,
    error: null,
  },
  orderProductData: {
    loading: false,
    error: null,
  },
};

export const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    // getOrderList
    getOrderListRequest: (state) => {
      state.orderList.loading = true;
      state.orderList.error = null;
    },
    getOrderListSuccess: (state, action) => {
      const { data } = action.payload;
      state.orderList.data = data;
      state.orderList.loading = false;
    },
    getOrderListFail: (state, action) => {
      const { error } = action.payload;
      state.orderList.error = error;
      state.orderList.loading = false;
    },

    // orderProduct
    orderProductRequest: (state) => {
      state.orderProductData.loading = true;
      state.orderProductData.error = null;
    },
    orderProductSuccess: (state) => {
      state.orderProductData.loading = false;
    },
    orderProductFail: (state, action) => {
      const { error } = action.payload;
      state.orderProductData.error = error;
      state.orderProductData.loading = false;
    },
    // updateOrderProduct
    updateOrderProductRequest: (state) => {
      state.orderProductData.loading = true;
      state.orderProductData.error = null;
    },
    updateOrderProductSuccess: (state) => {
      state.orderProductData.loading = false;
    },
    updateOrderProductFail: (state, action) => {
      const { error } = action.payload;
      state.orderProductData.error = error;
      state.orderProductData.loading = false;
    },
    // deleteOrderProduct
    deleteOrderProductRequest: (state) => {
      state.orderProductData.loading = true;
      state.orderProductData.error = null;
    },
    deleteOrderProductSuccess: (state) => {
      state.orderProductData.loading = false;
    },
    deleteOrderProductFail: (state, action) => {
      const { error } = action.payload;
      state.orderProductData.error = error;
      state.orderProductData.loading = false;
    },
  },
});

export const {
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
} = orderSlice.actions;

export default orderSlice.reducer;
