import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon, Container } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { INFORMATION_SECTION_ID } from 'src/utils/constants';

export type Props = {
    type: 'InformationSection';
    title: string;
    description: string;
    keyPoints: string[];
};

export const InformationSection: React.FC<Props> = ({ title, description, keyPoints }) => {
    return (
        <Box
            id={INFORMATION_SECTION_ID}
            sx={{
                p: 2,
                backgroundColor: '#EFF5FB',
                borderRadius: '4px',
                mb: 2
            }}
        >
            <Container maxWidth="lg" disableGutters={true}>
                <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>
                <Typography sx={{ marginBottom: '0', fontWeight: 'bold' }} variant="body1" paragraph>
                    {description}
                </Typography>
                <List>
                    {keyPoints.map((point, index) => (
                        <ListItem
                            key={index}
                            sx={{
                                paddingBottom: '2px',
                                paddingTop: '2px',
                                paddingLeft: '8px'
                            }}
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
