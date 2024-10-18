import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import type { AuthState } from "../../types/redux"

// Initialize token from localStorage if available
let token: string | null = null
if (typeof window !== "undefined") {
  token = localStorage.getItem("token") ?? null
}

const initialState: AuthState = {
  loading: false,
  email: null,
  name: null,
  token,
  error: null,
  success: false,
  isLoggedIn: !!token,
  isNewData: false,
}

export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: create => ({
    setToken: create.reducer((state, action: PayloadAction<string>) => {
      state.token = action.payload
      state.isLoggedIn = true
      localStorage.setItem("token", action.payload)
    }),
    logout: create.reducer(state => {
      state.token = null
      state.email = null
      state.name = null
      state.isLoggedIn = false
      localStorage.removeItem("token")
    }),
    setUserDetails: create.reducer(
      (state, action: PayloadAction<{ email: string; name: string }>) => {
        state.email = action.payload.email
        state.name = action.payload.name
      },
    ),
    setError: create.reducer((state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.loading = false
    }),
    setLoading: create.reducer((state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    }),
  }),
  selectors: {
    selectIsLoggedIn: state => state.isLoggedIn,
    selectAuthError: state => state.error,
    selectAuthLoading: state => state.loading,
  },
})

export const { setToken, logout, setUserDetails, setError, setLoading } =
  authSlice.actions
export const { selectIsLoggedIn, selectAuthError, selectAuthLoading } =
  authSlice.selectors

export default authSlice.reducer
