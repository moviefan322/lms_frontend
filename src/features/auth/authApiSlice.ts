import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../app/store";
import { setToken, setUserDetails, setError, setLoading } from "./authSlice";

const baseUrl = import.meta.env.VITE_BACKEND_URL
  ? `${import.meta.env.VITE_BACKEND_URL}/api/user`
  : "http://localhost:8000/api/user";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }

      return headers;
    },
  }),
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("token", data.token); // Save token to localStorage
          dispatch(setToken(data.token)); // Store token in Redux state
          dispatch(setLoading(false));
        } catch (err) {
          dispatch(setError("Login failed"));
          dispatch(setLoading(false));
        }
      },
    }),
    getUserDetails: builder.query({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserDetails({ email: data.email, name: data.name }));
          dispatch(setLoading(false));
        } catch (err) {
          dispatch(setError("Failed to fetch user details"));
          dispatch(setLoading(false));
        }
      },
    }),
  }),
});

export const { useLoginMutation, useGetUserDetailsQuery } = authApi;
