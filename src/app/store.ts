import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { counterSlice } from "../features/counter/counterSlice"
import { quotesApiSlice } from "../features/quotes/quotesApiSlice"
import { authSlice } from "../features/auth/authSlice"
import { authApi } from "../features/auth/authApiSlice" // Import RTK Query slice

// Combine all slices into the root reducer
const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  quotesApi: quotesApiSlice.reducer,
  auth: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer, // Add the RTK Query reducer for authApi
})

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
      // Add middleware for both RTK Query slices
      return getDefaultMiddleware().concat(
        quotesApiSlice.middleware,
        authApi.middleware,
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
