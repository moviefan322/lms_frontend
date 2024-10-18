// Login.tsx
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { useLoginMutation } from "../features/auth/authApiSlice"
import { setToken, setError } from "../features/auth/authSlice"

const Login: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [login, { isLoading }] = useLoginMutation() // RTK Query mutation hook
  const dispatch = useAppDispatch()
  const { isLoggedIn, token } = useAppSelector(state => state.auth)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { token } = await login({ email, password }).unwrap() // Call login mutation
      dispatch(setToken(token)) // Set the token in the Redux store
    } catch (error) {
      dispatch(setError("Login failed"))
    }
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
