import { useState } from "react"
import { useFetchLeaguesQuery, useDeleteLeagueMutation } from "../../features/league/leagueApiSlice"
import CreateLeague from "./CreateLeague"
import LeagueDetail from "./LeagueDetail"

const League = () => {
  const [showLeagueDetails, setShowLeagueDetails] = useState(null)
  const { data, error, isLoading } = useFetchLeaguesQuery()
  const [deleteLeague] = useDeleteLeagueMutation()
  const tokenFromLocalStorage = localStorage.getItem("token")

  const handleDelete = async (id: number) => {
    try {
      await deleteLeague(id).unwrap()
    } catch (error) {
      console.error("Failed to delete league:", error)
    }
  }

  const renderErrorMessage = () => {
    if (error) {
      if ('status' in error) {
        // Check if error has a status property (e.g., server error)
        return <p>Error {error.status}: {JSON.stringify(error.data)}</p>
      } else {
        // Handle other types of errors, like network errors
        return <p>An unexpected error occurred: {error.message}</p>
      }
    }
    return null
  }

  return (
    <>
      <div>
        {isLoading && <p>Loading...</p>}
        {renderErrorMessage()}

        {tokenFromLocalStorage && (
          <p>Token from local storage: {tokenFromLocalStorage}</p>
        )}
        {data && (
          <ul>
            {data.map((league: any) => (
              <li key={league.id}>
                <button onClick={() => setShowLeagueDetails(league.id)}>{league.name}</button> 
                <button onClick={() => handleDelete(league.id)}>X</button>
                {showLeagueDetails === league.id && <LeagueDetail id={league.id} />}
              </li>
            ))}
          </ul>
        )}
      </div>
      -----
      <div>
        <CreateLeague />
      </div>
    </>
  )
}

export default League
