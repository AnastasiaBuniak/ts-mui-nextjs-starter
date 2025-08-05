import React, { useState } from 'react';
import {
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Policy } from 'src/types/data';

import DeleteIcon from '@mui/icons-material/Delete';

export type Props = {
  country: Policy;
  onDeletePolicy: (policyId: string) => void;
};

export const PolicyManagement: React.FC<Props> = ({
  country,
  onDeletePolicy
}) => {
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [policyToDeleteId, setPolicyToDeleteId] = useState<string | null>(null);

  const handleDeleteClick = (policyId: string) => {
    setPolicyToDeleteId(policyId);
    setOpenDeleteConfirm(true);
  };

  const handleCloseDeleteConfirm = () => {
    setOpenDeleteConfirm(false);
    setPolicyToDeleteId(null);
  };

  const handleConfirmDelete = () => {
    if (policyToDeleteId) {
      onDeletePolicy({ id: policyToDeleteId });
    }
    handleCloseDeleteConfirm();
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <IconButton
          aria-label="delete policy"
          onClick={() => handleDeleteClick(country._id)}
          sx={{ color: 'white' }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
      <Dialog open={openDeleteConfirm} onClose={handleCloseDeleteConfirm}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>Do you really want to delete this policy?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDeleteConfirm}
            variant="outlined"
            sx={{ color: 'black', borderColor: 'grey.400' }}
          >
            No
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            sx={{
              backgroundColor: '#f44336',
              '&:hover': {
                backgroundColor: '#d32f2f'
              }
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
