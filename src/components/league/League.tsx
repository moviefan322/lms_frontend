import { useState } from "react"
import {
  useFetchLeaguesQuery,
  useDeleteLeagueMutation,
} from "../../features/league/leagueApiSlice"

import CreateLeague from "./CreateLeague"
import LeagueDetail from "./LeagueDetail"
import ScheduleManager from "../schedule/ScheduleManager"

const League = () => {
  const [showLeagueDetails, setShowLeagueDetails] = useState(null)
  const {
    data: leagueData,
    error: leagueError,
    isLoading: leagueLoading,
  } = useFetchLeaguesQuery()
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
    if (leagueError) {
      if ("status" in leagueError) {
        // Check if leagueError has a status property (e.g., server leagueError)
        return (
          <p>
            Error {leagueError.status}: {JSON.stringify(leagueError.data)}
          </p>
        )
      } else {
        // Handle other types of leagueErrors, like network leagueErrors
        return <p>An unexpected leagueError occurred: {leagueError.message}</p>
      }
    }
    return null
  }

  console.log("leagueDATA= ", leagueData)
  console.log(leagueError)

  return (
    <>
      <div style={{ border: "1px solid red" }}>
        {leagueLoading && <p>Loading...</p>}
        {renderErrorMessage()}

        {tokenFromLocalStorage && (
          <p>Token from local storage: {tokenFromLocalStorage}</p>
        )}
        {leagueData && (
          <ul>
            {leagueData.map((league: any) => (
              <li key={league.id}>
                <button onClick={() => setShowLeagueDetails(league.id)}>
                  {league.name}
                </button>
                <button onClick={() => handleDelete(league.id)}>X</button>
                {showLeagueDetails === league.id && (
                  <div key={league.id}>
                    <LeagueDetail id={league.id} />
                    {league.seasons.map((season: any) => (
                      <ScheduleManager
                        key={league.id + ": " + season.id}
                        leagueId={league.id}
                        seasonId={season.id}
                      />
                    ))}
                  </div>
                )}
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
