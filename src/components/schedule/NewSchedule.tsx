// FORM FOR NEW SCHEDULE:
// {
//   "start_date": "2024-10-22",
//   "num_weeks": 2147483647,
//   "default_start_time": "string"
// }

import { useState } from "react"
import { format } from "date-fns"
import { useCreateScheduleMutation } from "../../features/schedule/scheduleApiSlice"

interface NewScheduleProps {
  leagueId: number
  seasonId: number
}

const formattedTime = (timeString: string) =>
  format(new Date(timeString), "HH:mm:ss")

const NewSchedule = ({ leagueId, seasonId }: NewScheduleProps) => {
  const [startDate, setStartDate] = useState<string>("")
  const [numWeeks, setNumWeeks] = useState<number>(0)
  const [defaultStartTime, setDefaultStartTime] = useState<string>("")

  const [createSchedule, { isLoading }] = useCreateScheduleMutation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createSchedule({
      leagueId,
      seasonId,
      start_date: startDate,
      num_weeks: numWeeks,
      default_start_time: defaultStartTime,
    })
  }

  return (
    <form>
      <label>
        Start Date
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
      </label>
      <label>
        Number of Weeks
        <input
          type="number"
          value={numWeeks}
          onChange={e => setNumWeeks(parseInt(e.target.value))}
        />
      </label>
      <label>
        Default Start Time
        <input
          type="time"
          value={defaultStartTime}
          onChange={e => setDefaultStartTime(e.target.value)}
        />
      </label>
      <button onClick={handleSubmit}>Create Schedule</button>
    </form>
  )
}

export default NewSchedule
