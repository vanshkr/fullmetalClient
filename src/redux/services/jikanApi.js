import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jikanApi = createApi({
  reducerPath: "jikanApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.jikan.moe/v4`,
  }),
  endpoints: (builder) => ({
    getTopAnimeByType: builder.query({
      query: ([type, page, limit]) =>
        `/top/anime?filter=${type}&type=tv&page=${page}&limit=${limit}`,
    }),
    getAnimePagesByType: builder.query({
      query: ([type, page]) => `/top/anime?type=${type}&page=${page}`,
    }),
    getAnimeByStatus: builder.query({
      query: ([status, page, limit]) =>
        `/anime?status=${status}&page=${page}&limit=${limit}`,
    }),
    getWatchRecentEpisodes: builder.query({
      query: () => `/watch/episodes`,
    }),
    getAnimeDetails: builder.query({
      query: (animeId) => `/anime/${animeId}/full`,
    }),
    getActorsDetails: builder.query({
      query: (animeId) => `/anime/${animeId}/characters`,
    }),
    getAnimeGenres: builder.query({
      query: () => `/genres/anime`,
    }),
    getAnimeWatch: builder.query({
      query: ([id, pageNumber]) => `/anime/${id}/episodes?page=${pageNumber}`,
    }),
  }),
});

export const {
  useGetAnimeDetailsQuery,
  useGetTopAnimeByTypeQuery,
  useGetWatchRecentEpisodesQuery,
  useGetActorsDetailsQuery,
  useGetAnimePagesByTypeQuery,
  useGetAnimeGenresQuery,
  useGetAnimeWatchQuery,
  useGetAnimeByStatusQuery,
} = jikanApi;
