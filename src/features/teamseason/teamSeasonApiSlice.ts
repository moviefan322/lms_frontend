import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RootState } from "../../app/store"
import type { TeamSeason } from "../../types/redux"

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/league/`

export const teamSeasonApi = createApi({
  reducerPath: "teamSeasonApi",
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
  tagTypes: ["TeamSeason", "Season", "League"],
  endpoints: builder => ({
    // Fetch all team seasons
    fetchTeamSeasons: builder.query<
      TeamSeason[],
      { leagueId: number; seasonId: number }
    >({
      query: ({ leagueId, seasonId }) =>
        `${leagueId}/seasons/${seasonId}/teamseasons/`,
      providesTags: ["TeamSeason"],
    }),

    // Fetch a single team season by ID
    fetchTeamSeasonById: builder.query<
      TeamSeason,
      { leagueId: number; seasonId: number; id: number }
    >({
      query: ({ leagueId, seasonId, id }) =>
        `${leagueId}/seasons/${seasonId}/teamseasons/${id}/`,
      providesTags: (result, error, { id }) => [{ type: "TeamSeason", id }],
    }),

    // Create a new team season
    createTeamSeason: builder.mutation<
      TeamSeason,
      { leagueId: number; seasonId: number } & Partial<TeamSeason>
    >({
      query: ({ leagueId, seasonId, ...teamSeasonData }) => ({
        url: `${leagueId}/seasons/${seasonId}/teamseasons/`,
        method: "POST",
        body: teamSeasonData,
      }),
      invalidatesTags: (result, error, { seasonId }) => [
        { type: "TeamSeason" },
        { type: "Season", id: seasonId },
      ],
    }),

    // Update a team season by ID (full update)
    updateTeamSeason: builder.mutation<
      TeamSeason,
      { leagueId: number; seasonId: number; id: number } & Partial<TeamSeason>
    >({
      query: ({ leagueId, seasonId, id, ...teamSeasonData }) => ({
        url: `${leagueId}/seasons/${seasonId}/teamseasons/${id}/`,
        method: "PUT",
        body: teamSeasonData,
      }),
      invalidatesTags: (result, error, { seasonId }) => [
        { type: "TeamSeason" },
        { type: "Season", id: seasonId },
      ],
    }),

    // Update a team season by ID (partial update)
    updateTeamSeasonPartial: builder.mutation<
      TeamSeason,
      { leagueId: number; seasonId: number; id: number } & Partial<TeamSeason>
    >({
      query: ({ leagueId, seasonId, id, ...teamSeasonData }) => ({
        url: `${leagueId}/seasons/${seasonId}/teamseasons/${id}/`,
        method: "PATCH",
        body: teamSeasonData,
      }),
      invalidatesTags: (result, error, { seasonId }) => [
        { type: "TeamSeason" },
        { type: "Season", id: seasonId },
      ],
    }),

    // Delete a team season by ID
    deleteTeamSeason: builder.mutation<
      void,
      { leagueId: number; seasonId: number; id: number }
    >({
      query: ({ leagueId, seasonId, id }) => ({
        url: `${leagueId}/seasons/${seasonId}/teamseasons/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { seasonId }) => [
        { type: "TeamSeason" },
        { type: "Season", id: seasonId },
      ],
    }),
  }),
})

export const {
  useFetchTeamSeasonsQuery,
  useFetchTeamSeasonByIdQuery,
  useCreateTeamSeasonMutation,
  useUpdateTeamSeasonMutation,
  useUpdateTeamSeasonPartialMutation,
  useDeleteTeamSeasonMutation,
} = teamSeasonApi
