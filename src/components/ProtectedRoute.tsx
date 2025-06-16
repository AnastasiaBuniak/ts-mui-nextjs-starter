import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { useRouter } from 'next/router';
import { CircularProgress, Box } from '@mui/material';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login'); // or wherever your login page is
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
