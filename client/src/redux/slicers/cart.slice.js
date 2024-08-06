import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartList: {
    data: [],
    loading: false,
    error: null,
  },
  cartSelect: {
    data: [],
    loading: false,
    error: null,
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    //Add Cart

    addCartRequest: (state, action) => {
      state.cartList.loading = true;
      state.cartList.error = null;
    },
    addCartSuccess: (state, action) => {
      state.cartList.loading = false;
      state.cartList.error = null;
    },
    addCartFail: (state, action) => {
      const { error } = action.payload;
      state.cartList.loading = false;
      state.cartList.error = error;
    },
    getCartRequest: (state, action) => {
      state.cartList.loading = true;
      state.cartList.error = null;
    },
    getCartSuccess: (state, action) => {
      const { data } = action.payload;
      state.cartList.data = data;
      state.cartList.loading = false;
      state.cartList.error = null;
    },
    getCartFail: (state, action) => {
      const { error } = action.payload;
      state.cartList.loading = false;
      state.cartList.error = error;
    },
    updateCartRequest: (state, action) => {
      state.cartList.loading = true;
      state.cartList.error = null;
    },
    updateCartSuccess: (state, action) => {
      state.cartList.loading = false;
      state.cartList.error = null;
    },
    updateCartFail: (state, action) => {
      const { error } = action.payload;
      state.cartList.loading = false;
      state.cartList.error = error;
    },
    deleteCartRequest: (state, action) => {
      state.cartList.loading = true;
      state.cartList.error = null;
    },
    deleteCartSuccess: (state, action) => {
      state.cartList.loading = false;
      state.cartList.error = null;
    },
    deleteCartFail: (state, action) => {
      const { error } = action.payload;
      state.cartList.loading = false;
      state.cartList.error = error;
    },
  },
});

export const {
  addCartRequest,
  addCartSuccess,
  addCartFail,
  getCartSuccess,
  getCartRequest,
  getCartFail,
  updateCartRequest,
  updateCartSuccess,
  updateCartFail,
  deleteCartRequest,
  deleteCartSuccess,
  deleteCartFail,
} = cartSlice.actions;

export default cartSlice.reducer;
