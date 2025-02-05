import React, { useState } from 'react';
import {Dayjs} from 'dayjs';
import { Button, Box } from '@mui/material';
import Input from './CalendarInput';


interface FormProps {
    enterTitle?: string;
    exitTitle?: string;
    addButtonText?: string;
    handleSubmit: ({enter, exit}: { enter: Dayjs | null, exit: Dayjs | null }) => void;
}

const Form: React.FC<FormProps> = (props) => {
  const [enter, setEnter] = useState<Dayjs | null>(null);
  const [exit, setExit] = useState<Dayjs | null>(null);
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.handleSubmit({ enter, exit });
  };

  return (
      <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'center' }}>
        <Input
          label={props.enterTitle as string}
          value={enter}
          onChange={(val) => setEnter(val)}
        />
        <Input
          label={props.exitTitle as string}
          value={exit}
          onChange={(val) => setExit(val)}
        />
        <Button type="submit" size='large' variant="contained" color="secondary">
          {props.addButtonText}
        </Button>
      </Box>
  );
};

export default Form;

