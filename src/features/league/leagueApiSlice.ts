import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RootState } from "../../app/store"
import type { League, Season, Schedule } from "../../types/redux"

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
    fetchSeasons: builder.query<Season[], number>({
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
    fetchSeasonById: builder.query<
      Season,
      { leagueId: number; seasonId: number }
    >({
      query: ({ leagueId, seasonId }) => `/${leagueId}/seasons/${seasonId}/`,
      providesTags: ["Season"],
    }),
    updateSeason: builder.mutation<
      Season,
      { leagueId: number; seasonId: number } & Partial<Season>
    >({
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
    createSchedule: builder.mutation<
      Schedule,
      { leagueId: number; seasonId: number } & Partial<Schedule>
    >({
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
    fetchScheduleById: builder.query<
      Schedule,
      { leagueId: number; seasonId: number; scheduleId: number }
    >({
      query: ({ leagueId, seasonId, scheduleId }) =>
        `/${leagueId}/seasons/${seasonId}/schedule/${scheduleId}/`,
      providesTags: ["Season"],
    }),
    updateSchedule: builder.mutation<
      Schedule,
      {
        leagueId: number
        seasonId: number
        scheduleId: number
      } & Partial<Schedule>
    >({
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
