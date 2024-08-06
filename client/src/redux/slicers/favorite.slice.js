import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteList: {
    data: [],
    loading: false,
    error: null,
  },
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState: initialState,
  reducers: {
    //Add favorite

    addFavoriteRequest: (state, action) => {
      state.favoriteList.loading = true;
      state.favoriteList.error = null;
    },
    addFavoriteSuccess: (state, action) => {
      state.favoriteList.loading = false;
      state.favoriteList.error = null;
    },
    addFavoriteFail: (state, action) => {
      const { error } = action.payload;
      state.favoriteList.loading = false;
      state.favoriteList.error = error;
    },
    unFavoriteRequest: (state, action) => {
      state.favoriteList.loading = true;
      state.favoriteList.error = null;
    },
    unFavoriteSuccess: (state, action) => {
      state.favoriteList.loading = false;
      state.favoriteList.error = null;
    },
    unFavoriteFail: (state, action) => {
      const { error } = action.payload;
      state.favoriteList.loading = false;
      state.favoriteList.error = error;
    },
    getFavoriteRequest: (state, action) => {
      state.favoriteList.loading = true;
      state.favoriteList.error = null;
    },
    getFavoriteSuccess: (state, action) => {
      const { data } = action.payload;
      state.favoriteList.data = data;
      state.favoriteList.loading = false;
      state.favoriteList.error = null;
    },
    getFavoriteFail: (state, action) => {
      const { error } = action.payload;
      state.favoriteList.loading = false;
      state.favoriteList.error = error;
    },
  },
});

export const {
  addFavoriteFail,
  addFavoriteRequest,
  addFavoriteSuccess,
  getFavoriteRequest,
  getFavoriteSuccess,
  getFavoriteFail,
  unFavoriteRequest,
  unFavoriteSuccess,
  unFavoriteFail,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
