import { logout } from 'src/api/auth';
import { deleteAccount } from 'src/api/user';
import { getStoredLocale, localePath } from 'src/utils/i18n';

export const userHeaderFeatures = ({
  userId,
  locale
}: {
  userId?: string;
  locale?: string;
}) => {
  const activeLocale = locale || getStoredLocale();

  const logoutUser = async () => {
    await logout();
    window.location.href = localePath('/', activeLocale);
  };

  const deleteUserAccount = async () => {
    await deleteAccount({ userId: userId || '' });
    window.location.href = localePath('/signup', activeLocale);
  };

  return { logoutUser, deleteUserAccount };
};
