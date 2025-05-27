import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DateParam } from "use-query-params";

export const backendApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fullmetalserver.onrender.com",
    // baseUrl: "http://localhost:3000",
  }),
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (formData) => ({
        url: "/user/signin",
        method: "POST",
        body: formData,
      }),
    }),
    register: builder.mutation({
      query: (formData) => {
        return {
          url: "/user/signup",
          method: "POST",
          body: formData,
        };
      },
    }),
    createList: builder.mutation({
      query: ([watchlistData, id]) => {
        return {
          url: `/watchlist/${id}`,
          method: "POST",
          body: watchlistData,
        };
      },
    }),
    getList: builder.query({
      query: (id) => `/watchlist/${id}`,
    }),
  }),
});

export const {
  useLogInMutation,
  useRegisterMutation,
  useCreateListMutation,
  useLazyGetListQuery,
} = backendApi;
