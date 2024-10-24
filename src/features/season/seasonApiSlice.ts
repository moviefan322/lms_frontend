import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RootState } from "../../app/store"
import type { Season } from "../../types/redux"

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/league/`

export const seasonApi = createApi({
  reducerPath: "seasonApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState
      const token = state.auth.token

      if (token) {
        headers.set("Authorization", `Token ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ["Season"],
  endpoints: builder => ({
    fetchSeasons: builder.query<Season[], number>({
      query: leagueId => `/${leagueId}/seasons/`,
      providesTags: ["Season"],
    }),
    fetchSeasonById: builder.query<Season, { leagueId: number; seasonId: number }>({
      query: ({ leagueId, seasonId }) => `/${leagueId}/seasons/${seasonId}/`,
      providesTags: ["Season"],
    }),
    createSeason: builder.mutation({
      query: ({ leagueId, ...seasonData }) => ({
        url: `/${leagueId}/seasons/`,
        method: "POST",
        body: seasonData,
      }),
      invalidatesTags: ["Season"],
    }),
    updateSeason: builder.mutation<Season, { leagueId: number; seasonId: number } & Partial<Season>>({
      query: ({ leagueId, seasonId, ...seasonData }) => ({
        url: `/${leagueId}/seasons/${seasonId}/`,
        method: "PUT",
        body: seasonData,
      }),
      invalidatesTags: ["Season"],
    }),
    deleteSeason: builder.mutation({
      query: ({ leagueId, seasonId }) => ({
        url: `/${leagueId}/seasons/${seasonId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Season"],
    }),
  }),
})

export const { useFetchSeasonsQuery, useFetchSeasonByIdQuery, useCreateSeasonMutation, useUpdateSeasonMutation, useDeleteSeasonMutation } = seasonApi
