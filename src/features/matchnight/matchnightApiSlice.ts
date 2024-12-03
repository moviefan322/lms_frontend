import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RootState } from "../../app/store"
import type { MatchNight } from "../../types/redux"

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/league/`

export const matchnightApi = createApi({
  reducerPath: "matchnightApi",
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
  tagTypes: ["MatchNight", "TeamSeason", "Schedule", "Season", "Test"],
  endpoints: builder => ({
    createMatchnight: builder.mutation<
      MatchNight,
      { leagueId: number; scheduleId: number } & Partial<MatchNight>
    >({
      query: ({ leagueId, scheduleId, ...matchnightData }) => ({
        url: `/${leagueId}/schedules/${scheduleId}/matchnights/`,
        method: "POST",
        body: matchnightData,
      }),
      invalidatesTags: ["MatchNight"],
    }),
    fetchMatchnights: builder.query<
      MatchNight[],
      { leagueId: number; scheduleId: number }
    >({
      query: ({ leagueId, scheduleId }) =>
        `/${leagueId}/schedules/${scheduleId}/matchnights/`,
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "MatchNight", id }) as const),
              { type: "MatchNight", id: "LIST" },
            ]
          : [{ type: "MatchNight", id: "LIST" }],
    }),
    fetchMatchnight: builder.query<
      MatchNight,
      { leagueId: number; scheduleId: number; matchnightId: number }
    >({
      query: ({ leagueId, scheduleId, matchnightId }) =>
        `/${leagueId}/schedules/${scheduleId}/matchnights/${matchnightId}/`,
      // providesTags: (result, error, { matchnightId }) => [
      //   { type: "MatchNight", id: matchnightId },
      //   { type: "MatchNight", id: "LIST" },
      // ],
      providesTags: ["Test"],
    }),

    updateMatchnight: builder.mutation<
      MatchNight,
      {
        leagueId: number
        scheduleId: number
        matchnightId: number
      } & Partial<MatchNight>
    >({
      query: ({ leagueId, scheduleId, matchnightId, ...matchnightData }) => ({
        url: `/${leagueId}/schedules/${scheduleId}/matchnights/${matchnightId}/`,
        method: "PATCH",
        body: matchnightData,
      }),
      invalidatesTags: ["MatchNight", "TeamSeason", "Schedule", "Season"],
    }),
    deleteMatchnight: builder.mutation<
      void,
      { leagueId: number; scheduleId: number; matchnightId: number }
    >({
      query: ({ leagueId, scheduleId, matchnightId }) => ({
        url: `/${leagueId}/schedules/${scheduleId}/matchnights/${matchnightId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["MatchNight"],
    }),
  }),
})

export const {
  useCreateMatchnightMutation,
  useFetchMatchnightsQuery,
  useFetchMatchnightQuery,
  useUpdateMatchnightMutation,
  useDeleteMatchnightMutation,
} = matchnightApi
