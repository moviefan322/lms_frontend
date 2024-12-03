import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RootState } from "../../app/store"
import type { Match } from "../../types/redux"

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/league/`

export const matchApi = createApi({
  reducerPath: "matchApi",
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
  tagTypes: ["Match", "TeamSeason", "Season", "League"],
  endpoints: builder => ({
    // Fetch all matches for a specific season
    fetchMatches: builder.query<
      Match[],
      { leagueId: number; seasonId: number }
    >({
      query: ({ leagueId, seasonId }) =>
        `${leagueId}/seasons/${seasonId}/matches/`,
      providesTags: ["Match", "TeamSeason", "Season"],
    }),

    // Fetch a single match by ID
    fetchMatchById: builder.query<
      Match,
      { leagueId: number; seasonId: number; matchId: number }
    >({
      query: ({ leagueId, seasonId, matchId }) =>
        `${leagueId}/seasons/${seasonId}/matches/${matchId}/`,
      providesTags: ["Match", "TeamSeason", "Season"],
    }),

    // Create a new match
    createMatch: builder.mutation<
      Match,
      { leagueId: number; seasonId: number } & Partial<Match>
    >({
      query: ({ leagueId, seasonId, ...matchData }) => ({
        url: `${leagueId}/seasons/${seasonId}/matches/`,
        method: "POST",
        body: matchData,
      }),
      invalidatesTags: ["Match", "TeamSeason", "Season"],
    }),

    // Update a match by ID (full update)
    updateMatch: builder.mutation<
      Match,
      { leagueId: number; seasonId: number; matchId: number } & Partial<Match>
    >({
      query: ({ leagueId, seasonId, matchId, ...matchData }) => ({
        url: `${leagueId}/seasons/${seasonId}/matches/${matchId}/`,
        method: "PUT",
        body: matchData,
      }),
      invalidatesTags: ["Match", "TeamSeason", "Season"]
    }),

    // Partially update a match by ID
    updateMatchPartial: builder.mutation<
      Match,
      { leagueId: number; seasonId: number; matchId: number } & Partial<Match>
    >({
      query: ({ leagueId, seasonId, matchId, ...matchData }) => ({
        url: `${leagueId}/seasons/${seasonId}/matches/${matchId}/`,
        method: "PATCH",
        body: matchData,
      }),
      invalidatesTags: (result, error, { matchId }) => [
        { type: "Match", id: matchId },
        "TeamSeason",
        "Season",
      ],
    }),

    // Delete a match by ID
    deleteMatch: builder.mutation<
      void,
      { leagueId: number; seasonId: number; matchId: number }
    >({
      query: ({ leagueId, seasonId, matchId }) => ({
        url: `${leagueId}/seasons/${seasonId}/matches/${matchId}/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { matchId }) => [
        { type: "Match", id: matchId },
        "TeamSeason",
        "Season",
      ],
    }),
  }),
})

export const {
  useFetchMatchesQuery,
  useFetchMatchByIdQuery,
  useCreateMatchMutation,
  useUpdateMatchMutation,
  useUpdateMatchPartialMutation,
  useDeleteMatchMutation,
} = matchApi
