import { useDeleteTeamPlayerMutation } from "../../features/teamplayer/teamPlayerApiSlice"
import { useFetchTeamPlayersQuery } from "../../features/teamplayer/teamPlayerApiSlice"
import { useParams } from "react-router-dom"
import type { TeamPlayer } from "../../types/redux"

interface TeamRosterProps {
  data: TeamPlayer[]
  teamSeasonId: number
}

const TeamRoster = (roster: TeamRosterProps) => {
  const { leagueId, seasonId } = useParams()
  const [deleteTeamPlayer, { isSuccess, isLoading, isError, error }] =
    useDeleteTeamPlayerMutation()

  const {
    data: teamPlayersData,
    error: teamPlayersError,
    isLoading: teamPlayersLoading,
  } = useFetchTeamPlayersQuery({
    leagueId: parseInt(leagueId as string),
    seasonId: parseInt(seasonId as string),
    teamSeasonId: roster.teamSeasonId,
  })

  const handleDelete = async (id: number) => {
    try {
      await deleteTeamPlayer({
        leagueId,
        seasonId,
        teamSeasonId: roster.teamSeasonId,
        id,
      }).unwrap()
    } catch (error) {
      console.error("Failed to delete team player:", error)
    }
  }

  if (teamPlayersLoading) return <p>Loading...</p>

  if (teamPlayersError) {
    console.error("Error fetching team players:", teamPlayersError)
    return <p>Error fetching team players</p>
  }

  return (
    <div>
      <h2>Team Roster</h2>
      <ul>
        {teamPlayersData.map((player: TeamPlayer) => (
          <div key={player.id}>
            <li>{player.name}</li>
            <button onClick={() => handleDelete(player.id)}>X</button>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default TeamRoster
