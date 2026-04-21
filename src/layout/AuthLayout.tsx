import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  logo?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, logo }) => {
  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-white">
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:flex flex-col items-center justify-center bg-white px-8 py-12">
          <Link to="/" className="text-center">
            <div className="mb-10">
              {logo ? (
                <img src={logo} alt="TROSC Logo" className="max-w-xs mx-auto cursor-pointer" />
              ) : (
                <>
                  <h1 className="text-5xl lg:text-6xl font-black text-primary mb-2 cursor-pointer">
                    TROSC
                  </h1>
                  <div className="flex justify-center gap-2 text-sm text-neutral-dark">
                    <span>⚙️</span>
                    <span>⚙️</span>
                  </div>
                </>
              )}
            </div>

            {/* Tagline */}
            <h2 className="text-2xl lg:text-3xl font-bold text-neutral-darker mb-4">
              Learn, Grow, Lead
            </h2>

            {/* Description */}
            <p className="text-lg lg:text-xl text-neutral-darker font-semibold">
              Your journey starts Here!
            </p>
          </Link>
        </div>

        {/* Right Section - Form */}
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 py-12 lg:py-0 bg-neutral-light lg:bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
