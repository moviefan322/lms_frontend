import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RootState } from "../../app/store"
import type { League } from "../../types/redux"

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/league/`

export const leagueApi = createApi({
  reducerPath: "leagueApi",
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
  tagTypes: ["League"],
  endpoints: builder => ({
    fetchLeagues: builder.query<League[], void>({
      query: () => "/",
      providesTags: ["League"],
    }),
    fetchLeagueById: builder.query<League, number>({
      query: id => `/${id}/`,
      providesTags: ["League"],
    }),
    createLeague: builder.mutation<League, Partial<League>>({
      query: leagueData => ({
        url: "/",
        method: "POST",
        body: leagueData,
      }),
      invalidatesTags: ["League"],
    }),
    updateLeague: builder.mutation<League, { id: number } & Partial<League>>({
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
  }),
})

export const { useFetchLeaguesQuery, useFetchLeagueByIdQuery, useCreateLeagueMutation, useUpdateLeagueMutation, useDeleteLeagueMutation } = leagueApi
