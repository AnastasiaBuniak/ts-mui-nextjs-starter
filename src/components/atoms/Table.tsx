import React from 'react';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import { DATE_FORMAT } from 'src/utils/constants';

interface TableProps {
  data: { enter: Dayjs | null; exit: Dayjs | null; days: number }[];
  onDelete: (index: number) => void;
}

const CustomTable: React.FC<TableProps> = ({ data, onDelete }) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: '4px' }}>
      <Table>
        <TableHead>
          <TableRow sx={{ fontWeight: 'bold' }}>
            <TableCell>Enter</TableCell>
            <TableCell>Exit</TableCell>
            <TableCell>Days</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{dayjs(row.enter).format(DATE_FORMAT)}</TableCell>
              <TableCell>{dayjs(row.exit).format(DATE_FORMAT)}</TableCell>
              <TableCell>{row.days}</TableCell>
              <TableCell>
                <IconButton onClick={() => onDelete(index)} aria-label="delete">
                  <DeleteIcon color="primary" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
