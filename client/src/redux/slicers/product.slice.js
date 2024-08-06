import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: {
    data: [],
    deleted: [],
    meta: {},
    loading: false,
    error: null,
  },
  productDetail: {
    data: {},
    loading: false,
    error: null,
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    //Create Product

    createProductRequest: (state, action) => {
      state.productList.loading = true;
      state.productList.error = null;
    },
    createProductSuccess: (state, action) => {
      state.productList.loading = false;
      state.productList.error = null;
    },
    createProductFail: (state, action) => {
      const { error } = action.payload;
      state.productList.error = error;
      state.productList.loading = false;
    },

    //Get Product

    getProductRequest: (state, action) => {
      state.productList.loading = true;
      state.productList.error = null;
    },
    getProductSuccess: (state, action) => {
      const { data, more, meta } = action.payload;
      state.productList.data = more ? [...state.productList.data, ...data] : data;
      state.productList.meta = meta;
      state.productList.loading = false;
      state.productList.error = null;
    },
    getProductFail: (state, action) => {
      const { error } = action.payload;
      state.productList.error = error;
      state.productList.loading = false;
    },

    //Update Product

    updateProductRequest: (state, action) => {
      state.productList.loading = true;
      state.productList.error = null;
    },
    updateProductSuccess: (state, action) => {
      state.productList.loading = false;
      state.productList.error = null;
    },
    updateProductFail: (state, action) => {
      const { error } = action.payload;
      state.productList.error = error;
      state.productList.loading = false;
    },

    //Delete Product

    deleteProductRequest: (state, action) => {
      state.productList.loading = true;
      state.productList.error = null;
    },
    deleteProductSuccess: (state, action) => {
      state.productList.loading = false;
      state.productList.error = null;
    },
    deleteProductFail: (state, action) => {
      const { error } = action.payload;
      state.productList.error = error;
      state.productList.loading = false;
    },

    //Get Product Deleted

    getProductDeletedRequest: (state, action) => {
      state.productList.loading = true;
      state.productList.error = null;
    },
    getProductDeletedSuccess: (state, action) => {
      const { data } = action.payload;
      state.productList.deleted = data;
      state.productList.loading = false;
      state.productList.error = null;
    },
    getProductDeletedFail: (state, action) => {
      const { error } = action.payload;
      state.productList.error = error;
      state.productList.loading = false;
    },

    //Get Product Detail

    getProductDetailRequest: (state, action) => {
      state.productDetail.loading = true;
      state.productDetail.error = null;
    },
    getProductDetailSuccess: (state, action) => {
      const { data } = action.payload;
      state.productDetail = data;
      state.productDetail.loading = false;
      state.productDetail.error = null;
    },
    getProductDetailFail: (state, action) => {
      const { error } = action.payload;
      state.productDetail.error = error;
      state.productDetail.loading = false;
    },
  },
});

export const {
  getProductRequest,
  getProductSuccess,
  getProductFail,
  createProductRequest,
  createProductSuccess,
  createProductFail,
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
} = productSlice.actions;

export default productSlice.reducer;
