import { useState, useEffect } from "react"
import {
  usePartialUpdateTeamPlayerMutation,
  useFetchTeamPlayerByIdQuery,
} from "../../features/teamplayer/teamPlayerApiSlice"
import { useErrorHandling } from "../../hooks/useErrorHandling"

// leagueId, seasonId, teamSeasonId, id, partialTeamPlayer

interface EditTeamPlayerProps {
  leagueId: number
  seasonId: number
  teamSeasonId: number
  playerId: number
  setShowEditPlayer: (id: number | null) => void
}

const EditTeamPlayer = ({
  leagueId,
  seasonId,
  teamSeasonId,
  playerId,
  setShowEditPlayer,
}: EditTeamPlayerProps) => {
  const [player, setPlayer] = useState<any>(null)
  const [name, setName] = useState("")

  const { data, error, isLoading } = useFetchTeamPlayerByIdQuery({
    leagueId,
    seasonId,
    teamSeasonId,
    id: playerId,
  })

  const [
    updateTeamPlayer,
    { isSuccess, isLoading: updateLoading, isError, error: updateError },
  ] = usePartialUpdateTeamPlayerMutation()
  const errorMessage = useErrorHandling(updateError as any)

  const handleSubmit = async () => {
    const payload = { name }
    console.log("Payload to send:", payload)

    try {
      const res = await updateTeamPlayer({
        leagueId,
        seasonId,
        teamSeasonId,
        id: playerId,
        partialTeamPlayer: payload, // Ensure the key matches your mutation
      }).unwrap()
      console.log("Player updated:", res)
      setShowEditPlayer(null) // Only close if successful
    } catch (error) {
      console.error("Failed to update team player:", error)
    }
  }

  useEffect(() => {
    if (data) {
      setName(data.name) // set the initial value of name from fetched data
    }
  }, [data])

  return (
    <div>
      <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error!</p>}

        {data && (
          <div>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </label>
            {/* <button onClick={() => handleSubmit({ name: name })}>Update</button> */}
            <button onClick={() => setShowEditPlayer(null)}>Cancel</button>
          </div>
        )}
        {updateLoading && <p>Updating...</p>}
        {isSuccess && <p>Player updated successfully!</p>}
        {isError && <p>Error updating player! {errorMessage}</p>}
      </div>
    </div>
  )
}

export default EditTeamPlayer
