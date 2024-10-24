import { useState } from "react"
import { useFetchSeasonByIdQuery } from "../../features/season/seasonApiSlice"
import NewSchedule from "./NewSchedule"

interface SeasonDetailProps {
  seasonId: number
  leagueId: number
}

const SeasonDetail = ({ seasonId, leagueId }: SeasonDetailProps) => {
  const [toggleSchedule, setToggleSchedule] = useState<boolean>(false)
  const { data, error, isLoading } = useFetchSeasonByIdQuery({
    leagueId,
    seasonId,
  })

  console.log(data)
  console.log(error)
  console.log(isLoading)

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
        {!data.schedule && (
          <>
            <p>No schedule available</p>
            <button onClick={() => setToggleSchedule(!toggleSchedule)}>New Schedule</button>
            {toggleSchedule && <NewSchedule leagueId={leagueId} seasonId={seasonId} />}
          </>
        )}
      </>
    )
}

export default SeasonDetail
