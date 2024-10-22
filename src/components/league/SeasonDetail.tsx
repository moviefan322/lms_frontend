import { useFetchSeasonByIdQuery } from "../../features/league/leagueApiSlice"

interface SeasonDetailProps {
  seasonId: number
  leagueId: number
}

const SeasonDetail = ({ seasonId, leagueId }: SeasonDetailProps) => {
  const { data, error, isLoading } = useFetchSeasonByIdQuery({
    leagueId,
    seasonId,
  })

  console.log(data)
  console.log(error)
  console.log(isLoading)

  if (isLoading) return <p>Loading...</p>

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
          <button>New Schedule</button>
        </>
      )}
    </>
  )
}

export default SeasonDetail
