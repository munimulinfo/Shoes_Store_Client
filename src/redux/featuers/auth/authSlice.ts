import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //user login in to website
    loginUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    //user logout in to wesite
    logOutUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginUser, logOutUser } = authSlice.actions;
export default authSlice.reducer;

export const selectUser = (state: RootState) => state.auth.user;
