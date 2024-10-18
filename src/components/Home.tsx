import { useAppSelector } from "../app/hooks"

function Home() {
  const { isLoggedIn, email } = useAppSelector(state => state.auth)

  return (
    <div>
      <h1>Home!</h1>

      {isLoggedIn ? <p>Welcome, {email}!</p> : <p>You are not logged in.</p>}
    </div>
  )
}

export default Home
