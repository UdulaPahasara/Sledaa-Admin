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
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import pdfIcon from '../../../assets/AnnualReport/pdf-icon-red.webp';

const AddDocument = ({ open, onClose, uploadLabel = "Add Report", onSave }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setSelectedFile(null);
      setTitle('');
      setIsSaving(false);
    }
  }, [open]);

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const removeFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }
    if (!selectedFile) {
      alert("Please select a file to upload");
      return;
    }

    setIsSaving(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", selectedFile);

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
          Enter Title
        </Typography>
        <InputBase
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          {uploadLabel}
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
            onClick={() => fileInputRef.current?.click()}
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
              accept=".pdf,.doc,.docx" 
              style={{ display: 'none' }} 
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
            
            {!selectedFile ? (
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
                  Upload Your Document From Your Device.
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
                    Choose Document
                  </Typography>
                </Button>
              </>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                <Box component="img" src={pdfIcon} alt="PDF" sx={{ width: '40px', height: '40px', mb: 1 }} />
                <Typography
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 500,
                    fontSize: '12px',
                    color: '#000',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {selectedFile.name}
                </Typography>
                <IconButton
                  onClick={removeFile}
                  sx={{
                    position: 'absolute',
                    top: '-16px',
                    right: '-24px',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    width: '24px',
                    height: '24px',
                    '&:hover': { backgroundColor: '#ffebeb' }
                  }}
                >
                  <CloseIcon sx={{ fontSize: '14px', color: '#d32f2f' }} />
                </IconButton>
              </Box>
            )}
          </Box>
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

export default AddDocument;
