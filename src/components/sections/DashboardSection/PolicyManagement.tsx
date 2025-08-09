import React, { useState } from 'react';
import {
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Policy } from 'src/types/data';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DeletePolicyParams, EditPolicyParams } from 'src/types/api-types';

export type Props = {
  policy: Policy;
  onDeletePolicy: ({ id }: DeletePolicyParams) => void;
  onEditPolicy: ({ id, name, description }: EditPolicyParams) => void;
};

export const PolicyManagement: React.FC<Props> = ({
  policy,
  onDeletePolicy,
  onEditPolicy
}) => {
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [policyToDeleteId, setPolicyToDeleteId] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState(policy.name);
  const [editDescription, setEditDescription] = useState(policy.description);

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

  const handleConfirmEdit = () => {
    // Add your edit logic here
    setEditOpen(false);
    onEditPolicy({
      id: policy._id,
      name: editName,
      description: editDescription
    });
  };

  return (
    <>
      <Box
        sx={{ display: 'flex', gap: 1, position: 'absolute', top: 0, right: 0 }}
      >
        <IconButton
          aria-label="edit policy"
          onClick={() => setEditOpen(true)}
          sx={{ color: 'white' }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="delete policy"
          onClick={() => handleDeleteClick(policy._id)}
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
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Policy</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              fullWidth
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setEditOpen(false)}
            variant="outlined"
            sx={{ color: 'black', borderColor: 'grey.400' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmEdit}
            variant="contained"
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
