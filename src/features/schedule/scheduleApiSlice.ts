import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RootState } from "../../app/store"
import type { Schedule } from "../../types/redux"

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/league/`

export const scheduleApi = createApi({
  reducerPath: "scheduleApi",
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
  tagTypes: ["Schedule", "Season"],
  endpoints: builder => ({
    createSchedule: builder.mutation<
      Schedule,
      { leagueId: number; seasonId: number } & Partial<Schedule>
    >({
      query: ({ leagueId, seasonId, ...scheduleData }) => ({
        url: `/${leagueId}/seasons/${seasonId}/schedule/`,
        method: "POST",
        body: scheduleData,
      }),
      invalidatesTags: ["Schedule"],
    }),
    fetchSchedule: builder.query<
      Schedule,
      { leagueId: number; seasonId: number }
    >({
      query: ({ leagueId, seasonId }) =>
        `/${leagueId}/seasons/${seasonId}/schedule/`,
      providesTags: ["Schedule"],
    }),
    updateSchedulePartial: builder.mutation<
      Schedule,
      { leagueId: number; seasonId: number } & Partial<Schedule>
    >({
      query: ({ leagueId, seasonId, ...scheduleData }) => ({
        url: `/${leagueId}/seasons/${seasonId}/schedule/`,
        method: "PATCH",
        body: scheduleData,
      }),
      invalidatesTags: ["Schedule"],
    }),
    updateSchedule: builder.mutation<
      Schedule,
      { leagueId: number; seasonId: number } & Partial<Schedule>
    >({
      query: ({ leagueId, seasonId, ...scheduleData }) => ({
        url: `/${leagueId}/seasons/${seasonId}/schedule/`,
        method: "PUT",
        body: scheduleData,
      }),
      invalidatesTags: ["Schedule"],
    }),
    deleteSchedule: builder.mutation<
      void, // No response payload expected for DELETE
      { leagueId: number; seasonId: number; scheduleId: number } // Include scheduleId
    >({
      query: ({ leagueId, seasonId, scheduleId }) => ({
        url: `/${leagueId}/seasons/${seasonId}/schedule/${scheduleId}/`, // Include scheduleId
        method: "DELETE",
      }),
      invalidatesTags: ["Schedule"], // Invalidate schedule cache
    }),
    generateSchedule: builder.mutation<
      { message: string }, // Expected response: a message indicating success
      { scheduleId: number } // Parameters required to generate the schedule
    >({
      query: ({ scheduleId }) => ({
        url: `schedule/${scheduleId}/generate/`, // Endpoint for generating the schedule
        method: "POST", // The endpoint expects a POST request
      }),
      invalidatesTags: ["Schedule"], // Invalidate schedule cache to ensure data consistency
    }),
  }),
})

export const {
  useCreateScheduleMutation,
  useFetchScheduleQuery,
  useUpdateScheduleMutation,
  useUpdateSchedulePartialMutation,
  useDeleteScheduleMutation,
  useGenerateScheduleMutation,
} = scheduleApi
