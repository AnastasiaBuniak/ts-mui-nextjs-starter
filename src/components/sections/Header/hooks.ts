import { useAuth } from 'src/components/context/AuthContext';
import { logout } from 'src/api/auth';
import { deleteAccount } from 'src/api/user';

export const userHeaderFeatures = () => {
  const { user } = useAuth();

  const logoutUser = async () => {
    await logout();
    window.location.href = '/login';
  };

  const deleteUserAccount = async () => {
    const userId = user?.id;
    await deleteAccount({ userId: userId || '' });
    window.location.href = '/signup';
  };

  return { logoutUser, deleteUserAccount };
};
