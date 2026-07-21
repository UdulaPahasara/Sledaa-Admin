import React from 'react';
import {
  Dialog,
  Box,
  Typography,
  Button,
  IconButton,
  InputBase
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const AddMember = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      slotProps={{
        paper: {
          sx: {
            width: '100%',
            maxWidth: '540px',
            borderRadius: '10px',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            position: 'relative',
            boxSizing: 'border-box',
            padding: { xs: '40px 20px 24px 20px', sm: '32px 40px' },
            margin: { xs: '24px 12px', sm: '32px auto' },
            maxHeight: 'calc(100% - 64px)',
            overflowY: 'auto'
          }
        }
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          width: '24px',
          height: '24px',
          color: '#000',
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* ── Name Section ── */}
      <Box sx={{ width: '100%', mb: '24px' }}>
        <Typography
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '20px',
            color: 'rgba(117, 117, 117, 1)',
            mb: '8px'
          }}
        >
          Enter Name
        </Typography>
        <InputBase
          placeholder="Name"
          sx={{
            width: '100%',
            maxWidth: '462px',
            height: '50px',
            backgroundColor: 'rgba(243, 243, 243, 1)',
            borderRadius: '5px',
            padding: '6px 16px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            color: '#000',
            '& input::placeholder': {
              color: 'rgba(150, 150, 150, 1)',
              opacity: 1,
            }
          }}
        />
      </Box>

      {/* ── Title Section ── */}
      <Box sx={{ width: '100%', mb: '24px' }}>
        <Typography
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '20px',
            color: 'rgba(117, 117, 117, 1)',
            mb: '8px'
          }}
        >
          Enter Title
        </Typography>
        <InputBase
          placeholder="Title"
          sx={{
            width: '100%',
            maxWidth: '462px',
            height: '50px',
            backgroundColor: 'rgba(243, 243, 243, 1)',
            borderRadius: '5px',
            padding: '6px 16px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            color: '#000',
            '& input::placeholder': {
              color: 'rgba(150, 150, 150, 1)',
              opacity: 1,
            }
          }}
        />
      </Box>

      {/* ── Add Image Section ── */}
      <Box sx={{ width: '100%', mb: '32px' }}>
        <Typography
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '20px',
            color: 'rgba(117, 117, 117, 1)',
            mb: '8px'
          }}
        >
          Add Image
        </Typography>
        <Box
          sx={{
            width: '100%',
            maxWidth: '462px',
            height: { xs: '120px', sm: '140px' },
            backgroundColor: 'rgba(243, 243, 243, 1)',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'rgba(235, 235, 235, 1)'
            }
          }}
        >
          <AddIcon
            sx={{
              width: { xs: '60px', sm: '72px' },
              height: { xs: '60px', sm: '72px' },
              color: 'rgba(188, 188, 188, 1)'
            }}
          />
        </Box>
      </Box>

      {/* ── Save Button ── */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <Button
          variant="contained"
          sx={{
            width: '173px',
            height: '50px',
            backgroundColor: 'rgba(0, 28, 166, 1)', // Dark blue
            borderRadius: '10px',
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: 'rgba(0, 20, 120, 1)',
              boxShadow: 'none',
            }
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 1)',
            }}
          >
            Save
          </Typography>
        </Button>
      </Box>
    </Dialog>
  );
};

export default AddMember;
