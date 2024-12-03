import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RootState } from "../../app/store"
import type { Team } from "../../types/redux"

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/league/`

export const teamApi = createApi({
  reducerPath: "teamApi",
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
  tagTypes: ["Team", "MatchNight", "Schedule", "Season", "TeamSeason"],
  endpoints: builder => ({
    fetchTeams: builder.query<Team[], number>({
      query: leagueId => `${leagueId}/teams/`,
      providesTags: ["Team"],
    }),
    fetchTeamById: builder.query<Team, { leagueId: number; id: number }>({
      query: ({ leagueId, id }) => `${leagueId}/teams/${id}/`,
      providesTags: ["Team"],
    }),
    createTeam: builder.mutation<Team, { leagueId: number } & Partial<Team>>({
      query: ({ leagueId, ...teamData }) => ({
        url: `${leagueId}/teams/`,
        method: "POST",
        body: teamData,
      }),
      invalidatesTags: ["Team"],
    }),
    updateTeam: builder.mutation<
      Team,
      { leagueId: number; id: number } & Partial<Team>
    >({
      query: ({ leagueId, id, ...teamData }) => ({
        url: `${leagueId}/teams/${id}/`,
        method: "PATCH",
        body: teamData,
      }),
      invalidatesTags: ["MatchNight", "Schedule", "Season", "TeamSeason", "Team"],
    }),
    updateTeamPartial: builder.mutation<
      Team,
      { leagueId: number; id: number } & Partial<Team>
    >({
      query: ({ leagueId, id, ...teamData }) => ({
        url: `${leagueId}/teams/${id}/`,
        method: "PATCH",
        body: teamData,
      }),
      invalidatesTags: ["MatchNight", "Schedule", "Season", "TeamSeason", "Team"],
    }),
    deleteTeam: builder.mutation<void, { leagueId: number; id: number }>({
      query: ({ leagueId, id }) => ({
        url: `${leagueId}/teams/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Team"],
    }),
  }),
})

export const {
  useFetchTeamsQuery,
  useFetchTeamByIdQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useUpdateTeamPartialMutation,
  useDeleteTeamMutation,
} = teamApi
