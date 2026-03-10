import { Routes, Route } from "react-router-dom"

import MainLayout from "./layout/MainLayout"

import LandingPage from "./pages/landingPage"
import SignInPage from "./pages/signInPage"
import SignUpPage from "./pages/signUpPage"
import useScrollToHash from "./hooks/useScrollToHash"

function App() {
  useScrollToHash()

  return (
    <Routes>

      <Route element={<MainLayout />}>

        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

      </Route>

    </Routes>
  )
}

export default App
