import React from 'react';
import {Dayjs} from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


interface InputProps {
  label: string;
  value: Dayjs | null;
  onChange: (date: Dayjs | null) => void;
}

const Input: React.FC<InputProps> = ({ label, value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        format="DD/MM/YYYY"
        sx={{alignSelf: 'center', minWidth: '230px'}}
      />
    </LocalizationProvider>
  );
};

export default Input;