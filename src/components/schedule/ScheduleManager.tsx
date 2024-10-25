import { useFetchScheduleQuery } from "../../features/schedule/scheduleApiSlice"

interface ScheduleManagerProps {
  leagueId: number
  seasonId: number
}

const ScheduleManager = ({ leagueId, seasonId }: ScheduleManagerProps) => {
  const {
    data: schedule,
    error,
    isLoading,
  } = useFetchScheduleQuery({ leagueId, seasonId })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading schedule</p>

  if (schedule)
    return (
      <div className='border'>
        <h3> Schedule Detail!</h3>
        <p>{schedule.id}</p>
        <p>{schedule.default_start_time}</p>
        <p>{schedule.num_weeks}</p>
        <p>{schedule.start_date}</p>
        <button>Auto-Generate Schedule</button>
        <br /> <br /> 
        <button>Manually Generate Schedule</button>
        <br /> <br /> 
        <button>Delete Schedule</button>
      </div>
    )
}

export default ScheduleManager
