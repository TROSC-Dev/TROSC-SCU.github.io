import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import * as api from "../services/api";
import { useAuth } from "../context/useAuth";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function SignUpForm() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>();

  const onSubmit = async (data: SignUpFormData) => {
    setServerError(null);
    try {
      const res = await api.signUp({
        name: data.name,
        email: data.email,
        password: data.password,
        passwordConfirm: data.confirmPassword,
      });
      setUser(res.data.user);
      navigate("/signin");
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : "Sign up failed. Please try again.",
      );
    }
  };

  return (
    <div className="w-full max-w-lg bg-neutral-light px-8 py-12 rounded-3xl shadow-lg font-family-poppins">
      <h1 className="text-4xl font-bold text-neutral-darker text-center mb-8">
        Sign Up
      </h1>

      {serverError && (
        <p
          role="alert"
          className="mb-4 text-sm text-red-600 text-center bg-red-50 rounded-xl px-4 py-2"
        >
          {serverError}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Full Name Field */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-sm font-semibold text-neutral-darker"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Full name is required" })}
            placeholder="Enter your full name"
            className="px-4 py-3 border-2 border-neutral-light-active rounded-full bg-neutral-light text-neutral-darker placeholder-neutral focus:outline-none focus:border-primary transition-colors"
          />
          {errors.name && (
            <span className="text-xs text-red-600">{errors.name.message}</span>
          )}
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-neutral-darker"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            })}
            placeholder="Enter your email"
            className="px-4 py-3 border-2 border-neutral-light-active rounded-full bg-neutral-light text-neutral-darker placeholder-neutral focus:outline-none focus:border-primary transition-colors"
          />
          {errors.email && (
            <span className="text-xs text-red-600">{errors.email.message}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-neutral-darker"
          >
            Password
          </label>
          <PasswordInput
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            placeholder="Enter your password"
          />
          {errors.password && (
            <span className="text-xs text-red-600">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-semibold text-neutral-darker"
          >
            Confirm Password
          </label>
          <PasswordInput
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <span className="text-xs text-red-600">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 mt-6 bg-primary hover:bg-primary-hover active:bg-primary-active text-white font-bold text-lg rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      {/* Sign In Link */}
      <div className="text-center mt-8">
        <span className="text-neutral-darker">Already have an Account? </span>
        <Link
          to="/signin"
          className="text-primary font-semibold hover:text-primary-hover transition-colors"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default SignUpForm;
