import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useFetchSeasonByIdQuery } from "../../features/season/seasonApiSlice"
import NewSchedule from "../schedule/NewSchedule"
import ScheduleManager from "../schedule/ScheduleManager"

interface SeasonDetailProps {
  seasonId: number
  leagueId: number
}

const SeasonDetail = ({ seasonId, leagueId }: SeasonDetailProps) => {
  const [toggleSchedule, setToggleSchedule] = useState<boolean>(false)
  const [toggleManageSchedule, setToggleManageSchedule] =
    useState<boolean>(false)

  const navigate = useNavigate()


  const { data, error, isLoading } = useFetchSeasonByIdQuery({
    leagueId,
    seasonId,
  })


  const navToManageTeams = () => {
    navigate(`/manage-teams/${leagueId}/${seasonId}`)
  }

  if (error) return <p>Error!</p>

  if (isLoading) return <p>Loading...</p>

  if (data)
    return (
      <>
        <div>
          <h1>Season Deatil</h1>
          <p>id: {data.id}</p>
          <p>active: {data.is_active}</p>
          <p>name: {data.name}</p>
          <p>year: {data.year}</p>
        </div>
        <div>
          <button onClick={navToManageTeams}>Manage Teams</button>
        </div>
        {!data.schedule && (
          <>
            <p>No schedule available</p>
            <button onClick={() => setToggleSchedule(!toggleSchedule)}>
              New Schedule
            </button>
            {toggleSchedule && (
              <NewSchedule leagueId={leagueId} seasonId={seasonId} />
            )}
          </>
        )}
        {data.schedule && (
          <>
            <button
              onClick={() => setToggleManageSchedule(!toggleManageSchedule)}
            >
              Manage Schedule
            </button>
            {toggleManageSchedule && (
              <ScheduleManager leagueId={leagueId} seasonId={seasonId} />
            )}
          </>
        )}
      </>
    )
}

export default SeasonDetail
