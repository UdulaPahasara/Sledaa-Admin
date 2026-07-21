import React from 'react';
import { Dialog, Box, Typography, Button } from '@mui/material';
import checkIcon from '../../assets/Popup/check.webp';

const AreYouSure = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      disableRestoreFocus
      slotProps={{
        paper: {
          sx: {
            width: '207.7px',
            height: '166.3px',
            borderRadius: '10.53px',
            backgroundColor: 'rgba(243, 243, 243, 1)',
            position: 'relative',
            boxSizing: 'border-box',
            overflow: 'hidden',
            margin: 0,
            maxWidth: 'none',
          }
        }
      }}
    >
      {/* Check Icon */}
      <Box
        component="img"
        src={checkIcon}
        alt="Confirm"
        sx={{
          position: 'absolute',
          top: '18.24px',
          left: '79.29px',
          width: '49.12px',
          height: '49.12px',
          objectFit: 'contain',
        }}
      />

      {/* Title */}
      <Typography
        sx={{
          position: 'absolute',
          top: '80px',
          left: '0',
          width: '100%',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 500,
          fontSize: '17.54px',
          color: 'rgba(0, 0, 0, 1)',
          textAlign: 'center',
          lineHeight: '17.54px',
        }}
      >
        Are You Sure
      </Typography>

      {/* NO Button */}
      <Button
        onClick={onClose}
        variant="outlined"
        sx={{
          position: 'absolute',
          top: '113px',
          left: '21px',
          width: '77.19px',
          height: '28.07px',
          borderRadius: '7.02px',
          borderColor: 'rgba(0, 28, 165, 1)',
          borderWidth: '0.7px',
          color: 'rgba(0, 28, 165, 1)',
          textTransform: 'none',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 500,
          fontSize: '12px',
          padding: 0,
          minWidth: 0,
          '&:hover': {
            borderWidth: '0.7px',
            borderColor: 'rgba(0, 20, 120, 1)',
            backgroundColor: 'rgba(0, 28, 165, 0.04)',
          }
        }}
      >
        NO
      </Button>

      {/* YES Button */}
      <Button
        onClick={onConfirm}
        variant="contained"
        sx={{
          position: 'absolute',
          top: '113px',
          left: '109px',
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
        YES
      </Button>
    </Dialog>
  );
};

export default AreYouSure;
