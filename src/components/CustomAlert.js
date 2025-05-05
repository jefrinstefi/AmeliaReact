import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';

const CustomAlert = ({ open, title, message, onClose, onConfirm, confirmText = "Yes", cancelText = "Cancel" }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          backgroundColor: '#fff',
          padding: 2,
          maxWidth: 400,
          textAlign: 'center'
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" sx={{ color: '#5E43B2', fontWeight: 600 }}>{title}</Typography>
      </DialogTitle>

      <DialogContent>
        <Typography sx={{ color: '#333', fontSize: 14 }}>{message}</Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: '#5E43B2',
            color: '#5E43B2',
            borderRadius: 2,
            textTransform: 'none',
            px: 3,
            '&:hover': {
              backgroundColor: '#f3f0fd',
              borderColor: '#5E43B2',
            }
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            backgroundColor: '#5E43B2',
            color: '#fff',
            borderRadius: 2,
            textTransform: 'none',
            px: 3,
            ml: 1,
            '&:hover': {
              backgroundColor: '#4F2580',
            }
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomAlert;
