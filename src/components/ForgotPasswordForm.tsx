import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

interface ForgotPasswordData {
  email: string;
}

interface ForgotPasswordFormProps {
  onSubmit: (data: ForgotPasswordData) => Promise<void>;
}

const ForgotPasswordForm = ({ onSubmit }: ForgotPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordData>();

  return (
    <div className="w-full max-w-md bg-neutral-light px-8 py-12 rounded-3xl shadow-lg font-family-poppins">
      <div className="flex justify-center mb-6">
        <div className="text-5xl">🔐</div>
      </div>

      <h1 className="text-2xl font-bold text-neutral-darker text-center mb-2">
        Forgot Password
      </h1>
      <p className="text-center text-neutral-dark mb-8 text-sm">
        Enter your email and we'll send you a reset link.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-neutral-darker"
          >
            Email Address
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
            placeholder="Enter your email address"
            className="px-4 py-3 border-2 border-neutral-light-active rounded-full bg-neutral-light text-neutral-darker placeholder-neutral focus:outline-none focus:border-primary transition-colors"
          />
          {errors.email && (
            <span className="text-xs text-red-600">{errors.email.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 mt-2 bg-primary hover:bg-primary-hover active:bg-primary-active text-white font-bold text-lg rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <div className="text-center mt-8">
        <span className="text-neutral-darker">Know your Password? </span>
        <Link
          to="/signin"
          className="text-primary font-semibold hover:text-primary-hover transition-colors"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
