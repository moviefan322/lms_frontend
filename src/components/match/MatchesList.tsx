import { useFetchMatchnightQuery } from "../../features/matchnight/matchnightApiSlice"

interface MatchesListProps {
  leagueId: number
  scheduleId: number
  matchnightId: number
}

const MatchesList = ({
  leagueId,
  scheduleId,
  matchnightId,
}: MatchesListProps) => {
  const {
    data: matchnight,
    isFetching,
    isLoading,
    error,
  } = useFetchMatchnightQuery({
    leagueId,
    scheduleId,
    matchnightId,
  })

  console.log("Fetching:", isFetching)
  if (isLoading) return <p>Loading matches...</p>
  if (error) return <p>Failed to load matches</p>
  if (!matchnight || matchnight.matches.length === 0)
    return <p>Match night not available</p>

  return (
    <div>
      <h3>Matches</h3>
      <ul>
        {matchnight.matches.map(match => (
          <li key={match.id}>
            <div>
              {match.away_team_name} @ {match.home_team_name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MatchesList
