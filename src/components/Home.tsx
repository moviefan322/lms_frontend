import { useAppSelector } from "../app/hooks"

function Home() {
  const { isLoggedIn, email } = useAppSelector(state => state.auth)

  console.log(isLoggedIn)
  return (
    <div>
      <h1>Home!</h1>

      {isLoggedIn ? <p>Welcome, {email}!</p> : <p>You are not logged in.</p>}

      <p>{isLoggedIn}</p>
    </div>
  )
}

export default Home
