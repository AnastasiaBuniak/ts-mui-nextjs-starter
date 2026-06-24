import React from 'react';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
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
  data: { entry: Dayjs | null | string; exit: Dayjs | null | string }[];
  onDelete: (item: object) => void;
  tableHeadStyles?: React.CSSProperties;
}

const CustomTable: React.FC<TableProps> = ({
  data,
  onDelete,
  tableHeadStyles
}) => {
  const { t } = useTranslation('common');

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table>
        <TableHead>
          <TableRow sx={{ ...tableHeadStyles }}>
            <TableCell>{t('table.entry')}</TableCell>
            <TableCell>{t('table.exit')}</TableCell>
            <TableCell>{t('table.duration')}</TableCell>
            <TableCell>{t('table.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{dayjs(row.entry).format(DATE_FORMAT)}</TableCell>
              <TableCell>{dayjs(row.exit).format(DATE_FORMAT)}</TableCell>
              <TableCell>
                {dayjs(row.exit).diff(row.entry, 'day') + 1}
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => onDelete({ ...row, index })}
                  aria-label={t('table.deleteAria')}
                >
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
