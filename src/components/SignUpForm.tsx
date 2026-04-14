import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

interface SignUpData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpData>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data: SignUpData) => {
    console.log("Form Data Submitted:", data);
    reset();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="w-full max-w-lg bg-neutral-light px-8 py-12 rounded-3xl shadow-lg font-family-poppins">
      <h1 className="text-4xl font-bold text-neutral-darker text-center mb-8">Sign Up</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Username Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="userName" className="text-sm font-semibold text-neutral-darker">
            Username
          </label>
          <input
            id="userName"
            type="text"
            {...register('userName', { required: 'Username is required' })}
            placeholder="Enter your username"
            className="px-4 py-3 border-2 border-neutral-light-active rounded-full bg-neutral-light text-neutral-darker placeholder-neutral focus:outline-none focus:border-primary transition-colors"
          />
          {errors.userName && (
            <span className="text-xs text-red-600">{errors.userName.message}</span>
          )}
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-semibold text-neutral-darker">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email', { required: 'Email is required' })}
            placeholder="Enter your email"
            className="px-4 py-3 border-2 border-neutral-light-active rounded-full bg-neutral-light text-neutral-darker placeholder-neutral focus:outline-none focus:border-primary transition-colors"
          />
          {errors.email && (
            <span className="text-xs text-red-600">{errors.email.message}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-semibold text-neutral-darker">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password', { required: 'Password is required' })}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border-2 border-neutral-light-active rounded-full bg-neutral-light text-neutral-darker placeholder-neutral focus:outline-none focus:border-primary transition-colors pr-12"
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
          {errors.password && (
            <span className="text-xs text-red-600">{errors.password.message}</span>
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
              {...register('confirmPassword', { required: 'Please confirm your password' })}
              placeholder="Confirm your password"
              className="w-full px-4 py-3 border-2 border-neutral-light-active rounded-full bg-neutral-light text-neutral-darker placeholder-neutral focus:outline-none focus:border-primary transition-colors pr-12"
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
          className="w-full py-3 mt-6 bg-primary hover:bg-primary-hover active:bg-primary-active text-white font-bold text-lg rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>

      {/* Sign In Link */}
      <div className="text-center mt-8">
        <span className="text-neutral-darker">Already have an Account? </span>
        <Link to="/signin" className="text-primary font-semibold hover:text-primary-hover transition-colors">
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default SignUpForm;