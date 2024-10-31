import { useState } from "react"
import { useFetchLeagueByIdQuery } from "../../features/league/leagueApiSlice"
import SeasonDetail from "../season/SeasonDetail"

interface LeagueDetailProps {
  id: number
}

const LeagueDetail = ({ id }: LeagueDetailProps) => {
  const { data, error, isLoading } = useFetchLeagueByIdQuery(id)
  const [expandedSeason, setExpandedSeason] = useState<number | null>(null)

  const handleExpandSeason = (seasonId: number) => {
    if (expandedSeason === seasonId) {
      setExpandedSeason(null)
    } else {
      setExpandedSeason(seasonId)
    }
  }

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error!</p>}

      {data && (
        <div>
          <ul>
            <li>ID: {data.id}</li>
            <li>Name: {data.name}</li>
            <li>Admin: {data.admin}</li>
            <li>Active: {data.is_active ? "Yes" : "No"}</li>
          </ul>
        </div>
      )}

      {data && data.seasons && (
        <div>
          <h3>Seasons</h3>
          <ul>
            {data.seasons.map((season: any) => (
              <li key={season.id}>
                <p>Name: {season.name}</p>
                <p>Year: {season.year}</p>
                <p>Active: {season.is_active ? "Yes" : "No"}</p>
                <button onClick={() => handleExpandSeason(season.id)}>
                  {expandedSeason === season.id ? "Collapse" : "Expand"}
                </button>
                {expandedSeason === season.id && season.id && data.id && (
                  <SeasonDetail seasonId={season.id} leagueId={data.id} />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default LeagueDetail
