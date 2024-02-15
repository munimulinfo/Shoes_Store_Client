import { baseApi } from "../../api/baseApi";

const sellsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSell: builder.query({
      query: ({ name }) => {
        const params = new URLSearchParams();
        if (name) {
          params.append("name", name);
        }
        return {
          url: "/sells/allsells",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["sells"],
    }),
    addSell: builder.mutation({
      query: (product) => {
        return {
          url: "/sells/add-sells",
          method: "POST",
          body: product,
        };
      },
      invalidatesTags: ["shoes", "sells"],
    }),
    deletSell: builder.mutation({
      query: (id) => {
        return {
          url: `/sells/delete-sells/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["sells"],
    }),
  }),
});

export const { useAddSellMutation, useGetAllSellQuery, useDeletSellMutation } =
  sellsApi;
