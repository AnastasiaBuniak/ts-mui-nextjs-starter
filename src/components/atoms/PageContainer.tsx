import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

interface PageContainerProps {
  children: React.ReactNode;
  pageType?: string;
  noHeader?: boolean;
  id?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  pageType,
  noHeader,
  id
}) => {
  if (pageType === 'Dashboard') {
    return (
      <Box
        data-sb-object-id={id}
        sx={{
          px: noHeader ? 0 : 3,
          backgroundColor: '#00b0ff',
          minHeight: '100vh'
        }}
      >
        <Container maxWidth={noHeader ? false : 'lg'} disableGutters={true}>
          {children}
        </Container>
      </Box>
    );
  }
  return (
    <Box sx={{ px: noHeader ? 0 : 3 }} data-sb-object-id={id}>
      <Container maxWidth={noHeader ? false : 'lg'} disableGutters={true}>
        {children}
      </Container>
    </Box>
  );
};

export default PageContainer;
