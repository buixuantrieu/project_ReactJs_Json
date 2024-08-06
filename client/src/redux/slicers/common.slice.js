import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeLight: true,
  isShowAdminSidebar: false,
  fileNameList: [],
  loading: false,
  error: null,
};

export const commonSlice = createSlice({
  name: "common",
  initialState: initialState,
  reducers: {
    //Set Theme

    setTheme: (state, action) => {
      state.themeLight = action.payload;
    },

    //Toggle Admin Sidebar

    toggleAdminSidebar: (state, action) => {
      state.isShowAdminSidebar = action.payload;
    },

    //Upload File

    uploadImageRequest: (state, action) => {},
    uploadImageSuccess: (state, action) => {
      const { filenames } = action.payload;
      state.fileNameList = filenames;
    },
    uploadImageFail: (state, action) => {
      const { error } = action.payload;
      state.loading = false;
      state.error = error;
    },
  },
});

export const { setTheme, toggleAdminSidebar, uploadImageRequest, uploadImageSuccess, uploadImageFail } =
  commonSlice.actions;

export default commonSlice.reducer;
