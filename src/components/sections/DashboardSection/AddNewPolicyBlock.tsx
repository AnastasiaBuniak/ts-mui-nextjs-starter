import * as React from 'react';
import { useTranslation } from 'next-i18next';
import { useAuth } from '../../context/AuthContext';
import { Container, IconButton, Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import { CreatePolicyParams } from 'src/types/api-types';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

export type Props = {
  addPolicy: ({ name, description }: CreatePolicyParams) => void;
};

export const AddNewPolicyBlock: React.FC<Props> = ({ addPolicy }) => {
  const { t } = useTranslation('common');
  const { user } = useAuth();

  const [open, setOpen] = React.useState(false);
  const [policyName, setPolicyName] = React.useState('');
  const [policyDescription, setPolicyDescription] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPolicyName('');
    setPolicyDescription('');
  };

  const handleCreatePolicy = () => {
    addPolicy({ name: policyName, description: policyDescription });
    handleClose();
  };

  return (
    <Container maxWidth="lg" sx={{ bgcolor: '#f5f5f5' }}>
      <Container
        maxWidth="md"
        sx={{
          py: 4,
          bgcolor: '#f5f5f5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <IconButton
          onClick={handleClickOpen}
          aria-label={t('dashboard.addPolicyAria')}
        >
          <AddIcon color="primary" />
        </IconButton>
      </Container>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="add-policy-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="add-policy-dialog-title">
          {t('dashboard.addNewPolicy')}
        </DialogTitle>
        <IconButton
          aria-label={t('common.close')}
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500]
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={t('dashboard.policyNameLabel')}
            type="text"
            fullWidth
            variant="outlined"
            value={policyName}
            onChange={(e) => setPolicyName(e.target.value)}
            sx={{ mb: 2 }}
            error={policyName.length > 40}
          />
          <TextField
            margin="dense"
            id="description"
            label={t('dashboard.descriptionLabel')}
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={policyDescription}
            onChange={(e) => setPolicyDescription(e.target.value)}
            error={policyDescription.length > 500}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('common.cancel')}</Button>
          <Button
            autoFocus
            onClick={handleCreatePolicy}
            variant="contained"
            disabled={
              policyName.trim() === '' ||
              policyName.length > 40 ||
              policyDescription.length > 500
            }
          >
            {t('common.create')}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Container>
  );
};
