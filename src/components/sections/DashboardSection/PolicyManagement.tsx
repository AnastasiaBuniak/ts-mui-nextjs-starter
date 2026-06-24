import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
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
import { useTheme } from '@mui/material';

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
  const { t } = useTranslation('common');
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [policyToDeleteId, setPolicyToDeleteId] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState(policy.name);
  const [editDescription, setEditDescription] = useState(policy.description);
  const theme = useTheme();

  const handleDeleteClick = (policyId: string) => {
    setPolicyToDeleteId(policyId);
    setEditOpen(false);
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
    setEditOpen(false);
    return onEditPolicy({
      id: policy._id,
      name: editName,
      description: editDescription
    });
  };

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          p: 1
        }}
      >
        <IconButton
          aria-label={t('dashboard.editPolicyAria')}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setEditOpen(true);
          }}
          sx={{ color: theme.palette.primary.main }}
        >
          <EditIcon />
        </IconButton>
      </Box>
      <Dialog open={openDeleteConfirm} onClose={handleCloseDeleteConfirm}>
        <DialogTitle>{t('dashboard.deleteConfirmTitle')}</DialogTitle>
        <DialogContent>
          <Typography>{t('dashboard.deleteConfirm')}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDeleteConfirm}
            variant="outlined"
            sx={{ color: 'black', borderColor: 'grey.400' }}
          >
            {t('common.no')}
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
            {t('common.yes')}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{t('dashboard.editPolicy')}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label={t('dashboard.nameLabel')}
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              fullWidth
              error={editName.length > 40}
            />
            <TextField
              label={t('dashboard.descriptionLabel')}
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              fullWidth
              multiline
              rows={3}
              error={editDescription.length > 500}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteClick(policy._id)}
            sx={{ mr: 'auto' }}
          >
            {t('dashboard.deleteCard')}
          </Button>
          <Button
            onClick={() => setEditOpen(false)}
            variant="outlined"
            sx={{ color: 'black', borderColor: 'grey.400' }}
          >
            {t('common.cancel')}
          </Button>
          <Button
            onClick={handleConfirmEdit}
            variant="contained"
            color="primary"
            disabled={
              editDescription.length > 500 ||
              editName.trim() === '' ||
              editName.length > 40
            }
          >
            {t('common.confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
