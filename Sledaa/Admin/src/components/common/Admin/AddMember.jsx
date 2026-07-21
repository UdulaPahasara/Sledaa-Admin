import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  Box,
  Typography,
  Button,
  IconButton,
  InputBase,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const AddMember = ({ open, onClose, onSave, member }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setName(member?.name || '');
      setPosition(member?.position || '');
      setImageFile(null);
      setImagePreview(member?.imageUrl ? `http://localhost:8081${member.imageUrl}` : null);
      setIsSaving(false);
    }
  }, [open, member]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!name.trim() || !position.trim()) {
      alert("Please enter a name and position");
      return;
    }

    setIsSaving(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("position", position);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      if (onSave) {
        await onSave(formData);
      }
      onClose();
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={isSaving ? undefined : onClose}
      disableScrollLock={true}
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
      <IconButton
        onClick={onClose}
        disabled={isSaving}
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
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          Enter Position
        </Typography>
        <InputBase
          placeholder="Position (e.g., President)"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
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
          onClick={() => fileInputRef.current?.click()}
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
            overflow: 'hidden',
            '&:hover': {
              backgroundColor: 'rgba(235, 235, 235, 1)'
            }
          }}
        >
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={isSaving}
          sx={{
            width: '173px',
            height: '50px',
            backgroundColor: 'rgba(0, 28, 166, 1)',
            borderRadius: '10px',
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: 'rgba(0, 20, 120, 1)',
              boxShadow: 'none',
            },
            '&.Mui-disabled': {
              backgroundColor: 'rgba(0, 28, 166, 0.5)',
              color: '#fff'
            }
          }}
        >
          {isSaving ? <CircularProgress size={24} color="inherit" /> : (
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
          )}
        </Button>
      </Box>
    </Dialog>
  );
};

export default AddMember;
