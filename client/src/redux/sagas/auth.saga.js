import { takeEvery, put } from "redux-saga/effects";
import { notification } from "antd";
import axios from "axios";

import {
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
  changeAvatarRequest,
  changeAvatarSuccess,
  changeAvatarFail,
  updateUserInfoRequest,
  updateUserInfoSuccess,
  updateUserInfoFail,
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,
  getUserRequest,
  getUserSuccess,
  getUserFailure,
  updateStatusUserRequest,
  updateStatusUserSuccess,
  updateStatusUserFailure,
} from "../slicers/auth.slice";

//Register SagaService
function* registerSaga(action) {
  try {
    const { data, callback } = action.payload;

    yield axios.post("http://localhost:3500/register", data);
    yield put(registerSuccess());
    yield notification.success({
      message: "RegisterSuccess,Please check your gmail to activate!",
    });
    yield callback(data.uid);
  } catch (e) {
    yield put(
      registerFail({
        error: e.response.data === "Email already exists" ? "Email already exists!" : e.response.data,
      })
    );
  }
}

//Active Saga

function* activeSaga(action) {
  try {
    const { uid } = action.payload;
    const result = yield axios.get(`http://localhost:3500/users?uid=${uid}`);
    yield axios.patch(`http://localhost:3500/users/${result.data[0].id}`, {
      status: "active",
    });
    yield put(activeSuccess());
  } catch (e) {
    yield put(activeFail({ error: "Lỗi" }));
  }
}

//Login Saga

function* loginSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post("http://localhost:3500/login", data);
    if (result.data.user.status === "UnActivated") {
      notification.error({ message: "Account is not activated!" });
    } else if (result.data.user.status === "lock") {
      notification.error({ message: "Account is locked!" });
    } else {
      yield localStorage.setItem("accessToken", result.data.accessToken);
      callback(result.data.user.role);
      yield put(loginSuccess({ data: result.data.user }));
      notification.success({ message: "Login Success" });
    }
  } catch (e) {
    yield put(loginFail({ error: "Email or password is incorrect!" }));
  }
}

//Forgot Password Saga

function* forgotPasswordSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.get(`http://localhost:3500/users`, {
      params: {
        email: data.email,
      },
    });
    if (result.data.length !== 0) {
      yield callback(result.data[0].uid);
      yield put(forgotPasswordSuccess());
      yield notification.success({ message: "Password change request successfully sent, please check your email" });
    } else {
      yield put(forgotPasswordFail({ error: "Wrong email!" }));
    }
  } catch (e) {
    yield put(forgotPasswordFail({ error: "Wrong email!" }));
  }
}

//Change Password Saga

function* newPasswordSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.get(`http://localhost:3500/users`, {
      params: {
        uid: data.uid,
      },
    });
    if (result.data.length !== 0) {
      yield axios.patch(`http://localhost:3500/users/${result.data[0].id}`, {
        password: data.newPassword,
      });
      yield put(newPasswordSuccess());
      yield notification.success({ message: "Update Password Success!" });
      yield callback();
    } else {
      yield put(newPasswordFail({ error: "Error!" }));
    }
  } catch (e) {
    yield put(newPasswordFail({ error: "Error!" }));
  }
}

//Get User Info Saga

function* getUserInfoSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:3500/users/${id}`);
    yield put(getUserInfoSuccess({ data: result.data }));
  } catch (e) {
    yield put(getUserInfoFail({ error: "Error!" }));
  }
}

//change Avatar Saga

function* changeAvatarSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.patch(`http://localhost:3500/users/${id}`, data);
    yield put(changeAvatarSuccess({ data: result.data }));
    notification.success({ message: "Update Avatar success" });
  } catch (e) {
    yield put(changeAvatarFail({ error: "Lỗi..." }));
  }
}
function* updateUserInfoSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.patch(`http://localhost:3500/users/${id}`, data);
    yield put(updateUserInfoSuccess({ data: result.data }));
    notification.success({ message: "Update User Info success!" });
  } catch (e) {
    yield put(updateUserInfoFail({ error: "Lỗi..." }));
  }
}

//change Password Saga
function* changePasswordSaga(action) {
  try {
    const { id, data, callback } = action.payload;
    yield axios.post("http://localhost:3500/login", {
      email: data.email,
      password: data.password,
    });
    const result = yield axios.patch(`http://localhost:3500/users/${id}`, {
      password: data.newPassword,
    });
    yield callback();
    notification.success({ message: "Update Password success!" });
    yield put(changePasswordSuccess({ data: result.data }));
  } catch (e) {
    yield put(changePasswordFailure({ error: "Lỗi" }));
  }
}
function* getUserSaga(action) {
  try {
    const result = yield axios.get("http://localhost:3500/users", {
      params: {
        role: "user",
      },
    });
    yield put(getUserSuccess({ data: result.data }));
  } catch (e) {
    yield put(getUserFailure({ error: "Lỗi..." }));
  }
}
function* updateStatusUserSaga(action) {
  try {
    const { data } = action.payload;
    yield axios.patch(`http://localhost:3500/users/${data.id}`, {
      status: data.status,
    });
    yield put(updateStatusUserSuccess());
    yield put(getUserRequest());
  } catch (e) {
    yield put(updateStatusUserFailure({ error: "Lỗi..." }));
  }
}

export default function* authSaga() {
  yield takeEvery(registerRequest, registerSaga);
  yield takeEvery(activeRequest, activeSaga);
  yield takeEvery(loginRequest, loginSaga);
  yield takeEvery(forgotPasswordRequest, forgotPasswordSaga);
  yield takeEvery(newPasswordRequest, newPasswordSaga);
  yield takeEvery(getUserInfoRequest, getUserInfoSaga);
  yield takeEvery(changeAvatarRequest, changeAvatarSaga);
  yield takeEvery(updateUserInfoRequest, updateUserInfoSaga);
  yield takeEvery(changePasswordRequest, changePasswordSaga);
  yield takeEvery(getUserRequest, getUserSaga);
  yield takeEvery(updateStatusUserRequest, updateStatusUserSaga);
}
