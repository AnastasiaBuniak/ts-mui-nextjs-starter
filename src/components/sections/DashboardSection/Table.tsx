// components/DashboardSection.tsx
import React from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '../../../utils/constants';
import { Visit, Policy } from '../../../types/data';

interface Props {
  country: Policy;
  deleteVisit: (visitId: string) => () => void;
  tableHeadStyles?: React.CSSProperties;
}
export const Table: React.FC<Props> = ({
  country,
  deleteVisit,
  tableHeadStyles = {}
}) => {
  return (
    <TableContainer component={Paper} elevation={0}>
      <MuiTable size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: '#f5f5f5', ...tableHeadStyles }}>
            <TableCell>Entry</TableCell>
            <TableCell>Exit</TableCell>
            <TableCell>Duration (days)</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {country.visits?.map((visit: Visit) => (
            <TableRow key={visit._id}>
              <TableCell>{dayjs(visit.entry).format(DATE_FORMAT)}</TableCell>
              <TableCell>{dayjs(visit.exit).format(DATE_FORMAT)}</TableCell>
              <TableCell>
                {dayjs(visit.exit).diff(visit.entry, 'day') + 1}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  color="error"
                  size="small"
                  onClick={deleteVisit(visit._id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};
