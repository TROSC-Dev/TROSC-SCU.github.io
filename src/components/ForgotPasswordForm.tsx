import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

interface ForgotPasswordData {
  emailOrUsername: string;
}

interface ForgotPasswordFormProps {
  onSubmit: (data: ForgotPasswordData) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordData>();

  return (
    <div className="w-full max-w-md bg-neutral-light px-8 py-12 rounded-3xl shadow-lg font-family-poppins">
      {/* Lock Icon */}
      <div className="flex justify-center mb-6">
        <div className="text-5xl">🔐</div>
      </div>

      <h1 className="text-2xl font-bold text-neutral-darker text-center mb-2">
        Forgot Password
      </h1>
      <p className="text-center text-neutral-dark mb-8 text-sm">
        Forgot Password? Quickly Reset Your Password
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Email or Username Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="emailOrUsername" className="text-sm font-semibold text-neutral-darker">
            Email or Username
          </label>
          <input
            id="emailOrUsername"
            type="text"
            {...register('emailOrUsername', {
              required: 'Email or username is required',
            })}
            placeholder="Enter your email / username"
            className="px-4 py-3 border-2 border-neutral-light-active rounded-full bg-neutral-light text-neutral-darker placeholder-neutral focus:outline-none focus:border-primary transition-colors"
          />
          {errors.emailOrUsername && (
            <span className="text-xs text-red-600">{errors.emailOrUsername.message}</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 mt-2 bg-primary hover:bg-primary-hover active:bg-primary-active text-white font-bold text-lg rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Continue'}
        </button>
      </form>

      {/* Sign In Link */}
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
