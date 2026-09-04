import { useState } from "react";
import AuthLayout from "../layout/AuthLayout";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import TroscLogo from "../../Assests/TroscLogoRed.webp";
import * as api from "../services/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [sent, setSent] = useState(false);
  const [sentTo, setSentTo] = useState("");

  const handleSubmit = async (data: { email: string }) => {
    try {
      await api.forgotPassword(data);
      setSentTo(data.email);
      setSent(true);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to send reset link. Please try again.",
      );
    }
  };

  return (
    <AuthLayout logo={TroscLogo}>
      {sent ? (
        <div className="w-full max-w-md bg-neutral-light px-8 py-12 rounded-3xl shadow-lg font-family-poppins text-center">
          <div className="text-5xl mb-6">📧</div>
          <h1 className="text-2xl font-bold text-neutral-darker mb-2">
            Check Your Email
          </h1>
          <p className="text-neutral-dark text-sm mb-6">
            We've sent a password reset link to{" "}
            <span className="font-semibold text-neutral-darker">{sentTo}</span>.
            Check your inbox (and spam folder).
          </p>
          <Link
            to="/signin"
            className="inline-block w-full py-3 bg-primary hover:bg-primary-hover text-white font-bold text-lg rounded-full transition-colors duration-200 text-center"
          >
            Back to Sign In
          </Link>
        </div>
      ) : (
        <ForgotPasswordForm onSubmit={handleSubmit} />
      )}
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
