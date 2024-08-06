import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
};

export const sendMailSlice = createSlice({
  name: "send-mail",
  initialState: initialState,
  reducers: {
    //Send Mail

    sendMailRequest: (state, action) => {
      state.loading = true;
    },
    sendMailSuccess: (state, action) => {
      state.loading = false;
    },
    sendMailFail: (state, action) => {
      state.loading = false;
    },
  },
});

export const { sendMailRequest, sendMailSuccess, sendMailFail } = sendMailSlice.actions;

export default sendMailSlice.reducer;
