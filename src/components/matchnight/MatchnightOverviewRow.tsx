import type { MatchNight } from "../../types/redux"

interface MatchNightOverviewRowProps {
  matchnight: MatchNight
}

const MatchnightOverviewRow = ({ matchnight }: MatchNightOverviewRowProps) => {
  return (
    <div style={styles.row}>
      <div>{matchnight.id}</div>
      <div>{matchnight.date}</div>
      <div>{matchnight.start_time}</div>
      <div>{matchnight.status}</div>
      <button>View Matches</button>
      <button>Edit</button>
    </div>
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
