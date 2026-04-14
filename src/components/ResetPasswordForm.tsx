import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

interface ResetPasswordData {
  newPassword: string;
  confirmPassword: string;
}

interface ResetPasswordFormProps {
  onSubmit: (data: ResetPasswordData) => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ResetPasswordData>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const password = watch('newPassword');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="w-full max-w-md bg-neutral-light px-8 py-12 rounded-3xl shadow-lg font-family-poppins">
      {/* Checkmark Icon */}
      <div className="flex justify-center mb-6">
        <div className="text-5xl">✅</div>
      </div>

      <h1 className="text-2xl font-bold text-neutral-darker text-center mb-2">
        Reset Password
      </h1>
      <p className="text-center text-neutral-dark mb-8 text-sm">
        Create your new Password
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* New Password Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="newPassword" className="text-sm font-semibold text-neutral-darker">
            New Password
          </label>
          <div className="relative">
            <input
              id="newPassword"
              type={showPassword ? 'text' : 'password'}
              {...register('newPassword', {
                required: 'New password is required',
              })}
              placeholder="Enter your new password"
              className="w-full px-4 py-3 border-2 border-neutral-light-active rounded-full bg-white text-neutral-darker placeholder-neutral focus:outline-none focus:border-primary transition-colors pr-12"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-dark hover:text-neutral-darker transition-colors"
              aria-label="Toggle password visibility"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.newPassword && (
            <span className="text-xs text-red-600">{errors.newPassword.message}</span>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className="text-sm font-semibold text-neutral-darker">
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === password || 'Passwords do not match',
              })}
              placeholder="Confirm your new password"
              className="w-full px-4 py-3 border-2 border-neutral-light-active rounded-full bg-white text-neutral-darker placeholder-neutral focus:outline-none focus:border-primary transition-colors pr-12"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-dark hover:text-neutral-darker transition-colors"
              aria-label="Toggle confirm password visibility"
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="text-xs text-red-600">{errors.confirmPassword.message}</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 mt-2 bg-primary hover:bg-primary-hover active:bg-primary-active text-white font-bold text-lg rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Resetting...' : 'Log In'}
        </button>
      </form>

      {/* Sign In Link */}
      <div className="text-center mt-8">
        <span className="text-neutral-darker text-sm">Know your Password? </span>
        <Link
          to="/signin"
          className="text-primary font-semibold hover:text-primary-hover transition-colors text-sm"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
