import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type Tuser = {
  name: string;
  email: string;
  role: string;
  userId: string;
  iat: number;
  exp: number;
};

type Tauth = {
  user: null | Tuser;
  token: null | string;
};

const initialState: Tauth = {
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
