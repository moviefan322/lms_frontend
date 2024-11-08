import { useState } from "react"
import { useCreateSeasonMutation } from "../../features/season/seasonApiSlice"
import { useErrorHandling } from "../../hooks/useErrorHandling"

interface CreateSeasonProps {
  leagueId: number
}

const CreateSeason = ({ leagueId }: CreateSeasonProps) => {
  const [seasonName, setSeasonName] = useState("")
  const [year, setYear] = useState(new Date().getFullYear())

  const [createSeason, { isLoading: isCreating, isSuccess, isError, error }] =
    useCreateSeasonMutation()

  // Use the error handling hook to get an error message JSX
  const errorMessage = useErrorHandling(error as any)

  // Handle the form submission
  const handleSubmit = async (e: React.FormEvent) => {
    console.log("button clicked");
    e.preventDefault();
    const seasonData = {
      name: seasonName,
      year,
    };
    try {
      // Pass { leagueId, ...seasonData } to match the mutation signature
      await createSeason({ leagueId, ...seasonData }).unwrap();
      setSeasonName(""); // Reset the form input
    } catch (err) {
      console.error("Failed to create season:", err);
    }
  };
  

  return (
    <div>
      <h2>Create a New Season</h2>
      <div className="flex column">
        <div>
          {" "}
          <label>Name: </label>
          <input
            type="text"
            value={seasonName}
            onChange={e => setSeasonName(e.target.value)}
            placeholder="Season Name"
            required
          />
        </div>
        <div>
          {" "}
          <label>Year: </label>
          <input
            type="number"
            value={year}
            onChange={e => setYear(parseInt(e.target.value))}
            placeholder="Year"
            required
          />
        </div>

        <button disabled={isCreating} onClick={handleSubmit}>
          {isCreating ? "Creating..." : "Create Season"}
        </button>
      </div>

      {/* Display status */}
      {isSuccess && <p>Season created successfully!</p>}
      {isError && errorMessage}
    </div>
  )
}

export default CreateSeason
