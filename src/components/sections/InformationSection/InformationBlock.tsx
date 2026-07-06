import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Container from '@mui/material/Container';
import CircleIcon from '@mui/icons-material/Circle';

export type InformationBlockProps = {
  title: string;
  description?: string;
  keyPoints: string[];
  fieldPath?: string;
};

export const InformationBlock: React.FC<InformationBlockProps> = ({
  title,
  description,
  keyPoints,
  fieldPath
}) => {
  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: '#EFF5FB',
        borderRadius: '4px',
        mb: 2
      }}
      data-sb-field-path={fieldPath}
    >
      <Container maxWidth="lg" disableGutters={true}>
        <Typography
          component="h2"
          variant="h5"
          gutterBottom
          data-sb-field-path={fieldPath ? '.title' : undefined}
        >
          {title}
        </Typography>
        {description && (
          <Typography
            sx={{ marginBottom: '0', fontWeight: 'bold' }}
            variant="body1"
            paragraph
            data-sb-field-path={fieldPath ? '.description' : undefined}
          >
            {description}
          </Typography>
        )}
        <List data-sb-field-path={fieldPath ? '.keyPoints' : undefined}>
          {keyPoints.map((point, index) => (
            <ListItem
              key={index}
              sx={{
                paddingBottom: '2px',
                paddingTop: '2px',
                paddingLeft: '8px'
              }}
              data-sb-field-path={fieldPath ? `.${index}` : undefined}
            >
              <ListItemIcon sx={{ minWidth: '30px' }}>
                <CircleIcon color="primary" fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={point} />
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
};
