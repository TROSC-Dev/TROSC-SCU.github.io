import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

function MainLayoutNoFooter() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default MainLayoutNoFooter
