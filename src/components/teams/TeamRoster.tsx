import { useEffect, useState } from "react"
import { useDeleteTeamPlayerMutation } from "../../features/teamplayer/teamPlayerApiSlice"
import {
  useFetchTeamPlayersQuery,
  useCreateTeamPlayerMutation,
} from "../../features/teamplayer/teamPlayerApiSlice"
import { useParams } from "react-router-dom"
import type { TeamPlayer } from "../../types/redux"
import { useErrorHandling } from "../../hooks/useErrorHandling"
import AddPlayer from "./AddPlayer"

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
  name,
}: TeamRosterProps) => {
  const [playerRes, setPlayerRes] = useState<any>(null)
  const [showAddPlayer, setShowAddPlayer] = useState(false)
  const { leagueId, seasonId } = useParams()
  const [deleteTeamPlayer, { isSuccess, isLoading, isError, error }] =
    useDeleteTeamPlayerMutation()
  const [
    createTeamPlayer,
    {
      isSuccess: isAddSuccess,
      isLoading: isAddLoading,
      isError: isAddError,
      error: addError,
    },
  ] = useCreateTeamPlayerMutation()
  const addErrorHandling = useErrorHandling(error as any)

  const {
    data: teamPlayersData,
    error: teamPlayersError,
    isLoading: teamPlayersLoading,
  } = useFetchTeamPlayersQuery({
    leagueId: parseInt(leagueId as string),
    seasonId: parseInt(seasonId as string),
    teamSeasonId: teamSeasonId,
  })

  const addNewTeamPlayer = async (playerId: number) => {
    console.log("Payload to send:", { player: playerId })
    try {
      await createTeamPlayer({
        leagueId: parseInt(leagueId as string),
        seasonId: parseInt(seasonId as string),
        teamSeasonId,
        newTeamPlayer: { player: playerId }, // wrap the payload as newTeamPlayer
      }).unwrap()
      console.log("Player added successfully")
    } catch (error) {
      console.error("Failed to add player:", error)
    }
  }

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

  useEffect(() => {
    if (playerRes) {
      console.log("playerRes before addteamP", playerRes)
      addNewTeamPlayer(playerRes)
    }
  }, [playerRes])

  useEffect(() => {
    if (isAddSuccess) {
      setShowAddPlayer(false)
    }
  }, [isAddSuccess])

  if (teamPlayersLoading) return <p>Loading...</p>

  if (teamPlayersError) {
    console.error("Error fetching team players:", teamPlayersError)
    return <p>Error fetching team players</p>
  }

  console.log("tpd", teamPlayersData)
  console.log("playerRes", playerRes)
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
      {isAddSuccess && <p>Player added successfully!</p>}
      {isAddLoading && <p>Adding player...</p>}
      {isAddError && <p>Error adding player! {addErrorHandling}</p>}
      <br />
      <div className="flex-around">
        <button onClick={() => setShowAddPlayer(true)}>Add Player</button>
        <button onClick={() => setShowRoster(!showRoster)}>Close</button>
      </div>
      {showAddPlayer && <AddPlayer sendRes={setPlayerRes} />}
    </div>
  )
}

export default TeamRoster
