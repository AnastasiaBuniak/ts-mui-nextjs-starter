import React, { useState } from 'react';
import { Dayjs } from 'dayjs';
import { IconButton, Box, Typography, Popover } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DATE_FORMAT } from 'src/utils/constants';

interface CalendarButtonProps {
    label: string;
    onChange: (date: Dayjs | null) => void;
}

const CalendarButton: React.FC<CalendarButtonProps> = ({ label, onChange }) => {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDateChange = (date: Dayjs | null) => {
        setSelectedDate(date);
        handleClose();
        onChange(date);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'date-calendar-popover' : undefined;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2
                }}
            >
                {selectedDate ? (
                    <Typography>Selected date: {selectedDate.format(DATE_FORMAT)}</Typography>
                ) : (
                    <>
                        <Typography>{label}:</Typography>
                    </>
                )}
                <IconButton color="primary" onClick={handleClick}>
                    <CalendarTodayIcon />
                </IconButton>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                    }}
                >
                    <DateCalendar value={selectedDate} onChange={handleDateChange} />
                </Popover>
            </Box>
        </LocalizationProvider>
    );
};

export default CalendarButton;
