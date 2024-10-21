import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RootState } from "../../app/store"

const baseUrl = import.meta.env.VITE_BACKEND_URL
  ? `${import.meta.env.VITE_BACKEND_URL}/api/league/`
  : "http://localhost:8000/api/league/"

export const leagueApi = createApi({
  reducerPath: "leagueApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState
      const token = state.auth.token
      if (token) {
        headers.set("Authorization", `Token ${token}`)
        console.log("Token being sent:", token)
        console.log("Headers being sent:", headers)
      }

      return headers
    },
  }),
  tagTypes: ["League"],
  endpoints: builder => ({
    fetchLeagues: builder.query({
      query: () => "/",
      providesTags: ["League"],
    }),
    fetchLeagueById: builder.query({
      query: id => `/${id}/`,
      providesTags: ["League"],
    }),
    createLeague: builder.mutation({
      query: leagueData => ({
        url: "/",
        method: "POST",
        body: leagueData,
      }),
      invalidatesTags: ["League"],
    }),
    updateLeague: builder.mutation({
      query: ({ id, ...leagueData }) => ({
        url: `/${id}/`,
        method: "PUT",
        body: leagueData,
      }),
      invalidatesTags: ["League"],
    }),
    deleteLeague: builder.mutation({
      query: id => ({
        url: `/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["League"],
    }),
    createSeason: builder.mutation({
      query: ({ id, ...seasonData }) => ({
        url: `/${id}/seasons/`,
        method: "POST",
        body: seasonData,
      }),
      invalidatesTags: ["League"],
    }),
  }),
})

export const {
  useFetchLeaguesQuery,
  useFetchLeagueByIdQuery,
  useCreateLeagueMutation,
  useUpdateLeagueMutation,
  useDeleteLeagueMutation,
  useCreateSeasonMutation,
} = leagueApi
