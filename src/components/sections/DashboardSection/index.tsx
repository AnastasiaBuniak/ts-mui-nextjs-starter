// components/DashboardSection.tsx
import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  List,
  Container
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';

type Visit = {
  entry: string; // 'DD/MM/YYYY'
  exit: string; // 'DD/MM/YYYY'
  duration: number; // in days
};

type CountryData = {
  name: string;
  visits: Visit[];
};

const countriesData: CountryData[] = [
  {
    name: 'France',
    visits: [
      { entry: '01/01/2024', exit: '08/01/2024', duration: 7 },
      { entry: '15/03/2024', exit: '20/03/2024', duration: 5 }
    ]
  },
  {
    name: 'Spain',
    visits: [{ entry: '10/02/2024', exit: '17/02/2024', duration: 7 }]
  }
];

const getTotalDays = (visits: Visit[]) =>
  visits.reduce((sum, v) => sum + v.duration, 0);

const getColor = (days: number) => {
  if (days >= 90) return 'error.main'; // red
  if (days >= 60) return 'warning.main'; // yellow
  return 'success.main'; // green
};

export type Props = {
  type: 'InformationSection';
};

export const DashboardSection: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <List>
        {countriesData.map((country, idx) => {
          const totalDays = getTotalDays(country.visits);
          const bgColor = getColor(totalDays);

          return (
            <Accordion key={idx}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ bgcolor: bgColor, color: '#fff' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%'
                  }}
                >
                  <Typography variant="subtitle1">{country.name}</Typography>
                  <Typography variant="subtitle2">{`${totalDays}/180`}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Entry</TableCell>
                        <TableCell>Exit</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {country.visits.map((visit, i) => (
                        <TableRow key={i}>
                          <TableCell>{visit.entry}</TableCell>
                          <TableCell>{visit.exit}</TableCell>
                          <TableCell>{visit.duration}d</TableCell>
                          <TableCell align="right">
                            <IconButton color="error" size="small">
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </List>
    </Container>
  );
};
