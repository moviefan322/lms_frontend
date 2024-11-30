import { useState } from "react"
import {
  useFetchScheduleQuery,
  useDeleteScheduleMutation,
  useGenerateScheduleMutation,
} from "../../features/schedule/scheduleApiSlice"

import NewSchedule from "./NewSchedule"
import ManageMatchNights from "../matchnight/ManageMatchnights"

interface ScheduleManagerProps {
  leagueId: number
  seasonId: number
}

const ScheduleManager = ({ leagueId, seasonId }: ScheduleManagerProps) => {
  const [showMatchnights, setShowMatchnights] = useState(false)
  const [deleteScheduleMutation] = useDeleteScheduleMutation()
  const [generateScheduleMutation] = useGenerateScheduleMutation()
  const {
    data: schedule,
    error,
    isLoading,
  } = useFetchScheduleQuery({ leagueId, seasonId })
  const skeletonSchedule = !!schedule && schedule.matchnights.length === 0

  const handleDelete = async (scheduleId: number) => {
    try {
      await deleteScheduleMutation({ leagueId, seasonId, scheduleId }).unwrap()
      alert("Schedule deleted successfully.")
    } catch (err) {
      console.error("Failed to delete schedule:", err)
    }
  }

  const handleGenerate = async (scheduleId: number) => {
    try {
      await generateScheduleMutation({ scheduleId }).unwrap()
      alert("Schedule generated successfully.")
    } catch (err) {
      console.error("Failed to generate schedule:", err)
    }
  }

  const handleView = () => {
    setShowMatchnights(true)
  }

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading schedule</p>

  if (Array.isArray(schedule) && schedule.length === 0) {
    console.log("schedule is empty")
    return (
      <>
        <p>No schedule exists for this season 'schedule.length === 0'.</p>
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
        {skeletonSchedule ? (
          <>
            {" "}
            <button onClick={() => handleGenerate(schedule.id)}>
              Auto-Generate Schedule
            </button>
            <br /> <br />
            <button>Manually Generate Schedule</button>
          </>
        ) : (
          <>
          <div>
            <button onClick={handleView}>View Schedule</button>
            <div style={{ height: 20 }} />
            <button onClick={() => handleDelete(schedule.id)}>
              Delete Schedule
            </button>
          </div>
          {showMatchnights && (
            <ManageMatchNights
              leagueId={leagueId}
              scheduleId={schedule.id}
            />
          )}
          </>
        )}
      </div>
    )
}

export default ScheduleManager
