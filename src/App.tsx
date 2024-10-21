import { useEffect } from "react"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { useGetUserDetailsQuery } from "./features/auth/authApiSlice"
import {
  setToken,
  setUserDetails,
  selectIsLoggedIn,
} from "./features/auth/authSlice"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"

const App = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  // Get the token from local storage (if available)
  const token = localStorage.getItem("token")

  // Fetch user details when the app loads, only if there's a token
  const { data: userDetails } = useGetUserDetailsQuery(undefined, {
    skip: !token, // Skip the query if no token is present
  })

  useEffect(() => {
    if (token) {
      dispatch(setToken(token)) // Store token in Redux state

      // If user details were fetched successfully, store them in Redux
      if (userDetails) {
        dispatch(
          setUserDetails({ email: userDetails.email, name: userDetails.name }),
        )
      }
    }
  }, [token, userDetails, dispatch])

  return (
    <>
      <Navbar />
      <div className='navfill'></div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} /> {/* Example home route */}
        </Routes>
      </Router>
    </>
  )
}

export default App
