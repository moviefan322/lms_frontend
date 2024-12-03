import { logout } from "../features/auth/authSlice"
import { useAppDispatch } from "../app/hooks"

function Navbar() {
  const dispatch = useAppDispatch()
  return (
    <nav style={styles.nav}>
      <button style={styles.button} onClick={() => dispatch(logout())}>Logout</button>
    </nav>
  )
}

export default Navbar

const styles = {
  nav: {
    height: "50px",
    width: "100%",
    backgroundColor: "lightblue",
    display: "flex",
    justifyContent: "flex-end",
  },

  button: {
    margin: "10px",
  },
}
