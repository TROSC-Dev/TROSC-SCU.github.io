import React from 'react';
import SignInForm from '../components/SignInForm';
import AuthLayout from '../layout/AuthLayout';
import TroscLogo from "../../Assests/TroscLogoRed.png";

const SignInPage: React.FC = () => {
  return (
    <AuthLayout logo={TroscLogo}>
      <SignInForm />
    </AuthLayout>
  );
};

export default SignInPage;
