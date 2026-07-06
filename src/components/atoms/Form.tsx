import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CalendarInput from './CalendarInput';
import CalendarButton from './CalendarButton';
import { Dayjs } from 'dayjs';
import { TaxResidencyMode } from 'src/utils/taxResidencyUtils';
import { PolicyType } from 'src/types/data';

interface FormProps {
  enterTitle?: string;
  exitTitle?: string;
  addButtonText?: string;
  selectedDateText: string;
  handleSubmit: ({ entry, exit }: { entry: Dayjs; exit: Dayjs }) => void;
  rule?: PolicyType;
  onRuleChange?: (rule: PolicyType) => void;
  taxMode?: TaxResidencyMode;
  onTaxModeChange?: (mode: TaxResidencyMode) => void;
}

const Form: React.FC<FormProps> = (props) => {
  const { t } = useTranslation('common');
  const [entry, setEnter] = useState<Dayjs | null>(null);
  const [exit, setExit] = useState<Dayjs | null>(null);
  const [defaultExit, setDefaultExit] = useState<Dayjs | undefined>(undefined);
  const [selectedRuleState, setSelectedRuleState] = useState<PolicyType>(
    PolicyType.Schengen90_180
  );
  const [taxModeState, setTaxModeState] =
    useState<TaxResidencyMode>('calendar');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const selectedRule = props.rule ?? selectedRuleState;
  const selectedTaxMode = props.taxMode ?? taxModeState;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (entry !== null && exit !== null) {
      props.handleSubmit({ entry, exit });
    }
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
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center'
      }}
    >
      {/* 1st line: rule selector (+ tax options when applicable) */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 2,
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <TextField
          select
          label={t('form.visaRule')}
          value={selectedRule}
          onChange={(event) => {
            const newRule = event.target.value as PolicyType;
            setSelectedRuleState(newRule);
            props.onRuleChange?.(newRule);
          }}
          sx={{
            minWidth: '230px',
            minHeight: '56px'
          }}
        >
          <MenuItem value={PolicyType.Schengen90_180}>
            {t('form.schengenRule')}
          </MenuItem>
          <MenuItem value={PolicyType.Tax183}>{t('form.tax183Rule')}</MenuItem>
        </TextField>

        {selectedRule === PolicyType.Tax183 && (
          <>
            <TextField
              select
              label={t('form.taxWindow')}
              value={selectedTaxMode}
              onChange={(event) => {
                const newMode = event.target.value as TaxResidencyMode;
                setTaxModeState(newMode);
                props.onTaxModeChange?.(newMode);
              }}
              sx={{
                minWidth: '230px',
                minHeight: '56px'
              }}
            >
              <MenuItem value="calendar">{t('form.calendarYear')}</MenuItem>
              <MenuItem value="rolling">{t('form.rollingWindow')}</MenuItem>
            </TextField>
          </>
        )}
      </Box>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ width: '100%', textAlign: 'center' }}
      >
        {selectedRule === PolicyType.Tax183
          ? t('form.taxCaption')
          : t('form.schengenCaption')}
      </Typography>

      {/* 2nd line: dates + button */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 2,
          justifyContent: 'center',
          width: '100%'
        }}
      >
        {isMobile ? (
          <>
            <CalendarButton
              selectedDateText={
                props.selectedDateText || t('form.selectedDate')
              }
              label={props.enterTitle || t('form.dateOfEntry')}
              onChange={(val) => setEnter(val)}
            />
            <CalendarButton
              selectedDateText={
                props.selectedDateText || t('form.selectedDate')
              }
              label={props.exitTitle || t('form.dateOfExit')}
              onChange={(val) => setExit(val)}
            />
          </>
        ) : (
          <>
            <CalendarInput
              label={props.enterTitle || t('form.dateOfEntry')}
              value={entry}
              onChange={(val) => {
                setEnter(val), setDefaultExit(val as Dayjs);
              }}
            />
            <CalendarInput
              label={props.exitTitle || t('form.dateOfExit')}
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
          disabled={!entry || !exit}
          sx={{
            textTransform: 'initial',
            alignSelf: 'center',
            minWidth: '230px',
            minHeight: '56px'
          }}
        >
          {props.addButtonText || t('form.addDates')}
        </Button>
      </Box>
    </Box>
  );
};

export default Form;
