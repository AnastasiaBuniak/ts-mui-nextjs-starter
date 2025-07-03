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
import dayjs from 'dayjs';
import { DATE_FORMAT } from '../../../utils/constants';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../../context/AuthContext';
import { useGetUserRules } from './hooks';

type Visit = {
  entry: string; // 'DD/MM/YYYY'
  exit: string; // 'DD/MM/YYYY'
  duration: number; // in days
};

const getTotalDays = (visits: Visit[]) =>
  visits.reduce((sum, v) => sum + v.duration, 0);

const getColor = (days: number) => {
  if (days >= 90) return 'error.main'; // red
  if (days >= 60) return 'warning.main'; // yellow
  return 'success.main'; // green
};

export type Props = {
  type: 'DashboardSection';
};

export const DashboardSection: React.FC = () => {
  const { user } = useAuth();
  const { rules } = useGetUserRules(user.id);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <List>
        {rules.map((country, idx) => {
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
                          <TableCell>
                            {dayjs(visit.startDate).format(DATE_FORMAT)}
                          </TableCell>
                          <TableCell>
                            {dayjs(visit.endDate).format(DATE_FORMAT)}
                          </TableCell>
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
