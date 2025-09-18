import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export type TermItem = {
  title: string;
  description: string;
};

export type Props = {
  type: 'Terms';
  title: string;
  description: string;
  items: TermItem[];
};

export const Terms: React.FC<Props> = ({ title, items, description }) => {
  return (
    <Box component="main" sx={{ maxWidth: 800, mx: 'auto', px: 3, py: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" paragraph>
        {description}
      </Typography>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <Typography variant="h6" component="h2" gutterBottom>
            {index + 1}. {item.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {item.description}
          </Typography>
        </React.Fragment>
      ))}
    </Box>
  );
};
