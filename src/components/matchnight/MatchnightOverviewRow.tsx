import { useState } from "react"
import { useUpdateMatchnightMutation } from "../../features/matchnight/matchnightApiSlice"
import type { MatchNight } from "../../types/redux"

import MatchesList from "../match/MatchesList"

interface MatchNightOverviewRowProps {
  matchnight: MatchNight
  leagueId: number
  scheduleId: number
  seasonId: number
}

const MatchnightOverviewRow = ({
  matchnight,
  leagueId,
  scheduleId,
  seasonId,
}: MatchNightOverviewRowProps) => {
  const [editMode, setEditMode] = useState(false)
  const [showMatches, setShowMatches] = useState(false)
  const [updateMatchnightMutation] = useUpdateMatchnightMutation()
  const [editValue, setEditValue] = useState({
    date: matchnight.date,
    start_time: matchnight.start_time,
    status: matchnight.status,
  })

  const handleSave = async () => {
    try {
      await updateMatchnightMutation({
        leagueId,
        scheduleId,
        matchnightId: matchnight.id,
        ...editValue,
      }).unwrap()
      setEditMode(false)
    } catch (err) {
      console.error("Failed to update matchnight:", err)
    }
    setEditMode(false)
  }

  if (editMode) {
    return (
      <div style={styles.row}>
        <div>{matchnight.id}</div>
        <div>
          <input
            type="text"
            value={editValue.date}
            onChange={e =>
              setEditValue(prev => {
                return { ...prev, date: e.target.value }
              })
            }
          />
        </div>
        <div>
          <input
            type="text"
            value={editValue.start_time}
            onChange={e =>
              setEditValue(prev => {
                return { ...prev, start_time: e.target.value }
              })
            }
          />
        </div>
        <div>
          <input
            type="text"
            value={editValue.status}
            onChange={e =>
              setEditValue(prev => {
                return { ...prev, status: e.target.value }
              })
            }
          />
        </div>
        <button onClick={handleSave}>Save</button>
        <button onClick={() => setEditMode(false)}>Cancel</button>
      </div>
    )
  }

  if (!matchnight) {
    return <div>No matchnight found</div>
  }

  return (
    <>
      <div style={styles.row}>
        <div>{matchnight.id}</div>
        <div>{matchnight.date}</div>
        <div>{matchnight.start_time}</div>
        <div>{matchnight.status}</div>
        <button onClick={() => setShowMatches(prev => !prev)}>
          {!showMatches ? "View Matches" : "Hide Matches"}
        </button>
        <button onClick={() => setEditMode(true)}>Edit</button>
      </div>
      {showMatches && (
        <MatchesList
          leagueId={leagueId}
          scheduleId={scheduleId}
          matchnightId={matchnight.id}
          seasonId={seasonId}
        />
      )}
    </>
  )
}

export default MatchnightOverviewRow

const styles = {
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "1px solid #ccc",
  },
}
