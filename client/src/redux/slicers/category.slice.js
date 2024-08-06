import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryList: {
    data: [],
    deleted: [],
    meta: {},
    loading: false,
    error: null,
  },
};

export const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    //Create Category

    createCategoryRequest: (state, action) => {
      state.categoryList.loading = true;
      state.categoryList.error = null;
    },
    createCategorySuccess: (state, action) => {
      state.categoryList.loading = false;
      state.categoryList.error = null;
    },
    createCategoryFail: (state, action) => {
      const { error } = action.payload;
      state.categoryList.error = error;
      state.categoryList.loading = false;
    },

    //Get Category

    getCategoryRequest: (state, action) => {
      state.categoryList.loading = true;
      state.categoryList.error = null;
    },
    getCategorySuccess: (state, action) => {
      const { data } = action.payload;
      state.categoryList.data = data;
      state.categoryList.loading = false;
      state.categoryList.error = null;
    },
    getCategoryFail: (state, action) => {
      const { error } = action.payload;
      state.categoryList.error = error;
      state.categoryList.loading = false;
    },

    //Update Category

    updateCategoryRequest: (state, action) => {
      state.categoryList.loading = true;
      state.categoryList.error = null;
    },
    updateCategorySuccess: (state, action) => {
      state.categoryList.loading = false;
      state.categoryList.error = null;
    },
    updateCategoryFail: (state, action) => {
      const { error } = action.payload;
      state.categoryList.error = error;
      state.categoryList.loading = false;
    },

    //Delete Category

    deleteCategoryRequest: (state, action) => {
      state.categoryList.loading = true;
      state.categoryList.error = null;
    },
    deleteCategorySuccess: (state, action) => {
      state.categoryList.loading = false;
      state.categoryList.error = null;
    },
    deleteCategoryFail: (state, action) => {
      const { error } = action.payload;
      state.categoryList.error = error;
      state.categoryList.loading = false;
    },

    //Get Category Deleted

    getCategoryDeletedRequest: (state, action) => {
      state.categoryList.loading = true;
      state.categoryList.error = null;
    },
    getCategoryDeletedSuccess: (state, action) => {
      const { data } = action.payload;
      state.categoryList.deleted = data;
      state.categoryList.loading = false;
      state.categoryList.error = null;
    },
    getCategoryDeletedFail: (state, action) => {
      const { error } = action.payload;
      state.categoryList.error = error;
      state.categoryList.loading = false;
    },
  },
});

export const {
  getCategoryRequest,
  getCategorySuccess,
  getCategoryFail,
  createCategoryRequest,
  createCategorySuccess,
  createCategoryFail,
  updateCategoryRequest,
  updateCategorySuccess,
  updateCategoryFail,
  deleteCategoryRequest,
  deleteCategorySuccess,
  deleteCategoryFail,
  getCategoryDeletedRequest,
  getCategoryDeletedSuccess,
  getCategoryDeletedFail,
} = categorySlice.actions;

export default categorySlice.reducer;
