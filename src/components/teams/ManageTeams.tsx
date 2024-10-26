import { useParams } from "react-router-dom"
import { useFetchSeasonByIdQuery } from "../../features/season/seasonApiSlice"
import {
  useDeleteTeamSeasonMutation,
  useFetchTeamSeasonsQuery,
} from "../../features/teamseason/teamSeasonApiSlice"
import { useErrorHandling } from "../../hooks/useErrorHandling"

const ManageTeams = () => {
  const { leagueId, seasonId } = useParams()
  const [deleteTeamSeason] = useDeleteTeamSeasonMutation()
  const { data: seasonData } = useFetchSeasonByIdQuery({
    leagueId: parseInt(leagueId as string),
    seasonId: parseInt(seasonId as string),
  })
  const { data, error, isLoading } = useFetchTeamSeasonsQuery(
    {
      leagueId: parseInt(leagueId as string),
      seasonId: parseInt(seasonId as string),
    },
    { refetchOnMountOrArgChange: true },
  )
  const errorMessage = useErrorHandling(error as any)

  const handleDelete = async (id: number) => {
    try {
      await deleteTeamSeason({
        leagueId: parseInt(leagueId as string),
        seasonId: parseInt(seasonId as string),
        id,
      }).unwrap()
    } catch (error) {
      console.error("Failed to delete team season:", error)
      console.log(
        `Deleting at: ${leagueId}/seasons/${seasonId}/teamseasons/${id}/`,
      )
    }
  }

  if (isLoading) return <p>Loading...</p>
  if (error) {
    console.error("Error fetching team seasons:", error)

    return errorMessage
  }

  if (data && seasonData)
    return (
      <>
        <div>
          <h1>Manage Teams</h1>
          <p>Season: {seasonData.name}</p>
          <p>Year: {seasonData.year}</p>
        </div>
        {data.length === 0 ? (
          <p>No teams available</p>
        ) : (
          <ul>
            {data.map((team: any) => (
              <li key={team.id}>
                <p>
                  {team.name} = {team.id} <button>Edit</button>
                  <button onClick={() => handleDelete(team.id)}>X</button>
                </p>
              </li>
            ))}
          </ul>
        )}
      </>
    )
}

export default ManageTeams
