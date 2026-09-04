import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PasswordInput from "./PasswordInput";
import * as api from "../services/api";
import { useAuth } from "../context/useAuth";

interface SignInFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

function SignInForm() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>();

  const onSubmit = async (data: SignInFormData) => {
    try {
      const res = await api.signIn({
        email: data.email,
        password: data.password,
      });
      setUser(res.data.user);
      toast.success(`Welcome back, ${res.data.user.name}!`);
      navigate("/");
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Sign in failed. Please try again.",
      );
    }
  };

  return (
    <div className="w-full max-w-md bg-neutral-light px-8 py-12 rounded-3xl shadow-lg font-family-poppins">
      <h1 className="text-4xl font-bold text-neutral-darker text-center mb-8">
        Sign In
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
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

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label
            htmlFor="rememberMe"
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              id="rememberMe"
              type="checkbox"
              {...register("rememberMe")}
              className="w-4 h-4 rounded cursor-pointer accent-primary"
            />
            <span className="text-sm text-neutral-darker font-medium">
              Remember me
            </span>
          </label>
          <Link
            to="/forgot-password"
            className="text-sm text-primary hover:text-primary-hover font-semibold transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 mt-2 bg-primary hover:bg-primary-hover active:bg-primary-active text-white font-bold text-lg rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </form>

      {/* Sign Up Link */}
      <div className="text-center mt-8">
        <span className="text-neutral-darker">Don't have an Account? </span>
        <Link
          to="/signup"
          className="text-primary font-semibold hover:text-primary-hover transition-colors"
        >
          Sign Up
        </Link>
      </div>

    </div>
  );
}

export default SignInForm;
