import { useState } from "react"
import {
  useFetchLeaguesQuery,
  useDeleteLeagueMutation,
} from "../../features/league/leagueApiSlice"
import CreateLeague from "./CreateLeague"
import LeagueDetail from "./LeagueDetail"

const League = () => {
  const [showLeagueDetails, setShowLeagueDetails] = useState(null)
  const { data, error, isLoading } = useFetchLeaguesQuery(null)
  const [deleteLeague] = useDeleteLeagueMutation()

  const handleDelete = async (id: number) => {
    try {
      await deleteLeague(id).unwrap()
    } catch (error) {
      console.error("Failed to delete league:", error)
    }
  }

  console.log(data)
  console.log(error)
  return (
    <>
      <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error!</p>}

        {data && (
          <ul>
            {data.map((league: any) => (
              <li key={league.id}>
                <button onClick={() => setShowLeagueDetails(league.id)}>
                  {league.name}
                </button>{" "}
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
