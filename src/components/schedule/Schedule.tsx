interface ScheduleProps {
  leagueId: number
  seasonId: number
}

const Schedule = ({ leagueId, seasonId }: ScheduleProps) => {
  return (
    <div>
      <h3> Schedule Detail</h3>
      <p>League Id: {leagueId}</p>
      <p>Season Id: {seasonId}</p>
      <button>Auto-Generate Schedule</button>
      <br /> <br />
      <button>Manually Generate Schedule</button>
      <br /> <br />
      <button>Delete Schedule</button>
    </div>
  )
}

export default Schedule
