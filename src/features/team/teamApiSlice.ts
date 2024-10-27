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
  tagTypes: ["Team"],
  endpoints: (builder) => ({
    // Fetch all teams
    fetchTeams: builder.query<Team[], number>({
      query: (leagueId) => `${leagueId}/teams/`,
      providesTags: ["Team"],
    }),

    // Fetch a single team by ID
    fetchTeamById: builder.query<Team, { leagueId: number; id: number }>({
      query: ({ leagueId, id }) => `${leagueId}/teams/${id}/`,
      providesTags: (result, error, { id }) => [{ type: "Team", id }],
    }),

    // Create a new team
    createTeam: builder.mutation<Team, { leagueId: number } & Partial<Team>>({
      query: ({ leagueId, ...teamData }) => ({
        url: `${leagueId}/teams/`,
        method: "POST",
        body: teamData,
      }),
      invalidatesTags: ["Team"],
    }),

    // Update a team by ID (full update)
    updateTeam: builder.mutation<
      Team,
      { leagueId: number; id: number } & Partial<Team>
    >({
      query: ({ leagueId, id, ...teamData }) => ({
        url: `${leagueId}/teams/${id}/`,
        method: "PUT",
        body: teamData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Team", id }],
    }),

    // Partially update a team by ID
    updateTeamPartial: builder.mutation<
      Team,
      { leagueId: number; id: number } & Partial<Team>
    >({
      query: ({ leagueId, id, ...teamData }) => ({
        url: `${leagueId}/teams/${id}/`,
        method: "PATCH",
        body: teamData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Team", id }],
    }),

    // Delete a team by ID
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
