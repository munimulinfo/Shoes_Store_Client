import { baseApi } from "../../api/baseApi";

const shoeCustomizedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCustomizedShoe: builder.query({
      query: () => {
        return {
          url: "/service/all-customizedShoes",
          method: "GET",
        };
      },
      providesTags: ["shoeCustomized"],
    }),

    getCustomizedShoewithEmail: builder.query({
      query: (email) => {
        return {
          url: `/service/buyer-customizedShoe/${email}`,
          method: "GET",
        };
      },
      providesTags: ["shoeCustomized"],
    }),

    addCustomizedShoeRequest: builder.mutation({
      query: (data) => {
        return {
          url: "/service/create-customizedShoe",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["shoeCustomized"],
    }),
    updateCustomizedShoeRequest: builder.mutation({
      query: (shoeInfo) => {
        return {
          url: `/service/update-customizedShoe/${shoeInfo?.id}`,
          method: "PUT",
          body: shoeInfo?.data,
        };
      },
      invalidatesTags: ["shoeCustomized"],
    }),
    deleteCustomizedShoeRequest: builder.mutation({
      query: (id) => {
        return {
          url: `/service/delet-customizedShoe/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["shoeCustomized"],
    }),
  }),
});

export const {
  useAddCustomizedShoeRequestMutation,
  useGetAllCustomizedShoeQuery,
  useDeleteCustomizedShoeRequestMutation,
  useGetCustomizedShoewithEmailQuery,
  useUpdateCustomizedShoeRequestMutation,
} = shoeCustomizedApi;
