import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    uid: null,
  },
  reducers: {
    login(state, action) {
      state.isLogin = true;
      state.uid = action.payload;
    },
    logout(state) {
      state.isLogin = false;
    },
  },
});
export const authActions = authSlice.actions;

export default authSlice;
