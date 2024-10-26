import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"

export const useErrorHandling = (error?: FetchBaseQueryError) => {
  if (!error) return null

  if ("status" in error) {
    return (
      <p>
        Error {error.status}: {JSON.stringify(error.data)}
      </p>
    )
  }

  if (error && typeof error === "object" && "message" in error) {
    return (
      <p>
        An unexpected error occurred: {(error as { message: string }).message}
      </p>
    )
  }

  return <p>An unexpected error occurred.</p>
}
