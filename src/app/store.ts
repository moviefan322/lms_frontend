import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { authSlice } from "../features/auth/authSlice"
import { authApi } from "../features/auth/authApiSlice"
import { leagueApi } from "../features/league/leagueApiSlice"

// Combine all slices into the root reducer
const rootReducer = combineReducers({
  auth: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [leagueApi.reducerPath]: leagueApi.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
      // Add middleware for both RTK Query slices
      return getDefaultMiddleware().concat(
        authApi.middleware,
        leagueApi.middleware,
      )
    },
    preloadedState,
  })

  // Enable listener behavior for RTK Query (e.g., refetch on focus)
  setupListeners(store.dispatch)

  return store
}

export const store = makeStore()

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
