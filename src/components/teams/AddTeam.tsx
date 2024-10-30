import { useState, useEffect } from "react"
import { useCreateTeamMutation } from "../../features/team/teamApiSlice"
import { useCreateTeamSeasonMutation } from "../../features/teamseason/teamSeasonApiSlice"
import { set } from "date-fns"

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

const AddTeam = ({ leagueId, seasonId }: AddTeamProps) => {
  const [name, setName] = useState("")
  const [captain, setCaptain] = useState("")
  const [
    addTeam,
    {
      isSuccess: isTeamSuccess,
      isLoading: isTeamLoading,
      isError: isTeamError,
      error: teamError,
    },
  ] = useCreateTeamMutation()
  const [
    addTeamSeason,
    {
      isSuccess: isTeamSeasonSuccess,
      isLoading: isTeamSeasonLoading,
      isError: isTeamSeasonError,
      error: teamSeasonError,
    },
  ] = useCreateTeamSeasonMutation()

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const payload = {
        leagueId,
        league: leagueId,
        name,
      }
      console.log("payload", payload)

      const res = await addTeam({
        ...payload,
      }).unwrap()
      console.log("res", res)
      if (res) {
        postTeamSeason({
          name: res.name,
          team: res.id,
          season: seasonId,
          captain: 1,
        })
      }
    } catch (error) {
      console.error("Failed to add team:", error)
    }
  }

  return (
    <div className="flex">
      <form className="column" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        ></input>
        <label htmlFor="captain">Captain:</label>
        <input
          type="text"
          id="captain"
          name="captain"
          value={captain}
          onChange={e => setCaptain(e.target.value)}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddTeam
