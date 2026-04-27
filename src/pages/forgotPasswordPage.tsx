import React, { useState } from 'react';
import AuthLayout from '../layout/AuthLayout';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import SMSVerificationForm from '../components/SMSVerificationForm';
import ResetPasswordForm from '../components/ResetPasswordForm';
import TroscLogo from '../../Assests/TroscLogoRed.webp';

type PasswordResetStep = 'forgot' | 'sms' | 'reset';

interface ForgotPasswordData {
  emailOrUsername: string;
}

interface SMSVerificationData {
  code: string;
}

interface ResetPasswordData {
  newPassword: string;
  confirmPassword: string;
}

const ForgotPasswordPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<PasswordResetStep>('forgot');
  const [userEmail, setUserEmail] = useState('');

  const handleForgotPasswordSubmit = (data: ForgotPasswordData) => {
    // Simulate API call to send SMS
    console.log('Sending reset code to:', data.emailOrUsername);
    setUserEmail(data.emailOrUsername);
    setCurrentStep('sms');
  };

  const handleSMSSubmit = (data: SMSVerificationData) => {
    // Simulate API call to verify SMS code
    console.log('Verifying SMS code:', data.code);
    setCurrentStep('reset');
  };

  const handleResetPasswordSubmit = (data: ResetPasswordData) => {
    // Simulate API call to reset password
    console.log('Resetting password with:', {
      email: userEmail,
      newPassword: data.newPassword,
    });
    // Redirect to sign in
    window.location.href = '/signin';
  };

  const handleResendCode = () => {
    console.log('Resending SMS code to:', userEmail);
    // Simulate resending code
  };

  return (
    <AuthLayout logo={TroscLogo}>
      {currentStep === 'forgot' && (
        <ForgotPasswordForm onSubmit={handleForgotPasswordSubmit} />
      )}
      {currentStep === 'sms' && (
        <SMSVerificationForm
          onSubmit={handleSMSSubmit}
          onResendCode={handleResendCode}
        />
      )}
      {currentStep === 'reset' && (
        <ResetPasswordForm onSubmit={handleResetPasswordSubmit} />
      )}
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
