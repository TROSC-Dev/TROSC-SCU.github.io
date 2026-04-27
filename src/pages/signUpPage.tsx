import React from 'react';
import SignUpForm from '../components/SignUpForm';
import AuthLayout from '../layout/AuthLayout';
import TroscLogo from "../../Assests/TroscLogoRed.webp";

const SignUpPage: React.FC = () => {
  return (
    <AuthLayout logo={TroscLogo}>
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUpPage;
