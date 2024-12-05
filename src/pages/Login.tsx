// Login.tsx
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  useLoginMutation,
  useGetUserDetailsQuery,
} from "../features/auth/authApiSlice"
import { setToken, setError } from "../features/auth/authSlice"

const Login: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useAppDispatch()
  const { isLoggedIn, token } = useAppSelector(state => state.auth)
  const { data } = useGetUserDetailsQuery(token)

  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/")
    }
  }, [isLoggedIn, navigate])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { token } = await login({ email, password }).unwrap()
      dispatch(setToken(token))
    } catch (error: any) {
      dispatch(setError(error.message || "An error occurred."))
    }
  }

  if (data) {
    console.log(data)
  } else {
    console.log("No data")
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      {isLoggedIn && <p>Logged in with token: {token}</p>}
    </div>
  )
}

export default Login
