import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jikanApi = createApi({
  reducerPath: "jikanApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.jikan.moe/v4`,
  }),
  endpoints: (builder) => ({
    getTopAnimeByType: builder.query({
      query: ([type, page, limit]) =>
        `/top/anime?filter=${type}&type=tv&page=${page}&limit=${limit}&sfw`,
    }),
    getAnimePagesByType: builder.query({
      query: ([type, page]) => `/top/anime?type=${type}&page=${page}&sfw`,
    }),
    getUpcomingAnime: builder.query({
      query: ([page, limit]) =>
        `/seasons/upcoming?page=${page}&limit=${limit}&sfw&unapproved`,
    }),
    getTrendingAnime: builder.query({
      query: () => `/seasons/now?filter=tv&page=1&limit=10&sfw&unapproved`,
    }),
    getAnimeByStatus: builder.query({
      query: ([status, page, limit]) =>
        `/anime?status=${status}&page=${page}&limit=${limit}&sfw&unapproved`,
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
    getAnimeByGenre: builder.query({
      query: (genreId) => `/anime?genres=${genreId}&sfw&unapproved`,
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
  useGetUpcomingAnimeQuery,
  useGetTrendingAnimeQuery,
  useGetAnimeByGenreQuery,
} = jikanApi;
