import React, { useState, useRef } from 'react';
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
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

const AddNewAlbum = ({ open, onClose, isAddImageOnly = false, albumId = null, albumToEdit = null }) => {
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [albumImages, setAlbumImages] = useState([]); // Holds array of { id, src, file }
  const [loading, setLoading] = useState(false);
  
  const coverInputRef = useRef(null);
  const albumInputRef = useRef(null);

  const handleCoverUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(URL.createObjectURL(e.target.files[0]));
      setCoverImageFile(e.target.files[0]);
    }
  };

  React.useEffect(() => {
    if (albumToEdit) {
      setTitle(albumToEdit.title || '');
      setCoverImage(albumToEdit.coverImageUrl ? `http://localhost:8081${albumToEdit.coverImageUrl}` : null);
      if (albumToEdit.images) {
        setAlbumImages(albumToEdit.images.map(img => ({
          id: img.id,
          src: `http://localhost:8081${img.imageUrl}`
        })));
      } else {
        setAlbumImages([]);
      }
    } else {
      setTitle('');
      setCoverImage(null);
      setAlbumImages([]);
    }
    setCoverImageFile(null);
  }, [albumToEdit, open]);

  const handleAlbumUpload = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newItems = files.map(file => ({
        src: URL.createObjectURL(file),
        file: file
      }));
      setAlbumImages(prev => [...prev, ...newItems]);
    }
  };

  const removeCoverImage = (e) => {
    e.stopPropagation();
    setCoverImage(null);
    setCoverImageFile(null);
    if (coverInputRef.current) coverInputRef.current.value = '';
  };

  const removeAlbumImage = async (indexToRemove) => {
    const item = albumImages[indexToRemove];
    if (item.id) {
      // Existing image on the backend — delete it first
      const token = localStorage.getItem('jwt_token');
      try {
        const response = await fetch(`http://localhost:8081/api/albums/images/${item.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          alert("Failed to delete image from album on server");
          return;
        }
      } catch (error) {
        console.error("Error deleting image", error);
        alert("Error connection to delete image");
        return;
      }
    }
    setAlbumImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSave = async () => {
    if (!isAddImageOnly && !albumToEdit) {
      // Create new album
      if (!title || !coverImageFile) {
        alert("Please provide a title and a cover image.");
        return;
      }
    } else if (isAddImageOnly) {
      // Add images to existing album
      const newFiles = albumImages.filter(item => !item.id && item.file);
      if (newFiles.length === 0) {
        alert("Please add at least one image.");
        return;
      }
    } else if (albumToEdit) {
      // Edit album
      if (!title) {
        alert("Please provide a title.");
        return;
      }
    }
    
    setLoading(true);
    try {
      const token = localStorage.getItem('jwt_token');

      if (isAddImageOnly) {
        const formData = new FormData();
        const newFiles = albumImages.filter(item => !item.id && item.file);
        newFiles.forEach((item) => {
           formData.append('images', item.file);
        });
        const response = await fetch(`http://localhost:8081/api/albums/${albumId}/images`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData,
        });

        if (response.ok) {
          alert("Images added successfully!");
          onClose();
          setAlbumImages([]);
        } else {
          alert("Failed to add images");
        }
      } else if (albumToEdit) {
        // Edit Album details (title, cover)
        const formData = new FormData();
        formData.append('title', title);
        if (coverImageFile) {
          formData.append('coverImage', coverImageFile);
        }
        
        const response = await fetch(`http://localhost:8081/api/albums/${albumToEdit.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData,
        });

        // Also upload newly added files if any
        const newFiles = albumImages.filter(item => !item.id && item.file);
        if (newFiles.length > 0) {
          const imagesFormData = new FormData();
          newFiles.forEach((item) => {
             imagesFormData.append('images', item.file);
          });
          await fetch(`http://localhost:8081/api/albums/${albumToEdit.id}/images`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: imagesFormData,
          });
        }

        if (response.ok) {
          alert("Album updated successfully!");
          onClose();
        } else {
          alert("Failed to update album");
        }
      } else {
        // Create new album
        const formData = new FormData();
        formData.append('title', title);
        formData.append('coverImage', coverImageFile);
        
        const newFiles = albumImages.filter(item => !item.id && item.file);
        newFiles.forEach((item) => {
           formData.append('images', item.file);
        });

        const response = await fetch('http://localhost:8081/api/albums', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData,
        });

        if (response.ok) {
          alert("Album added successfully!");
          onClose();
          setTitle('');
          setCoverImage(null);
          setCoverImageFile(null);
          setAlbumImages([]);
        } else {
          const errorText = await response.text();
          alert("Failed to add album: " + errorText);
        }
      }
    } catch (error) {
      console.error("Error saving:", error);
      alert("An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableScrollLock={true}
      maxWidth={false}
      slotProps={{
        paper: {
          sx: {
            width: '100%',
            maxWidth: '721px',
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

      {/* ── Album Title Section ── */}
      {!isAddImageOnly && (
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
            Enter Album Title
          </Typography>
          <InputBase
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              width: '100%',
              height: '50px',
              backgroundColor: 'rgba(243, 243, 243, 1)',
              borderRadius: '5px',
              padding: '6px 16px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              color: '#000',
            }}
          />
        </Box>
      )}

      {/* ── Cover Image Section ── */}
      {!isAddImageOnly && (
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
            Enter Cover Image
          </Typography>
          <Box
            onClick={() => coverInputRef.current?.click()}
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
              <AddIcon sx={{ fontSize: '109px', color: '#BDBDBD' }} />
            )}
          </Box>
        </Box>
      )}

      {/* ── Images Section ── */}
      <Box sx={{ width: '100%', mb: '40px' }}>
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
          Enter Images
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
          {/* Dashed Inner Box */}
          <Box
            onClick={() => albumInputRef.current?.click()}
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
              ref={albumInputRef}
              onChange={handleAlbumUpload}
            />

            {albumImages.length === 0 ? (
              <>
                <FileUploadOutlinedIcon sx={{ width: '20px', height: '21px', color: '#000' }} />
                <Typography
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 400,
                    fontSize: '10.17px',
                    lineHeight: '14.53px',
                    textTransform: 'capitalize',
                    color: '#000',
                    textAlign: 'center',
                  }}
                >
                  Upload Your Profile Photo From Your Device.
                </Typography>
                <Button
                  component="span"
                  sx={{
                    width: '116px',
                    height: '27px',
                    backgroundColor: 'rgba(196, 196, 196, 1)',
                    borderRadius: '5px',
                    textTransform: 'none',
                    padding: 0,
                    color: 'rgba(0, 0, 0, 1)',
                    '&:hover': {
                      backgroundColor: '#b0b0b0'
                    }
                  }}
                >
                  <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '10px', lineHeight: '10px' }}>
                    Choose Profile
                  </Typography>
                </Button>
              </>
            ) : (
              <Box sx={{ width: '100%', height: '100%', display: 'flex', flexWrap: 'wrap', gap: '16px', p: 2, overflowY: 'auto' }}>
                {albumImages.map((item, idx) => (
                  <Box key={idx} sx={{ position: 'relative', width: '80px', height: '80px' }}>
                    <Box
                      component="img"
                      src={item.src}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ddd' }}
                    />
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation(); // prevent opening file dialog
                        removeAlbumImage(idx);
                      }}
                      sx={{
                        position: 'absolute',
                        top: '-6px',
                        right: '-6px',
                        width: '20px',
                        height: '20px',
                        backgroundColor: '#fff',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        '&:hover': { backgroundColor: '#ffebeb' }
                      }}
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
            '&:hover': {
              backgroundColor: 'rgba(0, 20, 120, 1)',
              boxShadow: 'none',
            },
            '&.Mui-disabled': {
              backgroundColor: 'rgba(0, 28, 165, 0.5)',
              color: 'rgba(255, 255, 255, 0.7)'
            }
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
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

export default AddNewAlbum;
