import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, Popover } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddCommon from './AddCommon';
import AreYouSure from '../../Popup/AreYouSure';

const EventCard = ({ event, index, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const imageLeft = index % 2 === 0;

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = (e) => {
    if (e) e.stopPropagation();
    setAnchorEl(null);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    setDeleteConfirmOpen(false);
    if (onDelete) onDelete(event.id);
  };

  const open = Boolean(anchorEl);
  const id = open ? `action-popover-${event.id}` : undefined;

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', sm: '800px', lg: '511px' },
        minHeight: { xs: 'auto', sm: '280px', lg: '185.86px' },
        backgroundColor: 'rgba(243, 243, 243, 1)',
        borderRadius: '8.24px',
        // Alternate padding so the small gap is always on the image side
        padding: {
          xs: '8.65px 9.07px 9.07px 9.07px', // mobile
          sm: imageLeft 
            ? '16px 40px 16px 16px'  // tablet image left
            : '16px 16px 16px 40px', // tablet image right
          lg: imageLeft 
            ? '8.65px 31.73px 9.07px 9.07px'  // desktop image left
            : '8.65px 9.07px 9.07px 31.73px'  // desktop image right
        },
        display: 'flex',
        flexDirection: { xs: 'column', sm: imageLeft ? 'row' : 'row-reverse' },
        alignItems: 'flex-start',
        gap: { xs: '16px', sm: '32px', lg: '24px' },
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      {/* Image Box */}
      <Box
        component="img"
        src={event.coverImageUrl ? `http://localhost:8081${event.coverImageUrl}` : (event.imageSrc || '')}
        alt={event.title}
        sx={{
          width: { xs: '100%', sm: '340px', lg: '229px' },
          height: { xs: '200px', sm: '240px', lg: '163px' },
          borderRadius: '16px',
          objectFit: 'cover',
          flexShrink: 0,
        }}
      />

      {/* Text Box */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          gap: { xs: '8px', sm: '12px', lg: '8px' },
          pt: { xs: '8px', sm: '12px', lg: '8px' }, 
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            fontSize: { xs: '14.42px', sm: '20px', lg: '14.42px' },
            lineHeight: { xs: '16.48px', sm: '28px', lg: '16.48px' },
            color: 'rgba(0, 28, 166, 1)',
          }}
        >
          {event.title}
        </Typography>

        <Typography
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            fontSize: { xs: '10px', sm: '13px', lg: '10px' },
            lineHeight: { xs: '14px', sm: '20px', lg: '14px' },
            color: '#333',
            whiteSpace: 'pre-line',
            maxHeight: { xs: '125px', sm: '180px', lg: '125px' }, 
            overflowY: 'auto',
            pr: '8px', // scrollbar padding
            // Thin scrollbar for the long text in card 4
            '&::-webkit-scrollbar': { width: '4px' },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,0.2)',
              borderRadius: '4px',
            },
          }}
        >
          {event.description}
        </Typography>
      </Box>

      {/* Action Menu (3 dots) - Moved to end for proper z-index stacking */}
      <IconButton
        onClick={handleMenuClick}
        sx={{
          position: 'absolute',
          top: { xs: '12px', sm: '16px', lg: '12px' },
          right: { xs: '12px', sm: '16px', lg: '12px' },
          backgroundColor: '#fff',
          borderRadius: '5px',
          width: '24px',
          height: '24px',
          boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
          zIndex: 10,
          '&:hover': { backgroundColor: '#f5f5f5' }
        }}
      >
        <MoreVertIcon sx={{ fontSize: '18px', color: '#000' }} />
      </IconButton>

      {/* ── Action Popover (Edit / Delete) ──────────────── */}
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
        {/* Edit */}
        <Box
          onClick={(e) => {
            handleMenuClose(e);
            if (onEdit) onEdit(event);
          }}
          sx={{
            padding: '12px 18px',
            cursor: 'pointer',
            borderBottom: '1px solid #eeeeee',
            '&:hover': { backgroundColor: '#f5f7ff' },
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              color: '#000',
            }}
          >
            Edit
          </Typography>
        </Box>

        {/* Delete */}
        <Box
          onClick={handleDeleteClick}
          sx={{
            padding: '12px 18px',
            cursor: 'pointer',
            '&:hover': { backgroundColor: '#fff5f5' },
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              color: '#000',
            }}
          >
            Delete
          </Typography>
        </Box>
      </Popover>

      {/* ── Confirmation Popup ────────────────────────────── */}
      <AreYouSure 
        open={deleteConfirmOpen} 
        onClose={() => setDeleteConfirmOpen(false)} 
        onConfirm={handleConfirmDelete} 
      />
    </Box>
  );
};

const CommonPage = ({ title = "PAGE", buttonText = "Add New", data = [], onSave, onDelete }) => {
  const [isAddCommonOpen, setIsAddCommonOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  const handleEdit = (item) => {
    setItemToEdit(item);
    setIsAddCommonOpen(true);
  };

  const handleClose = () => {
    setIsAddCommonOpen(false);
    setItemToEdit(null);
  };

  return (
    <Box
      sx={{
        padding: { xs: '16px', sm: '24px', md: '40px' },
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* ── Header ──────────────────────────────────────── */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            fontSize: { xs: '20px', md: '25px' },
            lineHeight: '30px',
            color: 'rgba(0, 0, 0, 1)',
          }}
        >
          {title}
        </Typography>

        <Button
          onClick={() => {
            setItemToEdit(null);
            setIsAddCommonOpen(true);
          }}
          sx={{
            width: '159px',
            height: '37px',
            backgroundColor: 'rgba(0, 28, 166, 1)',
            borderRadius: '9.98px',
            padding: '7.98px 10.48px 7.98px 8.98px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4.99px',
            color: '#ffffff',
            textTransform: 'none',
            '&:hover': { backgroundColor: 'rgba(0, 20, 120, 1)' },
          }}
        >
          <AddIcon sx={{ width: '16px', height: '16px' }} />
          <Typography
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 500,
              fontSize: '13px',
              color: '#fff',
            }}
          >
            {buttonText}
          </Typography>
        </Button>
      </Box>

      {/* ── Cards Grid ──────────────────────────────────── */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' },
          gap: '24px',
          justifyItems: 'flex-start',
        }}
      >
        {data.map((item, index) => (
          <EventCard 
            key={item.id} 
            event={item} 
            index={index} 
            onEdit={handleEdit} 
            onDelete={onDelete} 
          />
        ))}
      </Box>

      {/* ── Add New Event Popup ── */}
      <AddCommon 
        open={isAddCommonOpen} 
        onClose={handleClose} 
        onSave={async (formData, editId) => {
          if (onSave) {
            await onSave(formData, editId);
          }
          handleClose();
        }}
        itemToEdit={itemToEdit}
      />
    </Box>
  );
};

export default CommonPage;
