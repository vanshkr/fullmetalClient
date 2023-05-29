import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jikanApi = createApi({
  reducerPath: "jikanApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.jikan.moe/v4`,
  }),
  endpoints: (builder) => ({
    getTopAnimeByType: builder.query({
      query: (type) => `/top/anime?filter=${type}`,
    }),
    getLimitedTopAnimeByType: builder.query({
      query: ([type, lim]) => `/top/anime?filter=${type}&limit=${lim}`,
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
      query: () => `/genres/anime?filter=genres`,
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
  useGetLimitedTopAnimeByTypeQuery,
  useGetAnimeGenresQuery,
  useGetAnimeWatchQuery,
} = jikanApi;
