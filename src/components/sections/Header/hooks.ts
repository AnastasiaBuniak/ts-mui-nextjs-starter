import { logout } from 'src/api/auth';
import { deleteAccount } from 'src/api/user';

export const userHeaderFeatures = ({ userId }: { userId?: string }) => {
  const logoutUser = async () => {
    await logout();
    window.location.href = '/login';
  };

  const deleteUserAccount = async () => {
    await deleteAccount({ userId: userId || '' });
    window.location.href = '/signup';
  };

  return { logoutUser, deleteUserAccount };
};
