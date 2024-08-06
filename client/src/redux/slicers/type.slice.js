import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  typeList: {
    data: [],
    deleted: [],
    meta: {},
    loading: false,
    error: null,
  },
};

export const typeSlice = createSlice({
  name: "type",
  initialState: initialState,
  reducers: {
    //Create Type

    createTypeRequest: (state, action) => {
      state.typeList.loading = true;
      state.typeList.error = null;
    },
    createTypeSuccess: (state, action) => {
      state.typeList.loading = false;
      state.typeList.error = null;
    },
    createTypeFail: (state, action) => {
      const { error } = action.payload;
      state.typeList.error = error;
      state.typeList.loading = false;
    },

    //Get Type

    getTypeRequest: (state, action) => {
      state.typeList.loading = true;
      state.typeList.error = null;
    },
    getTypeSuccess: (state, action) => {
      const { data } = action.payload;
      state.typeList.data = data;
      state.typeList.loading = false;
      state.typeList.error = null;
    },
    getTypeFail: (state, action) => {
      const { error } = action.payload;
      state.typeList.error = error;
      state.typeList.loading = false;
    },

    //Update Type

    updateTypeRequest: (state, action) => {
      state.typeList.loading = true;
      state.typeList.error = null;
    },
    updateTypeSuccess: (state, action) => {
      state.typeList.loading = false;
      state.typeList.error = null;
    },
    updateTypeFail: (state, action) => {
      const { error } = action.payload;
      state.typeList.error = error;
      state.typeList.loading = false;
    },

    //Delete Type

    deleteTypeRequest: (state, action) => {
      state.typeList.loading = true;
      state.typeList.error = null;
    },
    deleteTypeSuccess: (state, action) => {
      state.typeList.loading = false;
      state.typeList.error = null;
    },
    deleteTypeFail: (state, action) => {
      const { error } = action.payload;
      state.typeList.error = error;
      state.typeList.loading = false;
    },

    //Get Type Deleted

    getTypeDeletedRequest: (state, action) => {
      state.typeList.loading = true;
      state.typeList.error = null;
    },
    getTypeDeletedSuccess: (state, action) => {
      const { data } = action.payload;
      state.typeList.deleted = data;
      state.typeList.loading = false;
      state.typeList.error = null;
    },
    getTypeDeletedFail: (state, action) => {
      const { error } = action.payload;
      state.typeList.error = error;
      state.typeList.loading = false;
    },
  },
});

export const {
  getTypeRequest,
  getTypeSuccess,
  getTypeFail,
  createTypeRequest,
  createTypeSuccess,
  createTypeFail,
  updateTypeRequest,
  updateTypeSuccess,
  updateTypeFail,
  deleteTypeRequest,
  deleteTypeSuccess,
  deleteTypeFail,
  getTypeDeletedRequest,
  getTypeDeletedSuccess,
  getTypeDeletedFail,
} = typeSlice.actions;

export default typeSlice.reducer;
