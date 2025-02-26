import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CalendarInput from './CalendarInput';
import CalendarButton from './CalendarButton';
import { Dayjs } from 'dayjs';

interface FormProps {
  enterTitle?: string;
  exitTitle?: string;
  addButtonText?: string;
  handleSubmit: ({
    enter,
    exit
  }: {
    enter: Dayjs | null;
    exit: Dayjs | null;
  }) => void;
}

const Form: React.FC<FormProps> = (props) => {
  const [enter, setEnter] = useState<Dayjs | null>(null);
  const [exit, setExit] = useState<Dayjs | null>(null);
  const [defaultExit, setDefaultExit] = useState<Dayjs | undefined>(undefined);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.handleSubmit({ enter, exit });
    setEnter(null);
    setExit(null);
  };

  return (
    <Box
      mb={4}
      component="form"
      onSubmit={onSubmit}
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: 2,
        justifyContent: 'center'
      }}
    >
      {isMobile ? (
        <>
          <CalendarButton
            label={props.enterTitle as string}
            onChange={(val) => setEnter(val)}
          />
          <CalendarButton
            label={props.exitTitle as string}
            onChange={(val) => setExit(val)}
          />
        </>
      ) : (
        <>
          <CalendarInput
            label={props.enterTitle as string}
            value={enter}
            onChange={(val) => {
              setEnter(val), setDefaultExit(val as Dayjs);
            }}
          />
          <CalendarInput
            label={props.exitTitle as string}
            value={exit}
            onChange={(val) => setExit(val)}
            defaultValue={defaultExit}
          />
        </>
      )}
      <Button
        type="submit"
        size="large"
        variant="contained"
        color="secondary"
        disabled={!enter || !exit}
        sx={{
          textTransform: 'initial',
          alignSelf: 'center',
          minWidth: '230px',
          minHeight: '56px'
        }}
      >
        {props.addButtonText}
      </Button>
    </Box>
  );
};

export default Form;
