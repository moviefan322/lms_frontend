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
  tagTypes: ["Schedule"],
  endpoints: builder => ({
    createSchedule: builder.mutation<Schedule, { leagueId: number; seasonId: number } & Partial<Schedule>>({
      query: ({ leagueId, seasonId, ...scheduleData }) => ({
        url: `/${leagueId}/seasons/${seasonId}/schedule/`,
        method: "POST",
        body: scheduleData,
      }),
      invalidatesTags: ["Schedule"],
    }),
    fetchScheduleById: builder.query<Schedule, { leagueId: number; seasonId: number; scheduleId: number }>({
      query: ({ leagueId, seasonId, scheduleId }) => `/${leagueId}/seasons/${seasonId}/schedule/${scheduleId}/`,
      providesTags: ["Schedule"],
    }),
    updateSchedule: builder.mutation<Schedule, { leagueId: number; seasonId: number; scheduleId: number } & Partial<Schedule>>({
      query: ({ leagueId, seasonId, scheduleId, ...scheduleData }) => ({
        url: `/${leagueId}/seasons/${seasonId}/schedule/${scheduleId}/`,
        method: "PUT",
        body: scheduleData,
      }),
      invalidatesTags: ["Schedule"],
    }),
    deleteSchedule: builder.mutation({
      query: ({ leagueId, seasonId, scheduleId }) => ({
        url: `/${leagueId}/seasons/${seasonId}/schedule/${scheduleId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Schedule"],
    }),
  }),
})

export const { useCreateScheduleMutation, useFetchScheduleByIdQuery, useUpdateScheduleMutation, useDeleteScheduleMutation } = scheduleApi
