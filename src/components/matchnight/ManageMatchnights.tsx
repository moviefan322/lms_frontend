import type { MatchNight } from "../../types/redux"
import { useFetchMatchnightsQuery } from "../../features/matchnight/matchnightApiSlice"

import MatchnightOverviewRow from "./MatchnightOverviewRow"

interface ManageMatchnightsProps {
  leagueId: number
  scheduleId: number
}

const ManageMatchnights = ({
  leagueId,
  scheduleId,
}: ManageMatchnightsProps) => {
  const { data: matchnights, isLoading } = useFetchMatchnightsQuery({
    leagueId,
    scheduleId,
  })

  if (isLoading) return <p>Loading...</p>
  if (!matchnights) return <p>No matchnights found</p>

  console.log(matchnights)

  return (
    <div>
      <h3>Matchnights</h3>
      <ul>
        {matchnights.map(matchnight => (
          <li key={matchnight.id}>
            <MatchnightOverviewRow matchnight={matchnight} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ManageMatchnights
