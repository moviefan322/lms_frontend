import { useState } from "react"
import type { TeamSeason } from "../../types/redux"
import { useUpdateTeamSeasonPartialMutation } from "../../features/teamseason/teamSeasonApiSlice"
import { useErrorHandling } from "../../hooks/useErrorHandling"
import TeamRoster from "./TeamRoster"

interface EditTeamProps {
  leagueId: number
  seasonId: number
  teamId: number
  teamData: TeamSeason
  setShowEdit: (id: number | null) => void
}

const EditTeam = ({
  leagueId,
  seasonId,
  teamId,
  teamData,
  setShowEdit,
}: EditTeamProps) => {
  const [captain, setCaptain] = useState(teamData.captain)
  const [name, setName] = useState(teamData.name)

  const [updateTeamSeason, { isSuccess, isLoading, isError, error }] =
    useUpdateTeamSeasonPartialMutation()

  // Use the error handling hook to get an error message JSX
  const errorMessage = useErrorHandling(error as any)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await updateTeamSeason({
        leagueId,
        seasonId,
        id: teamId,
        name,
        captain,
      }).unwrap()
      setShowEdit(null)
    } catch (error) {
      console.error("Failed to update team season:", error)
    }
  }

  return (
    <div>
      <div>
        {" "}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <label htmlFor="captain">Captain:</label>
          <select
            name="captain"
            id="captain-select"
            value={captain}
            onChange={e => setCaptain(parseInt(e.target.value))}
          >
            {teamData.team_players.map((player, i) => (
              <option key={i} value={player.player.id}>
                {player.player.name}
              </option>
            ))}
          </select>

          <div>
            <button>Manage Roster</button>
            <button type="submit" disabled={isLoading}>
              Submit
            </button>
            <button onClick={() => setShowEdit(null)}>Cancel</button>
          </div>
        </form>
        {isLoading && <p>Updating team...</p>}
        {isError && errorMessage}
        {isSuccess && <p>Team updated successfully!</p>}
      </div>
      <TeamRoster data={teamData.team_players} teamSeasonId={teamData.id} />
    </div>
  )
}

export default EditTeam
