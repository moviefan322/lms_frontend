import {
  useFetchScheduleQuery,
  useDeleteScheduleMutation,
} from "../../features/schedule/scheduleApiSlice"
import NewSchedule from "./NewSchedule"

interface ScheduleManagerProps {
  leagueId: number
  seasonId: number
}

const ScheduleManager = ({ leagueId, seasonId }: ScheduleManagerProps) => {
  const [deleteScheduleMutation] = useDeleteScheduleMutation()
  const {
    data: schedule,
    error,
    isLoading,
  } = useFetchScheduleQuery({ leagueId, seasonId })

  const handleDelete = async (scheduleId: number) => {
    try {
      await deleteScheduleMutation({ leagueId, seasonId, scheduleId }).unwrap();
      alert("Schedule deleted successfully.");
    } catch (err) {
      console.error("Failed to delete schedule:", err);
    }
  };

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading schedule</p>

  if (Array.isArray(schedule) && schedule.length === 0) {
    console.log("schedule is empty")
    return (
      <>
        <p>No schedule exists for this season.</p>
        <NewSchedule leagueId={leagueId} seasonId={seasonId} />
      </>
    )
  }

  console.log("schedule= ", schedule)

  if (schedule)
    return (
      <div className="border">
        <h3> Schedule Detail!</h3>
        <p>{schedule.id}</p>
        <p>{schedule.default_start_time}</p>
        <p>{schedule.num_weeks}</p>
        <p>{schedule.start_date}</p>
        <button>Auto-Generate Schedule</button>
        <br /> <br />
        <button>Manually Generate Schedule</button>
        <br /> <br />
        <button onClick={() => handleDelete(schedule.id)}>Delete Schedule</button>
      </div>
    )
}

export default ScheduleManager
