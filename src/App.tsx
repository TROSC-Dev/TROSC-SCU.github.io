import { Routes, Route } from "react-router-dom"

import MainLayout from "./layout/MainLayout"

import LandingPage from "./pages/landingPage"
import SignInPage from "./pages/signInPage"
import SignUpPage from "./pages/signUpPage"
import ForgotPasswordPage from "./pages/forgotPasswordPage"
import useScrollToHash from "./hooks/useScrollToHash"

function App() {
  useScrollToHash()

  return (
    <Routes>

      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      {/* Auth pages without navbar/footer */}
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

    </Routes>
  )
}

export default App
