import { baseApi } from "../../api/baseApi";

const sellsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSell: builder.mutation({
      query: (product) => {
        return {
          url: "/sells/add-sells",
          method: "POST",
          body: product,
        };
      },
      invalidatesTags: ["shoes"],
    }),
    getAllSell: builder.query({
      query: (params) => {
        return {
          url: "/sells/allsells",
          method: "GET",
          body: params,
        };
      },
    }),
  }),
});

export const { useAddSellMutation, useGetAllSellQuery } = sellsApi;
