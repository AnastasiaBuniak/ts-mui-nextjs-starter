import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { useRouter } from 'next/router';
import { CircularProgress, Box } from '@mui/material';
import { localePath } from 'src/utils/i18n';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      const locale = router.locale || router.defaultLocale || 'en';
      router.push(localePath('/login', locale));
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
