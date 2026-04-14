import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

interface SignInData {
  username: string;
  password: string;
  rememberMe: boolean;
}

function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignInData>();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: SignInData) => {
    console.log('Form Data Submitted:', data);
    reset();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md bg-neutral-light px-8 py-12 rounded-3xl shadow-lg font-family-poppins">
      <h1 className="text-4xl font-bold text-neutral-darker text-center mb-8">Sign In</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Username Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-sm font-semibold text-neutral-darker">
            Username
          </label>
          <input
            id="username"
            type="text"
            {...register('username', { required: 'Username is required' })}
            placeholder="Enter your username"
            className="px-4 py-3 border-2 border-neutral-light-active rounded-full bg-neutral-light text-neutral-darker placeholder-neutral focus:outline-none focus:border-primary transition-colors"
          />
          {errors.username && (
            <span className="text-xs text-red-600">{errors.username.message}</span>
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

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label htmlFor="rememberMe" className="flex items-center gap-2 cursor-pointer">
            <input
              id="rememberMe"
              type="checkbox"
              {...register('rememberMe')}
              className="w-4 h-4 rounded cursor-pointer accent-primary"
            />
            <span className="text-sm text-neutral-darker font-medium">Remember me</span>
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
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      {/* Sign Up Link */}
      <div className="text-center mt-8">
        <span className="text-neutral-darker">Don't have an Account? </span>
        <Link to="/signup" className="text-primary font-semibold hover:text-primary-hover transition-colors">
          Sign Up
        </Link>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 my-8">
        <div className="flex-1 h-px bg-neutral-light-active"></div>
        <span className="text-sm text-neutral-dark font-medium">OR</span>
        <div className="flex-1 h-px bg-neutral-light-active"></div>
      </div>

      {/* OAuth Buttons */}
      <div className="flex flex-col gap-3">
        <button
          type="button"
          className="w-full py-3 border-2 border-neutral-light-active rounded-full text-neutral-darker font-semibold hover:bg-neutral-light-hover transition-colors flex items-center justify-center gap-2"
        >
          <span>🔍</span>
          Sign in with Google
        </button>
        <button
          type="button"
          className="w-full py-3 border-2 border-neutral-light-active rounded-full text-neutral-darker font-semibold hover:bg-neutral-light-hover transition-colors flex items-center justify-center gap-2"
        >
          <span>f</span>
          Sign in with Facebook
        </button>
      </div>
    </div>
  );
}

export default SignInForm;
