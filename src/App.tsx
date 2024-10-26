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
import ManageTeams from "./components/teams/ManageTeams"

const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  return isLoggedIn ? element : <Navigate to="/login" />
}

const App = () => {
  const dispatch = useAppDispatch()

  const token = localStorage.getItem("token")
  const { data: userDetails } = useGetUserDetailsQuery(undefined, {
    skip: !token,
  })

  useEffect(() => {
    if (token) {
      dispatch(setToken(token))
      if (userDetails) {
        dispatch(
          setUserDetails({ email: userDetails.email, name: userDetails.name }),
        )
      }
    }
  }, [token, userDetails, dispatch])

  return (
    <Router>
      <Navbar />
      <div className="navfill"></div>
      <Routes>
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route path="/manage-teams/:leagueId/:seasonId" element={<PrivateRoute element={<ManageTeams />} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
