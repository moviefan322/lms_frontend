import { useState } from "react"
import {
  useCreateSeasonMutation,
} from "../../features/league/leagueApiSlice"

const CreateLeague = () => {
  // State to hold the league name input from the user
  const [seasonName, setSeasonName] = useState("")

  // Destructure the createLeague mutation function and status indicators
  const [createLeague, { isLoading: isCreating, isSuccess, isError, error }] =
    useCreateSeasonMutation()

  // Handle the form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Call the mutation to create a new league
      await createLeague({ name: seasonName }).unwrap()
      setSeasonName("") // Reset the form input
    } catch (err) {
      console.error("Failed to create league:", err)
    }
  }

  return (
    <div>
      <h2>Create a New League</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={seasonName}
          onChange={e => setSeasonName(e.target.value)}
          placeholder="League Name"
          required
        />
        <button type="submit" disabled={isCreating}>
          {isCreating ? "Creating..." : "Create League"}
        </button>
      </form>

      {/* Display status */}
      {isSuccess && <p>League created successfully!</p>}
    </div>
  )
}

export default CreateLeague
