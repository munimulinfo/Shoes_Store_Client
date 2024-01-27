import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userRegister: builder.mutation({
      query: (user) => ({
        url: "/user/create-user",
        method: "POST",
        body: user,
      }),
    }),
    userLogin: builder.mutation({
      query: (user) => {
        console.log(user, "inside base api");
        return {
          url: "/auth/user-login",
          method: "POST",
          body: user,
        };
      },
    }),
  }),
});

export const { useUserRegisterMutation, useUserLoginMutation } = authApi;
