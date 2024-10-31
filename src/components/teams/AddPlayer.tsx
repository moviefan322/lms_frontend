import { useState, useEffect } from "react"
import { useCreatePlayerMutation } from "../../features/player/playerApiSlice"
import { useCreateUserMutation } from "../../features/auth/authApiSlice"
import { useErrorHandling } from "../../hooks/useErrorHandling"

interface AddPlayerProps {
  sendRes: React.Dispatch<React.SetStateAction<number>>
}

const AddPlayer = ({ sendRes }: AddPlayerProps) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [addPlayer, { isSuccess, isLoading, isError, error }] =
    useCreatePlayerMutation()
  const errorMessage = useErrorHandling(error as any)

  const [addUser] = useCreateUserMutation()

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await addUser({
//           email,
//           password: "default",
//           name,
//         }).unwrap()
//         console.log("User added:", res)
//       } catch (error) {
//         console.error("Failed to add user:", error)
//       }
//     }
//     if(isSuccess) fetchUser()
//   }, [isSuccess])

  const handleAddPlayer = async () => {
    try {
      const res = await addPlayer({
        name,
        is_active: true,
      }).unwrap()
      console.log("Player added:", res)

      sendRes(res.id)
      const res2 = await addUser({
        email,
        password: "default",
        name,
      }).unwrap()
      console.log("User added:", res2)

      setName("")
      setEmail("")
      setPhone("")
    } catch (error) {
      console.error("Failed to add player:", error)
    }
  }

  return (
    <div>
      <div className="column">
        <h1>Add Player</h1>
        <div>
          <label>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <br />
          <label>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <br />
          <label>Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
          <br />
          <button onClick={handleAddPlayer}>Add Player</button>
        </div>
        {isSuccess && <p>Player added successfully!</p>}
        {isLoading && <p>Adding player...</p>}
        {isError && <p>Error adding player! {errorMessage}</p>}
      </div>
    </div>
  )
}

export default AddPlayer
