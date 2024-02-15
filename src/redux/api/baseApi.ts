import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import {
  FetchArgs,
  BaseQueryApi,
  DefinitionType,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logOutUser, loginUser } from "../featuers/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    console.log("acces token fetch");
    const res = await fetch("http://localhost:5000/api/v1/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    //if Acces token  include result rether set new token state  or not token simply logout
    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(
        loginUser({
          user,
          token: data?.data?.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOutUser());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["shoes", "sells", "shoePolish"],
  endpoints: () => ({}),
});
