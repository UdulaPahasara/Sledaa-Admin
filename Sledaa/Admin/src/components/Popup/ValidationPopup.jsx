import React from 'react';
import { Dialog, Typography, Button } from '@mui/material';

const ValidationPopup = ({ open, onClose, message }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableScrollLock={true}
      maxWidth={false}
      disableRestoreFocus
      slotProps={{
        paper: {
          sx: {
            width: '300px',
            minHeight: '150px',
            borderRadius: '10.53px',
            backgroundColor: 'rgba(243, 243, 243, 1)',
            position: 'relative',
            boxSizing: 'border-box',
            overflow: 'hidden',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '25px 20px',
            maxWidth: 'none',
          }
        }
      }}
    >
      {/* Message */}
      <Typography
        sx={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 500,
          fontSize: '15px',
          color: 'rgba(0, 0, 0, 1)',
          textAlign: 'center',
          lineHeight: '22px',
          mb: '25px'
        }}
      >
        {message}
      </Typography>

      {/* OK Button */}
      <Button
        onClick={onClose}
        variant="contained"
        sx={{
          width: '77.19px',
          height: '28.07px',
          borderRadius: '7.02px',
          backgroundColor: 'rgba(0, 28, 165, 1)',
          color: '#fff',
          textTransform: 'none',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 500,
          fontSize: '12px',
          padding: 0,
          minWidth: 0,
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: 'rgba(0, 20, 120, 1)',
            boxShadow: 'none',
          }
        }}
      >
        OK
      </Button>
    </Dialog>
  );
};

export default ValidationPopup;
