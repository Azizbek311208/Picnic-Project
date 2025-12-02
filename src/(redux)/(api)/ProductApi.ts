import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://690c8c2da6d92d83e84e3521.mockapi.io/",
  }),
  tagTypes: ["Products"],
  endpoints: (build) => ({
    fetchProducts: build.query({
      query: (searchValue: string = "") =>
        searchValue ? `/products?search=${searchValue}` : `/products`,
      providesTags: ["Products"],
    }),

    addProducts: build.mutation({
      query: (body) => ({
        url: `/products`,
        method: `POST`,
        body,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProducts: build.mutation({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: `DELETE`,
      }),
      invalidatesTags: ["Products"],
    }),
    editProduct: build.mutation({
      query: ({ id, ...rest }) => ({
        url: `/products/${id}`,
        method: `PUT`,
        body: rest,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useAddProductsMutation,
  useDeleteProductsMutation,
  useFetchProductsQuery,
  useEditProductMutation,
} = productApi;
