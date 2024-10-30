import { useState } from "react"
import { useParams } from "react-router-dom"
import { useFetchSeasonByIdQuery } from "../../features/season/seasonApiSlice"
import {
  useDeleteTeamSeasonMutation,
  useFetchTeamSeasonsQuery,
} from "../../features/teamseason/teamSeasonApiSlice"
import { useErrorHandling } from "../../hooks/useErrorHandling"
import EditTeam from "./EditTeam"
import AddTeam from "./AddTeam"

const ManageTeams = () => {
  const [showEdit, setShowEdit] = useState<number | null>(null) // Track the team ID for editing
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
    }
  }

  const toggleEdit = (id: number) => {
    setShowEdit(prevId => (prevId === id ? null : id)) // Toggle the edit form for the specific team
  }

  if (isLoading) return <p>Loading...</p>
  if (error) {
    console.error("Error fetching team seasons:", error)
    return errorMessage
  }

  console.log(data, seasonData)
  if (data && seasonData)
    return (
      <>
        <div className="container">
          <div>
            <h1>Manage Teams</h1>
            <p>Season: {seasonData.name}</p>
            <p>Year: {seasonData.year}</p>
          </div>
          <div>
            <button>Add Team</button>
            <AddTeam
              leagueId={parseInt(leagueId as string)}
              seasonId={parseInt(seasonId as string)}
            />
          </div>
          {data.length === 0 ? (
            <p>No teams available</p>
          ) : (
            <ul className="flex">
              {data.map((team: any) => (
                <li key={team.id} className="card">
                  <p>
                    {team.name} = {team.id}{" "}
                  </p>
                  <p> Capitan: {team.captain} </p>
                  <div>
                    <button onClick={() => toggleEdit(team.id)}>Edit</button>
                    <button onClick={() => handleDelete(team.id)}>X</button>
                  </div>
                  {showEdit === team.id && (
                    <EditTeam
                      leagueId={parseInt(leagueId as string)}
                      seasonId={parseInt(seasonId as string)}
                      teamId={team.id}
                      teamData={team}
                      setShowEdit={setShowEdit}
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
          <div></div>
        </div>
      </>
    )
}

export default ManageTeams
