import { useFetchLeagueByIdQuery } from "../../features/league/leagueApiSlice"

interface LeagueDetailProps {
  id: number
}

const LeagueDetail = ({ id }: LeagueDetailProps) => {
  const { data, error, isLoading } = useFetchLeagueByIdQuery(id)

  console.log(data)
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error!</p>}

      {data && (
        <div>
          <ul>
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
                </li>
                ))}
            </ul>
            </div>
        )}
    </div>
  )
}

export default LeagueDetail
