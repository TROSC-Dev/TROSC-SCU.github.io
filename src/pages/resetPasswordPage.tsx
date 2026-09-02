import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthLayout from '../layout/AuthLayout';
import ResetPasswordForm from '../components/ResetPasswordForm';
import TroscLogo from '../../Assests/TroscLogoRed.webp';
import * as api from '../services/api';

const ResetPasswordPage = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (data: { newPassword: string; confirmPassword: string }) => {
    setServerError(null);
    if (!token) {
      setServerError('Invalid or missing reset token. Please request a new link.');
      return;
    }
    try {
      await api.resetPassword({
        token,
        password: data.newPassword,
        passwordConfirm: data.confirmPassword,
      });
      navigate('/signin');
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : 'Failed to reset password. Please try again.',
      );
    }
  };

  return (
    <AuthLayout logo={TroscLogo}>
      <ResetPasswordForm onSubmit={handleSubmit} serverError={serverError} />
    </AuthLayout>
  );
};

export default ResetPasswordPage;
