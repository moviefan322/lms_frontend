import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RootState } from "../../app/store"

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}`

export const playerApi = createApi({
  reducerPath: "playerApi",
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
  endpoints: builder => ({
    fetchPlayers: builder.query({
      query: () => "/api/player/",
    }),
    fetchPlayersByLeague: builder.query({
      query: leagueId => `/api/player/league/${leagueId}/`,
    }),
    createPlayer: builder.mutation({
      query: newPlayer => ({
        url: "/api/player/",
        method: "POST",
        body: newPlayer,
      }),
    }),
    fetchPlayerById: builder.query({
      query: id => `/api/player/${id}/`,
    }),
    updatePlayer: builder.mutation({
      query: ({ id, ...updatedPlayer }) => ({
        url: `/api/player/${id}/`,
        method: "PUT",
        body: updatedPlayer,
      }),
    }),
    partialUpdatePlayer: builder.mutation({
      query: ({ id, ...partialPlayer }) => ({
        url: `/api/player/${id}/`,
        method: "PATCH",
        body: partialPlayer,
      }),
    }),
    deletePlayer: builder.mutation({
      query: id => ({
        url: `/api/player/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useFetchPlayersQuery,
  useFetchPlayersByLeagueQuery,
  useCreatePlayerMutation,
  useFetchPlayerByIdQuery,
  useUpdatePlayerMutation,
  usePartialUpdatePlayerMutation,
  useDeletePlayerMutation,
} = playerApi
