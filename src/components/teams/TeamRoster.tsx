import { useDeleteTeamPlayerMutation } from "../../features/teamplayer/teamPlayerApiSlice"
import { useFetchTeamPlayersQuery } from "../../features/teamplayer/teamPlayerApiSlice"
import { useParams } from "react-router-dom"
import type { TeamPlayer } from "../../types/redux"

interface TeamRosterProps {
  teamSeasonId: number
  setShowRoster: (show: boolean) => void
  showRoster: boolean
  name: string
}

const TeamRoster = ({
  teamSeasonId,
  setShowRoster,
  showRoster,
  name
}: TeamRosterProps) => {
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
    teamSeasonId: teamSeasonId,
  })

  const handleDelete = async (id: number) => {
    try {
      await deleteTeamPlayer({
        leagueId,
        seasonId,
        teamSeasonId: teamSeasonId,
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

  console.log('tpd', teamPlayersData)
  return (
    <div>
      <h2>{name} Roster</h2>
      <ul>
        {teamPlayersData.map((player: TeamPlayer) => (
          <div key={player.id}>
            <li className="list-nodec text-right">
              {player.name}{" "}
              <button onClick={() => handleDelete(player.id)}>X</button>
            </li>
          </div>
        ))}
      </ul>
      <br />
      <div className="flex-around">
        <button>Add Player</button>
        <button onClick={() => setShowRoster(!showRoster)}>Close</button>
      </div>
    </div>
  )
}

export default TeamRoster
