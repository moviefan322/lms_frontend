import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../app/store';

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}`;

export const teamPlayerApi = createApi({
  reducerPath: 'teamPlayerApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (token) {
        headers.set('Authorization', `Token ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchTeamPlayers: builder.query({
      query: ({ leagueId, seasonId, teamSeasonId }) =>
        `/api/league/${leagueId}/seasons/${seasonId}/teamseasons/${teamSeasonId}/teamplayers/`,
    }),
    createTeamPlayer: builder.mutation({
      query: ({ leagueId, seasonId, teamSeasonId, newTeamPlayer }) => ({
        url: `/api/league/${leagueId}/seasons/${seasonId}/teamseasons/${teamSeasonId}/teamplayers/`,
        method: 'POST',
        body: newTeamPlayer,
      }),
    }),
    fetchTeamPlayerById: builder.query({
      query: ({ leagueId, seasonId, teamSeasonId, id }) =>
        `/api/league/${leagueId}/seasons/${seasonId}/teamseasons/${teamSeasonId}/teamplayers/${id}/`,
    }),
    updateTeamPlayer: builder.mutation({
      query: ({ leagueId, seasonId, teamSeasonId, id, updatedTeamPlayer }) => ({
        url: `/api/league/${leagueId}/seasons/${seasonId}/teamseasons/${teamSeasonId}/teamplayers/${id}/`,
        method: 'PUT',
        body: updatedTeamPlayer,
      }),
    }),
    partialUpdateTeamPlayer: builder.mutation({
      query: ({ leagueId, seasonId, teamSeasonId, id, partialTeamPlayer }) => ({
        url: `/api/league/${leagueId}/seasons/${seasonId}/teamseasons/${teamSeasonId}/teamplayers/${id}/`,
        method: 'PATCH',
        body: partialTeamPlayer,
      }),
    }),
    deleteTeamPlayer: builder.mutation({
      query: ({ leagueId, seasonId, teamSeasonId, id }) => ({
        url: `/api/league/${leagueId}/seasons/${seasonId}/teamseasons/${teamSeasonId}/teamplayers/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useFetchTeamPlayersQuery,
  useCreateTeamPlayerMutation,
  useFetchTeamPlayerByIdQuery,
  useUpdateTeamPlayerMutation,
  usePartialUpdateTeamPlayerMutation,
  useDeleteTeamPlayerMutation,
} = teamPlayerApi;
