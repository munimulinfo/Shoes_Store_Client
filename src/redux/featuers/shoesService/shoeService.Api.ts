import { baseApi } from "../../api/baseApi";

const shoeServiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllShoePolishRequest: builder.query({
      query: () => {
        return {
          url: "/service/all-polishRequest",
          method: "GET",
        };
      },
      providesTags: ["shoePolish"],
    }),

    getShoePolishRequestwithEmail: builder.query({
      query: (email) => {
        return {
          url: `/service/polishRequest/${email}`,
          method: "GET",
        };
      },
      providesTags: ["shoePolish"],
    }),

    addShoePolishRequest: builder.mutation({
      query: (data) => {
        return {
          url: "/service/create-polishRequest",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["shoePolish"],
    }),
    updateShoePolishRequest: builder.mutation({
      query: (polishInfo) => {
        return {
          url: `/service/update-polishRequest/${polishInfo?.id}`,
          method: "PUT",
          body: polishInfo?.data,
        };
      },
      invalidatesTags: ["shoePolish"],
    }),
    deleteShoePolishRequest: builder.mutation({
      query: (id) => {
        return {
          url: `/service/delete-polishRequest/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["shoePolish"],
    }),
  }),
});

export const {
  useAddShoePolishRequestMutation,
  useGetShoePolishRequestwithEmailQuery,
  useGetAllShoePolishRequestQuery,
  useUpdateShoePolishRequestMutation,
  useDeleteShoePolishRequestMutation,
} = shoeServiceApi;
