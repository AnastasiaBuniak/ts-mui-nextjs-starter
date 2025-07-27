import * as React from 'react';
import { useAuth } from '../../context/AuthContext';
// Assuming useManageUserVisits is still needed, otherwise remove if not used in this component
import { useManageUserVisits } from './hooks';
import {
  Typography,
  List,
  Container,
  IconButton,
  Button,
  TextField // Import TextField for input fields
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Dialog specific imports
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';

// Assuming ExtendedPolicy and PolicyCard are defined elsewhere
import { ExtendedPolicy } from 'src/types/data';
import { PolicyCard } from './Policy';
import { describe } from 'node:test';

// Styled dialog component (same as your example)
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

export type Props = {};

export const AddNewPolicyBlock: React.FC<Props> = ({ addPolicy }) => {
  const { user } = useAuth(); // Keeping if user context is used elsewhere or for future features

  const [open, setOpen] = React.useState(false);
  const [policyName, setPolicyName] = React.useState('');
  const [policyDescription, setPolicyDescription] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Optionally reset input fields when dialog closes
    setPolicyName('');
    setPolicyDescription('');
  };

  const handleCreatePolicy = () => {
    // Here you would typically handle the creation of the policy
    // using policyName and policyDescription.
    console.log('Creating policy with:', {
      name: policyName,
      description: policyDescription
    });
    addPolicy({ name: policyName, description: policyDescription });

    // For example, you might call an API or dispatch an action
    // Then close the dialog
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
            sx={{ mb: 2 }} // Margin bottom for spacing
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            multiline // Allows for multiple lines of text
            rows={4} // Sets the initial number of rows
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
