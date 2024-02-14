import { baseApi } from "../../api/baseApi";
const shoesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShoesWithEmail: builder.query({
      query: ({
        name,
        quantity,
        price,
        releaseDate,
        brand,
        model,
        style,
        size,
        color,
        material,
      }) => {
        const params = new URLSearchParams();
        if (name) {
          params.append("name", name);
        }
        if (quantity) {
          params.append("quantity", quantity);
        }
        if (price) {
          params.append("price", price);
        }
        if (releaseDate) {
          params.append("releaseDate", releaseDate);
        }
        if (brand) {
          params.append("brand", brand);
        }
        if (model) {
          params.append("model", model);
        }
        if (style) {
          params.append("style", style);
        }
        if (color) {
          params.append("color", color);
        }
        if (material) {
          params.append("material", material);
        }
        if (size) {
          params.append("size", size);
        }

        return {
          url: `/shoes/get-shoes`,
          method: "GET",
          params: params,
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
    deleteMulltipleShoe: builder.mutation({
      query: (ids) => {
        return {
          url: `/shoes/mulltiple-delete-shoes`,
          method: "POST",
          body: ids,
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
  useDeleteMulltipleShoeMutation,
} = shoesApi;
