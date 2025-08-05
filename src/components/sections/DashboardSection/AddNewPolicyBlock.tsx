import * as React from 'react';
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
    console.log('Creating policy with:', {
      name: policyName,
      description: policyDescription
    });
    addPolicy({ name: policyName, description: policyDescription });
    handleClose();
  };

  return (
    <Container maxWidth="lg" sx={{ bgcolor: '#f5f5f5', borderRadius: 3 }}>
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
        <IconButton onClick={handleClickOpen} aria-label="add policy">
          <AddIcon color="primary" />
        </IconButton>
      </Container>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="add-policy-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="add-policy-dialog-title">
          Add New Policy
        </DialogTitle>
        <IconButton
          aria-label="close"
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
            label="Policy Name"
            type="text"
            fullWidth
            variant="outlined"
            value={policyName}
            onChange={(e) => setPolicyName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={policyDescription}
            onChange={(e) => setPolicyDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button autoFocus onClick={handleCreatePolicy} variant="contained">
            Create
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Container>
  );
};
