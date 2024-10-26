import { useParams } from "react-router-dom"
import { useFetchSeasonByIdQuery } from "../../features/season/seasonApiSlice"
import { useErrorHandling } from "../../hooks/useErrorHandling"

const ManageTeams = () => {
  const { leagueId, seasonId } = useParams()
  const { data, error, isLoading } = useFetchSeasonByIdQuery({
    leagueId: parseInt(leagueId as string),
    seasonId: parseInt(seasonId as string),
  })
  const errorMessage = useErrorHandling(error as any)

  if (isLoading) return <p>Loading...</p>
  if (error) return errorMessage

  console.log(data)
  if (data)
    return (
      <>
        <div>
          <h1>Manage Teams</h1>
          <p>Season: {data.name}</p>
          <p>Year: {data.year}</p>
        </div>
        {data.teamseason.length === 0 ? (
          <p>No teams available</p>
        ) : (
          <ul>
            {data.teamseason.map((team: any) => (
              <li key={team.id}>
                <p>{team.name}</p>
              </li>
            ))}
          </ul>
        )}
      </>
    )
}

export default ManageTeams
