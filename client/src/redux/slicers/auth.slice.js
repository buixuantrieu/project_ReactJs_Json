import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registerData: {
    loading: false,
    error: null,
  },
  userInfo: {
    data: {},
    loading: true,
    error: null,
  },
  loginData: {
    loading: false,
    error: null,
  },
  updateUserInfoData: {
    loading: false,
    error: null,
  },
  newPasswordData: {
    load: false,
    error: null,
  },
  changePasswordData: {
    load: false,
    error: null,
  },
  changeAvatarData: {
    loading: false,
    error: null,
  },
  forgotPasswordData: {
    loading: false,
    error: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    // register

    registerRequest: (state) => {
      state.registerData.loading = true;
      state.registerData.error = null;
    },
    registerSuccess: (state, action) => {
      state.registerData.loading = false;
    },
    registerFail: (state, action) => {
      const { error } = action.payload;
      state.registerData.error = error;
      state.registerData.loading = false;
    },
    activeRequest: (state) => {
      state.registerData.loading = true;
      state.registerData.error = null;
    },
    activeSuccess: (state, action) => {
      state.registerData.loading = false;
    },
    activeFail: (state, action) => {
      const { error } = action.payload;
      state.registerData.error = error;
      state.registerData.loading = false;
    },

    // login

    loginRequest: (state) => {
      state.loginData.loading = true;
      state.loginData.error = null;
    },
    loginSuccess: (state, action) => {
      const { data } = action.payload;
      state.loginData.loading = false;
      state.userInfo.data = data;
      state.userInfo.loading = false;
    },
    loginFail: (state, action) => {
      const { error } = action.payload;
      state.loginData.error = error;
      state.loginData.loading = false;
    },

    // forgot Password

    forgotPasswordRequest: (state) => {
      state.forgotPasswordData.loading = true;
      state.forgotPasswordData.error = null;
    },
    forgotPasswordSuccess: (state, action) => {
      state.forgotPasswordData.loading = false;
      state.forgotPasswordData.error = null;
    },
    forgotPasswordFail: (state, action) => {
      const { error } = action.payload;
      state.forgotPasswordData.error = error;
      state.forgotPasswordData.loading = false;
    },

    //change Password

    newPasswordRequest: (state) => {
      state.newPasswordData.loading = true;
      state.newPasswordData.error = null;
    },
    newPasswordSuccess: (state, action) => {
      state.newPasswordData.loading = false;
      state.newPasswordData.error = null;
    },
    newPasswordFail: (state, action) => {
      const { error } = action.payload;
      state.newPasswordData.error = error;
      state.newPasswordData.loading = false;
    },

    // getUserInfo

    getUserInfoRequest: (state) => {
      state.userInfo.loading = true;
      state.userInfo.error = null;
    },
    getUserInfoSuccess: (state, action) => {
      const { data } = action.payload;
      state.userInfo.loading = false;
      state.userInfo.data = data;
    },
    getUserInfoFail: (state, action) => {
      const { error } = action.payload;
      state.userInfo.error = error;
      state.userInfo.loading = false;
    },

    //Logout

    logoutRequest: (state, action) => {
      state.userInfo.data = {};
      localStorage.removeItem("accessToken");
    },

    // changeAvatar

    changeAvatarRequest: (state) => {
      state.changeAvatarData.loading = true;
      state.changeAvatarData.error = null;
    },
    changeAvatarSuccess: (state, action) => {
      const { data } = action.payload;
      state.changeAvatarData.loading = false;
      state.userInfo.data = data;
    },
    changeAvatarFail: (state, action) => {
      const { error } = action.payload;
      state.changeAvatarData.error = error;
      state.changeAvatarData.loading = false;
    },

    // updateUserInfo

    updateUserInfoRequest: (state) => {
      state.updateUserInfoData.loading = true;
      state.updateUserInfoData.error = null;
    },
    updateUserInfoSuccess: (state, action) => {
      const { data } = action.payload;
      state.updateUserInfoData.loading = false;
      state.userInfo.data = data;
    },
    updateUserInfoFail: (state, action) => {
      const { error } = action.payload;
      state.updateUserInfoData.error = error;
      state.updateUserInfoData.loading = false;
    },
    // changePassword
    changePasswordRequest: (state, action) => {
      state.changePasswordData.loading = true;
      state.changePasswordData.error = null;
    },
    changePasswordSuccess: (state, action) => {
      state.changePasswordData.loading = false;
    },
    changePasswordFailure: (state, action) => {
      const { error } = action.payload;
      state.changePasswordData.loading = false;
      state.changePasswordData.error = error;
    },
  },
});

export const {
  registerRequest,
  registerSuccess,
  registerFail,
  activeRequest,
  activeFail,
  activeSuccess,
  loginRequest,
  loginSuccess,
  loginFail,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFail,
  newPasswordRequest,
  newPasswordSuccess,
  newPasswordFail,
  getUserInfoRequest,
  getUserInfoSuccess,
  getUserInfoFail,
  logoutRequest,
  changeAvatarRequest,
  changeAvatarSuccess,
  changeAvatarFail,
  updateUserInfoRequest,
  updateUserInfoSuccess,
  updateUserInfoFail,
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,
} = authSlice.actions;

export default authSlice.reducer;
