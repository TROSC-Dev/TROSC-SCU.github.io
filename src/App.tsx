import { Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import MainLayoutNoFooter from "./layout/MainLayoutNoFooter";

import LandingPage from "./pages/landingPage";
import SignInPage from "./pages/signInPage";
import SignUpPage from "./pages/signUpPage";
import ForgotPasswordPage from "./pages/forgotPasswordPage";
import ResetPasswordPage from "./pages/resetPasswordPage";
import ContactUsPage from "./pages/contactUsPage";
import TrackDetailsPage from "./pages/TrackDetailsPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import useScrollToHash from "./hooks/useScrollToHash";

function App() {
  useScrollToHash();

  return (
    <Routes>
      {/* Pages with Navbar + Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/track/:trackId" element={<TrackDetailsPage />} />
      </Route>

      {/* Pages with Navbar only (no Footer) */}
      <Route element={<MainLayoutNoFooter />}>
        <Route path="/contact" element={<ContactUsPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
    </Routes>
  );
}

export default App;
