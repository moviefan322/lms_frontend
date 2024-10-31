import { useState, useEffect } from "react"
import { useCreateTeamMutation } from "../../features/team/teamApiSlice"
import { useCreateTeamSeasonMutation } from "../../features/teamseason/teamSeasonApiSlice"
import {
  useFetchPlayersByLeagueQuery,
  useFetchPlayerByIdQuery,
} from "../../features/player/playerApiSlice"
import { useErrorHandling } from "../../hooks/useErrorHandling"
import type { Player } from "../../types/redux"
import AddPlayer from "./AddPlayer"

interface AddTeamProps {
  leagueId: number
  seasonId: number
}

interface TeamSeasonPayload {
  name: string
  team: number
  season: number
  captain: number
}

interface PlayersData {
  data: Player[]
}

const AddTeam = ({ leagueId, seasonId }: AddTeamProps) => {
  const [name, setName] = useState("")
  const [captain, setCaptain] = useState(0)
  const [successName, setSuccessName] = useState("")
  const [valError, setValError] = useState("")
  const [showSelect, setShowSelect] = useState(false)
  const [toggleAddPlayer, setToggleAddPlayer] = useState(false)

  const {
    data: playersData2,
    error: playersError2,
    isLoading: playersLoading2,
  } = useFetchPlayerByIdQuery(captain)

  const {
    data: playersData,
    error: playersError,
    isLoading: playersLoading,
  } = useFetchPlayersByLeagueQuery(leagueId)
  const [
    addTeam,
    {
      isSuccess: isTeamSuccess,
      isLoading: isTeamLoading,
      isError: isTeamError,
      error: teamError,
    },
  ] = useCreateTeamMutation()
  const errorMessage = useErrorHandling(teamError as any)
  const [
    addTeamSeason,
    {
      isSuccess: isTeamSeasonSuccess,
      isLoading: isTeamSeasonLoading,
      isError: isTeamSeasonError,
      error: teamSeasonError,
    },
  ] = useCreateTeamSeasonMutation()
  const errorMessageTeamSeason = useErrorHandling(teamSeasonError as any)

  useEffect(() => {
    setName("")
    setCaptain(0)
  }, [isTeamSeasonSuccess])

  const postTeamSeason = async (teamSeasonPayload: TeamSeasonPayload) => {
    console.log("teamSeasonPayload", teamSeasonPayload)
    const res = await addTeamSeason({
      leagueId,
      seasonId,
      ...teamSeasonPayload,
    })
    console.log("res2", res)

    return res
  }

  const handleSubmit = async () => {
    console.log("handleSubmit")
    const validationError = checkValidation()
    if (validationError) {
      console.error("Validation error:", validationError)
      setValError(validationError)
      return
    }
    try {
      const payload = {
        leagueId,
        league: leagueId,
        name,
      }
      console.log("payload", payload)
      setSuccessName(name)

      const res = await addTeam({
        ...payload,
      }).unwrap()
      console.log("res", res)
      if (res) {
        postTeamSeason({
          name: res.name,
          team: res.id,
          season: seasonId,
          captain: +captain,
        })
      }
    } catch (error) {
      console.error("Failed to add team:", error)
    }
  }

  const checkValidation = () => {
    if (!name) {
      return "Please enter a team name."
    }
    if (!captain) {
      return "Please select a captain."
    }
    return ""
  }

  if (isTeamLoading || isTeamSeasonLoading || playersLoading)
    return <p>Loading...</p>

  console.log(playersData2, playersError2, playersLoading2)
  return (
    <div className="flex">
      <div className="flex column center">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        ></input>
        <label htmlFor="captain">Captain:</label>
        {playersData2 && playersData2.name}
        {showSelect ? (
          <select value={captain} onChange={e => setCaptain(+e.target.value)}>
            <option value="">--</option>
            {playersData?.map((player: Player, index: number) => (
              <option key={index} value={player.id}>
                {player.name}
              </option>
            ))}
          </select>
        ) : (
          <>
            {" "}
            <button onClick={() => setShowSelect(!showSelect)}>
              Choose Captain
            </button>
            <button onClick={e => setToggleAddPlayer(!toggleAddPlayer)}>
              Add New Player
            </button>
            {toggleAddPlayer && <AddPlayer sendRes={setCaptain} />}
          </>
        )}

        <button onClick={handleSubmit}>Submit</button>
        {isTeamError && errorMessage}
        {valError && <p>{valError}</p>}
        {isTeamSeasonError && errorMessageTeamSeason}
        {isTeamSeasonSuccess && <p>{successName} added successfully!</p>}
      </div>
    </div>
  )
}

export default AddTeam
