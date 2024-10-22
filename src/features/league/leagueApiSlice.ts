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
  tagTypes: ["League", "Season"],
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
    fetchSeasons: builder.query({
      query: id => `/${id}/seasons/`,
      providesTags: ["Season"],
    }),
    createSeason: builder.mutation({
      query: ({ id, ...seasonData }) => ({
        url: `/${id}/seasons/`,
        method: "POST",
        body: seasonData,
      }),
      invalidatesTags: ["League", "Season"],
    }),
    fetchSeasonById: builder.query({
      query: ({ leagueId, seasonId }) => `/${leagueId}/seasons/${seasonId}/`,
      providesTags: ["Season"],
    }),
    updateSeason: builder.mutation({
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
    createSchedule: builder.mutation({
      query: ({ leagueId, seasonId, ...scheduleData }) => ({
        url: `/${leagueId}/seasons/${seasonId}/schedule/`,
        method: "POST",
        body: scheduleData,
      }),
      invalidatesTags: ["Season"],
    }),
    fetchSeasonSchedules: builder.query({
      query: ({ leagueId, seasonId }) =>
        `/${leagueId}/seasons/${seasonId}/schedule/`,
      providesTags: ["Season"],
    }),
    fetchScheduleById: builder.query({
      query: ({ leagueId, seasonId, scheduleId }) =>
        `/${leagueId}/seasons/${seasonId}/schedule/${scheduleId}/`,
      providesTags: ["Season"],
    }),
    updateSchedule: builder.mutation({
      query: ({ leagueId, seasonId, scheduleId, ...scheduleData }) => ({
        url: `/${leagueId}/seasons/${seasonId}/schedule/${scheduleId}/`,
        method: "PUT",
        body: scheduleData,
      }),
      invalidatesTags: ["Season"],
    }),
    partialUpdateSchedule: builder.mutation({
      query: ({ leagueId, seasonId, scheduleId, ...scheduleData }) => ({
        url: `/${leagueId}/seasons/${seasonId}/schedule/${scheduleId}/`,
        method: "PATCH",
        body: scheduleData,
      }),
      invalidatesTags: ["Season"],
    }),
    deleteSchedule: builder.mutation({
      query: ({ leagueId, seasonId, scheduleId }) => ({
        url: `/${leagueId}/seasons/${seasonId}/schedule/${scheduleId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Season"],
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
  useFetchSeasonsQuery,
  useFetchSeasonByIdQuery,
  useUpdateSeasonMutation,
  useDeleteSeasonMutation,
  useCreateScheduleMutation,
  useFetchSeasonSchedulesQuery,
  useFetchScheduleByIdQuery,
  useUpdateScheduleMutation,
  usePartialUpdateScheduleMutation,
  useDeleteScheduleMutation,
} = leagueApi
