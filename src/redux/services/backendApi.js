import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const backendApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (formData) => ({
        url: '/user/signin',
        method: 'POST',
        body: formData,
      }),
    }),
    register: builder.mutation({
      query: (formData) => {
        console.log(formData)
        return{
        url: '/user/signup',
        method: 'POST',
        body: formData,
      }},
    }),
  }),
});

export const { useLogInMutation, useRegisterMutation } = backendApi;

// export const { usePrefetch } = backendApi.internalHooks;

// export const prefetchEndpoints = () => {
//   usePrefetch(backendApi.endpoints.signin);
//   usePrefetch(backendApi.endpoints.signup);
// };


