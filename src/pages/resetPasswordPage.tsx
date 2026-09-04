import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthLayout from '../layout/AuthLayout';
import ResetPasswordForm from '../components/ResetPasswordForm';
import TroscLogo from '../../Assests/TroscLogoRed.webp';
import * as api from '../services/api';

const ResetPasswordPage = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const handleSubmit = async (data: { newPassword: string; confirmPassword: string }) => {
    if (!token) {
      toast.error('Invalid or missing reset token. Please request a new link.');
      return;
    }
    try {
      await api.resetPassword({
        token,
        password: data.newPassword,
        passwordConfirm: data.confirmPassword,
      });
      toast.success('Password reset successfully. Please sign in.');
      navigate('/signin');
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Failed to reset password. Please try again.',
      );
    }
  };

  return (
    <AuthLayout logo={TroscLogo}>
      <ResetPasswordForm onSubmit={handleSubmit} />
    </AuthLayout>
  );
};

export default ResetPasswordPage;
