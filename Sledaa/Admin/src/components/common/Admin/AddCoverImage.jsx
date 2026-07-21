import React, { useState, useRef } from 'react';
import {
  Dialog,
  Box,
  Typography,
  Button,
  IconButton,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

const AddCoverImage = ({ open, onClose, onSave }) => {
  const [mainImage, setMainImage] = useState(null);
  const [mainImageFile, setMainImageFile] = useState(null);
  
  const [secondaryImages, setSecondaryImages] = useState([]);
  const [secondaryImageFiles, setSecondaryImageFiles] = useState([]);
  
  const [loading, setLoading] = useState(false);
  
  const mainInputRef = useRef(null);
  const secondaryInputRef = useRef(null);

  const handleMainUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setMainImage(URL.createObjectURL(e.target.files[0]));
      setMainImageFile(e.target.files[0]);
    }
  };

  const handleSecondaryUpload = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (secondaryImages.length + files.length > 3) {
        alert("You can only upload a maximum of 3 secondary images.");
        return;
      }
      const newImages = files.map(file => URL.createObjectURL(file));
      setSecondaryImages(prev => [...prev, ...newImages]);
      setSecondaryImageFiles(prev => [...prev, ...files]);
    }
  };

  React.useEffect(() => {
    setMainImage(null);
    setMainImageFile(null);
    setSecondaryImages([]);
    setSecondaryImageFiles([]);
  }, [open]);

  const removeMainImage = (e) => {
    e.stopPropagation();
    setMainImage(null);
    setMainImageFile(null);
    if (mainInputRef.current) mainInputRef.current.value = '';
  };

  const removeSecondaryImage = (indexToRemove) => {
    setSecondaryImages(prev => prev.filter((_, index) => index !== indexToRemove));
    setSecondaryImageFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSave = async () => {
    if (!mainImageFile && secondaryImageFiles.length === 0) {
      alert("Please provide at least a main cover image or secondary images.");
      return;
    }
    
    setLoading(true);
    try {
      const formData = new FormData();
      if (mainImageFile) {
        formData.append('mainImage', mainImageFile);
      }
      secondaryImageFiles.forEach((file) => {
         formData.append('secondaryImages', file);
      });
      
      await onSave(formData);
      
      onClose();
      setMainImage(null);
      setMainImageFile(null);
      setSecondaryImages([]);
      setSecondaryImageFiles([]);
    } catch (error) {
      console.error("Error saving cover images:", error);
      alert("An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      disableScrollLock={true}
      slotProps={{
        paper: {
          sx: {
            width: '100%',
            maxWidth: '721px', // Wider to match AddNewAlbum
            height: 'auto',
            borderRadius: '10px',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            position: 'relative',
            boxSizing: 'border-box',
            padding: { xs: '40px 20px', sm: '48px 45px' },
            margin: '16px',
            overflowY: 'auto'
          }
        }
      }}
    >
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

      <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '18px', mb: 3 }}>
        Add Committee Cover Images
      </Typography>

      {/* ── Main Cover Image Section ── */}
      <Box sx={{ width: '100%', mb: '24px' }}>
        <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '14px', color: 'rgba(117, 117, 117, 1)', mb: '8px' }}>
          Select Main Cover Image
        </Typography>
        <Box
          onClick={() => mainInputRef.current?.click()}
          sx={{
            width: '100%',
            height: '189px',
            backgroundColor: 'rgba(243, 243, 243, 1)',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <input 
            type="file" 
            accept="image/*" 
            style={{ display: 'none' }} 
            ref={mainInputRef}
            onChange={handleMainUpload}
          />
          {mainImage ? (
            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
              <Box
                component="img"
                src={mainImage}
                sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
              />
              <IconButton
                onClick={removeMainImage}
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
            <AddIcon sx={{ fontSize: '109px', color: '#BDBDBD' }} />
          )}
        </Box>
      </Box>

      {/* ── Secondary Images Section ── */}
      <Box sx={{ width: '100%', mb: '40px' }}>
        <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '14px', color: 'rgba(117, 117, 117, 1)', mb: '8px' }}>
          Select Secondary Multiple Images
        </Typography>
        <Box
          sx={{
            width: '100%',
            height: '182px',
            backgroundColor: 'rgba(243, 243, 243, 1)',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '24px',
            boxSizing: 'border-box'
          }}
        >
          <Box
            onClick={() => secondaryInputRef.current?.click()}
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: '5.81px',
              border: '0.73px dashed rgba(0, 0, 0, 1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.02)' }
            }}
          >
            <input 
              type="file" 
              accept="image/*" 
              multiple
              style={{ display: 'none' }} 
              ref={secondaryInputRef}
              onChange={handleSecondaryUpload}
            />
            {secondaryImages.length === 0 ? (
              <>
                <FileUploadOutlinedIcon sx={{ width: '20px', height: '21px', color: '#000' }} />
                <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '10.17px', color: '#000' }}>
                  Upload Multiple Photos From Your Device.
                </Typography>
                <Button component="span" sx={{ width: '116px', height: '27px', backgroundColor: 'rgba(196, 196, 196, 1)', borderRadius: '5px', textTransform: 'none', color: '#000', '&:hover': { backgroundColor: '#b0b0b0' } }}>
                  <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '10px' }}>
                    Choose Photos
                  </Typography>
                </Button>
              </>
            ) : (
              <Box sx={{ width: '100%', height: '100%', display: 'flex', flexWrap: 'wrap', gap: '16px', p: 2, overflowY: 'auto' }}>
                {secondaryImages.map((src, idx) => (
                  <Box key={idx} sx={{ position: 'relative', width: '80px', height: '80px' }}>
                    <Box component="img" src={src} sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ddd' }} />
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSecondaryImage(idx);
                      }}
                      sx={{ position: 'absolute', top: '-6px', right: '-6px', width: '20px', height: '20px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', '&:hover': { backgroundColor: '#ffebeb' } }}
                    >
                      <CloseIcon sx={{ fontSize: '12px', color: '#d32f2f' }} />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* ── Save Button ── */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={loading}
          sx={{
            width: '173px',
            height: '50px',
            backgroundColor: 'rgba(0, 28, 165, 1)',
            borderRadius: '10px',
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': { backgroundColor: 'rgba(0, 20, 120, 1)', boxShadow: 'none' },
            '&.Mui-disabled': { backgroundColor: 'rgba(0, 28, 165, 0.5)', color: 'rgba(255, 255, 255, 0.7)' }
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '16px', color: 'rgba(255, 255, 255, 1)' }}>
              Save
            </Typography>
          )}
        </Button>
      </Box>
    </Dialog>
  );
};

export default AddCoverImage;
