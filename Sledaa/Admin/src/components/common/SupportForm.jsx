import React from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';

const CustomInputLabel = ({ children }) => (
  <Typography sx={{
    fontFamily: 'Poppins',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    color: '#000',
    mb: '8px'
  }}>
    {children}
  </Typography>
);

const SupportForm = ({ formType = 'canSupport' }) => {
  return (
    <Box sx={{
      backgroundColor: 'rgba(243, 243, 243, 1)',
      borderRadius: '20px',
      maxWidth: '959px',
      width: '100%',
      margin: '0 auto',
      padding: { xs: '20px', md: '30px 45px' },
      boxSizing: 'border-box'
    }}>
      <Typography sx={{
        fontFamily: 'Poppins',
        fontWeight: 600,
        fontSize: { xs: '18px', md: '20px' },
        lineHeight: { xs: '24px', md: '30px' },
        color: '#000',
        mb: 2
      }}>
        Contact Details
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px', mb: 3, justifyContent: 'space-between' }}>
        <Box sx={{ width: { xs: '100%', md: 'calc(50% - 12px)' } }}>
          <CustomInputLabel>First Name</CustomInputLabel>
          <TextField 
            fullWidth 
            placeholder="Enter Name" 
            variant="outlined" 
            sx={{
              backgroundColor: '#fff',
              borderRadius: '5px',
              '& .MuiOutlinedInput-root': {
                height: '50px',
                padding: '6px 16px',
                '& fieldset': { border: 'none' }
              },
              '& .MuiInputBase-input': {
                fontFamily: 'Poppins',
                fontSize: '14px',
                padding: 0,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                '&::placeholder': { color: '#a0a0a0', opacity: 1 }
              }
            }}
          />
        </Box>
        <Box sx={{ width: { xs: '100%', md: 'calc(50% - 12px)' } }}>
          <CustomInputLabel>Last Name</CustomInputLabel>
          <TextField 
            fullWidth 
            placeholder="Enter Name" 
            variant="outlined" 
            sx={{
              backgroundColor: '#fff',
              borderRadius: '5px',
              '& .MuiOutlinedInput-root': {
                height: '50px',
                padding: '6px 16px',
                '& fieldset': { border: 'none' }
              },
              '& .MuiInputBase-input': {
                fontFamily: 'Poppins',
                fontSize: '14px',
                padding: 0,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                '&::placeholder': { color: '#a0a0a0', opacity: 1 }
              }
            }}
          />
        </Box>
        <Box sx={{ width: { xs: '100%', md: 'calc(50% - 12px)' } }}>
          <CustomInputLabel>Email</CustomInputLabel>
          <TextField 
            fullWidth 
            placeholder="Enter Email" 
            variant="outlined" 
            sx={{
              backgroundColor: '#fff',
              borderRadius: '5px',
              '& .MuiOutlinedInput-root': {
                height: '50px',
                padding: '6px 16px',
                '& fieldset': { border: 'none' }
              },
              '& .MuiInputBase-input': {
                fontFamily: 'Poppins',
                fontSize: '14px',
                padding: 0,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                '&::placeholder': { color: '#a0a0a0', opacity: 1 }
              }
            }}
          />
        </Box>
        <Box sx={{ width: { xs: '100%', md: 'calc(50% - 12px)' } }}>
          <CustomInputLabel>Contact Number</CustomInputLabel>
          <TextField 
            fullWidth 
            placeholder="Enter Phone Number" 
            variant="outlined" 
            sx={{
              backgroundColor: '#fff',
              borderRadius: '5px',
              '& .MuiOutlinedInput-root': {
                height: '50px',
                padding: '6px 16px',
                '& fieldset': { border: 'none' }
              },
              '& .MuiInputBase-input': {
                fontFamily: 'Poppins',
                fontSize: '14px',
                padding: 0,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                '&::placeholder': { color: '#a0a0a0', opacity: 1 }
              }
            }}
          />
        </Box>
      </Box>

      <Typography sx={{
        fontFamily: 'Poppins',
        fontWeight: 600,
        fontSize: { xs: '18px', md: '20px' },
        lineHeight: { xs: '24px', md: '30px' },
        color: '#000',
        mb: 1
      }}>
        Support Details
      </Typography>

      <Box sx={{ mb: 2 }}>
        <CustomInputLabel>Please do provide some information about you (Discipline of work etc.)</CustomInputLabel>
        <TextField 
          fullWidth 
          multiline
          rows={2}
          placeholder="Enter here" 
          variant="outlined" 
          sx={{
            backgroundColor: '#fff',
            borderRadius: '5px',
            '& .MuiOutlinedInput-root': {
              minHeight: '80px',
              alignItems: 'flex-start',
              padding: '12px 16px',
              '& fieldset': { border: 'none' }
            },
            '& .MuiInputBase-input': {
              fontFamily: 'Poppins',
              fontSize: '14px',
            }
          }}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <CustomInputLabel>
          {formType === 'needSupport' ? 'What help you are seeking?' : 'What areas you can help?'}
        </CustomInputLabel>
        <TextField 
          fullWidth 
          multiline
          rows={2}
          placeholder="Enter here" 
          variant="outlined" 
          sx={{
            backgroundColor: '#fff',
            borderRadius: '5px',
            '& .MuiOutlinedInput-root': {
              minHeight: '80px',
              alignItems: 'flex-start',
              padding: '12px 16px',
              '& fieldset': { border: 'none' }
            },
            '& .MuiInputBase-input': {
              fontFamily: 'Poppins',
              fontSize: '14px',
            }
          }}
        />
      </Box>

      <Button
        fullWidth
        sx={{
          backgroundColor: 'rgba(0, 28, 166, 1)',
          borderRadius: '10px',
          height: '55px',
          padding: '10px',
          fontFamily: 'Poppins',
          fontWeight: 700,
          fontSize: '18px',
          lineHeight: '18px',
          textAlign: 'center',
          textTransform: 'uppercase',
          color: '#fff',
          '&:hover': {
            backgroundColor: 'rgba(0, 20, 120, 1)'
          }
        }}
      >
        SUBMIT
      </Button>
    </Box>
  );
};

export default SupportForm;
