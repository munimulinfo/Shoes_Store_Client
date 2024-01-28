import { baseApi } from "../../api/baseApi";

const shoesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShoesWithEmail: builder.query({
      query: (email) => {
        return {
          url: `/shoes/get-shoes/${email}`,
          method: "GET",
        };
      },
      providesTags: ["shoes"],
    }),

    addShoes: builder.mutation({
      query: (shoe) => {
        console.log(shoe, "inside shoe api");
        return {
          url: "/shoes/add-shoes",
          method: "POST",
          body: shoe,
        };
      },
      invalidatesTags: ["shoes"],
    }),

    updateShoes: builder.mutation({
      query: (shoeInfo) => {
        return {
          url: `/shoes/update-shoes/${shoeInfo?.id}`,
          method: "PUT",
          body: shoeInfo?.shoe,
        };
      },
      invalidatesTags: ["shoes"],
    }),
    deleteShoe: builder.mutation({
      query: (id) => {
        console.log(id, "INSIDEBASE");
        return {
          url: `/shoes/delete-shoe/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["shoes"],
    }),
  }),
});

export const {
  useAddShoesMutation,
  useGetShoesWithEmailQuery,
  useUpdateShoesMutation,
  useDeleteShoeMutation,
} = shoesApi;
