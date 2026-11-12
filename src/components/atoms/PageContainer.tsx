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
          backgroundColor: 'background.default',
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
    <Box
      sx={{
        bgcolor: noHeader ? 'transparent' : 'background.default',
        minHeight: '100vh'
      }}
      data-sb-object-id={id}
    >
      {children}
    </Box>
  );
};

export default PageContainer;
