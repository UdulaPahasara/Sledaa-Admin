import React, { useState } from 'react';
import { Box, Typography, Button, Popover } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Pdf from '../../components/common/Admin/Pdf';
import AreYouSure from '../../components/Popup/AreYouSure';
import AddDocument from '../../components/common/Admin/AddDocument';

const resourcesData = [
  { id: 1, title: 'Resume Tips', filename: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' },
  { id: 2, title: 'Modern Resume Template', filename: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' },
  { id: 3, title: 'Victorian Government Recruitment Process', filename: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' },
  { id: 4, title: 'A Guide To Job Search In AU', filename: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' }
];

const Resources = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [addResourcesOpen, setAddResourcesOpen] = useState(false);

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setAnchorEl(null);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    setDeleteConfirmOpen(false);
    // Add real delete logic here
  };

  const open = Boolean(anchorEl);
  const id = open ? 'resources-action-popover' : undefined;

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#fff',
        padding: { xs: '30px 20px', md: '50px 70px' },
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '40px', flexWrap: 'wrap', gap: '20px' }}>
        <Typography
          sx={{
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: { xs: '20px', md: '25px' },
            lineHeight: '30px',
            color: '#000',
            textTransform: 'uppercase'
          }}
        >
          RESOURCES
        </Typography>
        
        <Button
          onClick={() => setAddResourcesOpen(true)}
          sx={{
            width: '190px',
            height: '37px',
            backgroundColor: 'rgba(0, 28, 166, 1)',
            borderRadius: '9.98px',
            textTransform: 'none',
            padding: '7.98px 10.48px 7.98px 8.98px',
            display: 'flex',
            gap: '4.99px',
            '&:hover': { backgroundColor: 'rgba(0, 20, 120, 1)' }
          }}
        >
          <AddIcon sx={{ width: '16px', height: '16px', color: '#fff' }} />
          <Typography sx={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '13px', color: '#fff' }}>
            Add New Resources
          </Typography>
        </Button>
      </Box>

      {/* Resources List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {resourcesData.map((resource) => (
          <Pdf
            key={resource.id}
            title={resource.title}
            filename={resource.filename}
            onClickMenu={handleMenuClick}
          />
        ))}
      </Box>

      {/* ── ACTION POPOVER (Edit/Delete) ───────────────────────────────── */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            elevation: 3,
            sx: {
              minWidth: '110px',
              borderRadius: '10px',
              overflow: 'visible',
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.12)',
              backgroundColor: '#fff',
            }
          }
        }}
      >
        <Box
          onClick={handleMenuClose}
          sx={{
            padding: '12px 18px',
            cursor: 'pointer',
            borderBottom: '1px solid #eeeeee',
            '&:hover': { backgroundColor: '#f5f7ff' },
          }}
        >
          <Typography sx={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: '14px', color: '#000' }}>
            Edit
          </Typography>
        </Box>
        <Box
          onClick={handleDeleteClick}
          sx={{
            padding: '12px 18px',
            cursor: 'pointer',
            '&:hover': { backgroundColor: '#fff5f5' },
          }}
        >
          <Typography sx={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: '14px', color: '#000' }}>
            Delete
          </Typography>
        </Box>
      </Popover>

      {/* ── DELETE CONFIRMATION POPUP ──────────────────────────────────── */}
      <AreYouSure 
        open={deleteConfirmOpen} 
        onClose={() => setDeleteConfirmOpen(false)} 
        onConfirm={handleConfirmDelete} 
      />

      {/* ── ADD DOCUMENT POPUP ─────────────────────────────────────────── */}
      <AddDocument 
        open={addResourcesOpen}
        onClose={() => setAddResourcesOpen(false)}
        uploadLabel="Add Resources"
      />

    </Box>
  );
};

export default Resources;
