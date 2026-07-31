import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSEO from '../../components/AdminSEO';
import { Box, Typography, Button, Popover, useMediaQuery, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AreYouSure from '../../components/Popup/AreYouSure';
import AddNewAlbum from '../../components/common/Admin/AddNewAlbum';
import CircularProgress from '@mui/material/CircularProgress';

const GalleryPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));   
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md')); 

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [isAddAlbumOpen, setIsAddAlbumOpen] = useState(false);
  
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAlbums = async () => {
    try {
      const token = localStorage.getItem('jwt_token');
      const response = await fetch('http://localhost:8081/api/albums', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setAlbums(Array.isArray(data) ? data.reverse() : data);
      }
    } catch (error) {
      console.error("Failed to fetch albums", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchAlbums();
  }, []);

  const handleClick = (event, item) => {
    event.stopPropagation();
    setSelectedAlbum(item);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    if (event) event.stopPropagation();
    setAnchorEl(null);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setAnchorEl(null); 
    setDeleteConfirmOpen(true); 
  };

  const handleConfirmDelete = async () => {
    if (!selectedAlbum) return;
    try {
      const token = localStorage.getItem('jwt_token');
      const response = await fetch(`http://localhost:8081/api/albums/${selectedAlbum.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setDeleteConfirmOpen(false);
        setSelectedAlbum(null);
        fetchAlbums(); // refresh the list
      } else {
        alert('Failed to delete album');
      }
    } catch (error) {
      console.error('Error deleting album', error);
      alert('Error deleting album');
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'action-popover' : undefined;

  // Responsive card dimensions
  const cardWidth = isXs ? '100%' : isSm ? 'calc(50% - 15px)' : '319.35px';
  const cardHeight = isXs ? '260px' : isSm ? '280px' : '338.51px';

  return (
    <Box
      sx={{
        padding: { xs: '16px', sm: '24px', md: '40px' },
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <AdminSEO title="Manage Gallery" />
      {/* ── Header ──────────────────────────────────────── */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: { xs: 3, md: 4 },
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            fontSize: { xs: '18px', sm: '22px', md: '25px' },
            lineHeight: '30px',
            color: 'rgba(0, 0, 0, 1)',
          }}
        >
          GALLERY PAGE
        </Typography>

        {/* Add New Album Button */}
        <Button
          onClick={() => setIsAddAlbumOpen(true)}
          sx={{
            height: { xs: '34px', md: '37px' },
            backgroundColor: 'rgba(0, 28, 166, 1)',
            borderRadius: '9.98px',
            padding: { xs: '6px 12px', md: '7.98px 10.48px 7.98px 8.98px' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4.99px',
            color: '#ffffff',
            textTransform: 'none',
            whiteSpace: 'nowrap',
            '&:hover': { backgroundColor: 'rgba(0, 20, 120, 1)' },
          }}
        >
          <AddIcon sx={{ width: '16px', height: '16px' }} />
          <Typography
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 500,
              fontSize: { xs: '12px', md: '13px' },
              lineHeight: '16.8px',
              color: '#fff',
            }}
          >
            Add New Album
          </Typography>
        </Button>
      </Box>

      {/* ── Album Grid ──────────────────────────────────── */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: { xs: '16px', sm: '20px', md: '30px' },
          }}
        >
          {albums.map((item, index) => (
          <Box
            key={index}
            onClick={() => navigate(`/admin/gallery/images/${item.id}`)}
            sx={{
              width: cardWidth,
              height: cardHeight,
              borderRadius: '12.77px',
              backgroundImage: `url(http://localhost:8081${item.coverImageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              overflow: 'hidden',
              flexShrink: 0,
              cursor: 'pointer',
            }}
          >
            {/* Three Dot Menu */}
            <Box
              aria-describedby={id}
              onClick={(e) => handleClick(e, item)}
              sx={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '24px',
                height: '30px',
                borderRadius: '5px',
                backgroundColor: 'rgba(255, 255, 255, 1)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                boxShadow: '0px 2px 6px rgba(0,0,0,0.15)',
                zIndex: 2,
                '&:hover': { backgroundColor: '#f0f0f0' },
              }}
            >
              <MoreVertIcon sx={{ fontSize: '18px', color: '#000' }} />
            </Box>

            {/* Album Title Badge */}
            <Box
              sx={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '90%',
                maxWidth: '284px',
                height: { xs: '48px', md: '58px' },
                borderRadius: '15.85px',
                backgroundColor: 'rgba(0, 28, 166, 1)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 10px',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 700,
                  fontSize: { xs: '13px', sm: '14px', md: '16px' },
                  color: '#ffffff',
                  textAlign: 'center',
                }}
              >
                {item.title}
              </Typography>
            </Box>
          </Box>
        ))}
        {albums.length === 0 && (
          <Typography sx={{ p: 2, fontFamily: 'Poppins, sans-serif' }}>No albums found. Click "Add New Album" to create one.</Typography>
        )}
      </Box>
      )}

      {/* ── Action Popover (Edit / Delete) ──────────────── */}
      <Popover
        disableScrollLock={true}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            elevation: 3,
            sx: {
              minWidth: '110px',
              borderRadius: '10px',
              overflow: 'hidden',
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
            handleClose(e);
            setIsAddAlbumOpen(true);
          }}
          sx={{
            padding: '12px 18px',
            cursor: 'pointer',
            borderBottom: '1px solid #eeeeee',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
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
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
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

      {/* ── Add New Album Popup ────────────────────────────── */}
      <AddNewAlbum
        open={isAddAlbumOpen}
        onClose={() => {
          setIsAddAlbumOpen(false);
          setSelectedAlbum(null);
          fetchAlbums(); // refresh after closing
        }}
        albumToEdit={selectedAlbum}
      />
    </Box>
  );
};

export default GalleryPage;
