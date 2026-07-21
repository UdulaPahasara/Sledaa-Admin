import React, { useState, useRef } from 'react';
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

const AddCommon = ({ open, onClose }) => {
  const [coverImage, setCoverImage] = useState(null);
  const coverInputRef = useRef(null);

  const handleCoverUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const removeCoverImage = (e) => {
    e.stopPropagation();
    setCoverImage(null);
    if (coverInputRef.current) coverInputRef.current.value = '';
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      slotProps={{
        paper: {
          sx: {
            width: '100%',
            maxWidth: '743px',
            borderRadius: '10px',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            position: 'relative',
            boxSizing: 'border-box',
            padding: { xs: '40px 16px 24px 16px', sm: '32px 40px' }, 
            margin: { xs: '24px 12px', sm: '32px auto' }, 
            maxHeight: 'calc(100% - 64px)', // Ensure it doesn't touch top/bottom edges on any device
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
            width: '100%', // Max width will be constrained by dialog padding
            maxWidth: '631px',
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

      {/* ── Description & Cover Image Row ── */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: '28px',
          mb: '32px'
        }}
      >
        {/* Description Section */}
        <Box sx={{ flex: 1, maxWidth: { sm: '379px' } }}>
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
            Enter Description
          </Typography>
          <InputBase
            placeholder="Description"
            multiline
            rows={4}
            sx={{
              width: '100%',
              height: { xs: '120px', sm: '140px' },
              backgroundColor: 'rgba(243, 243, 243, 1)',
              borderRadius: '10px',
              padding: '16px 18px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              alignItems: 'flex-start',
              color: '#000',
              overflowY: 'auto',
              '& textarea::placeholder': {
                color: 'rgba(150, 150, 150, 1)',
                opacity: 1,
              }
            }}
          />
        </Box>

        {/* Cover Image Section */}
        <Box sx={{ flexShrink: 0, width: { xs: '100%', sm: '234px' } }}>
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
            Enter Cover Image
          </Typography>
          <Box
            onClick={() => coverInputRef.current?.click()}
            sx={{
              width: '100%',
              height: { xs: '140px', sm: '140px' },
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
            <input 
              type="file" 
              accept="image/*" 
              style={{ display: 'none' }} 
              ref={coverInputRef}
              onChange={handleCoverUpload}
            />
            {coverImage ? (
              <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                <Box
                  component="img"
                  src={coverImage}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                />
                <IconButton
                  onClick={removeCoverImage}
                  sx={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,1)' }
                  }}
                >
                  <CloseIcon sx={{ fontSize: '18px', color: '#000' }} />
                </IconButton>
              </Box>
            ) : (
              <AddIcon
                sx={{
                  width: { xs: '60px', sm: '72px' },
                  height: { xs: '60px', sm: '72px' },
                  color: 'rgba(188, 188, 188, 1)'
                }}
              />
            )}
          </Box>
        </Box>
      </Box>

      {/* ── Save Button ── */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <Button
          variant="contained"
          sx={{
            width: '173px',
            height: '50px',
            backgroundColor: 'rgba(0, 28, 165, 1)', // Dark blue
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

export default AddCommon;
