import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '540px',
  height: '485px',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: '40px',
  display: 'flex',
  flexDirection: 'column',
  outline: 'none',
};

const AddPastCommittee = ({ open, onClose, onSave, initialData }) => {
  const [yearName, setYearName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState(null);

  useEffect(() => {
    if (initialData) {
      setYearName(initialData.yearName || '');
      setExistingImageUrl(initialData.imageUrl || null);
    } else {
      setYearName('');
      setExistingImageUrl(null);
    }
    setSelectedImage(null);
  }, [initialData, open]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSave = () => {
    if (!yearName.trim()) return;
    // Parse a clean yearLabel from the yearName (e.g. '2025 Committee' → '2025')
    const yearLabel = yearName.replace(/\s*committee\s*/i, '').trim() || yearName.trim();
    // Parent's onSave is async and handles closing the modal itself
    onSave({ yearName: yearName.trim(), yearLabel, image: selectedImage });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 16, right: 16 }}
        >
          <CloseIcon sx={{ color: '#000' }} />
        </IconButton>

        {/* Enter Committee Year Name Title */}
        <Typography sx={{
          fontFamily: 'Poppins',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '20px',
          color: '#666',
          mb: 1
        }}>
          Enter Committee year Name
        </Typography>

        {/* Input Field */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Ex: 2025 Committee"
          value={yearName}
          onChange={(e) => setYearName(e.target.value)}
          sx={{
            width: '462px',
            height: '50px',
            mb: 4,
            '& .MuiOutlinedInput-root': {
              height: '50px',
              backgroundColor: 'rgba(243, 243, 243, 1)',
              borderRadius: '5px',
              '& fieldset': { border: 'none' },
            },
            '& .MuiInputBase-input': {
              padding: '6px 16px',
              fontFamily: 'Poppins',
            }
          }}
        />

        {/* Add Cover Image Title */}
        <Typography sx={{
          fontFamily: 'Poppins',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '20px',
          color: '#666',
          mb: 1
        }}>
          Add Cover Image
        </Typography>

        {/* Image Upload Box */}
        <Button
          component="label"
          sx={{
            width: '462px',
            height: '189px',
            backgroundColor: 'rgba(243, 243, 243, 1)',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 4,
            overflow: 'hidden',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'rgba(230, 230, 230, 1)',
            }
          }}
        >
          {selectedImage ? (
            <Box
              component="img"
              src={URL.createObjectURL(selectedImage)}
              alt="Selected cover"
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : existingImageUrl ? (
            <Box
              component="img"
              src={existingImageUrl}
              alt="Current cover"
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <AddIcon sx={{ fontSize: '80px', color: '#b3b3b3' }} />
          )}
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>

        {/* Save Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '462px' }}>
          <Button
            onClick={handleSave}
            sx={{
              backgroundColor: 'rgba(0, 28, 166, 1)',
              color: '#fff',
              fontFamily: 'Poppins',
              fontWeight: 600,
              fontSize: '16px',
              textTransform: 'none',
              padding: '10px 40px',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'rgba(0, 20, 120, 1)'
              }
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddPastCommittee;
