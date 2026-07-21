import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, Popover } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AreYouSure from '../../components/Popup/AreYouSure';
import AddMember from '../../components/common/Admin/AddMember';
import AddCoverImage from '../../components/common/Admin/AddCoverImage';

// Assets
import leadershipImg from '../../assets/Committee/leadershipImg.webp';
import ourTeamImg from '../../assets/Committee/ourteam.webp';

// Dummy data for cover images
// Helper Component for Image Box with Action Menu
const ActionImageBox = ({ src, sx, onClickMenu }) => (
  <Box sx={{ position: 'relative', ...sx }}>
    <Box
      component="img"
      src={src}
      alt="Committee Cover"
      sx={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: sx.borderRadius || '10px'
      }}
    />
    <IconButton
      onClick={onClickMenu}
      sx={{
        position: 'absolute',
        top: '8px',
        right: '8px',
        width: '24px',
        height: '24px',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: '5px',
        boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
        padding: 0,
        '&:hover': { backgroundColor: '#f5f5f5' }
      }}
    >
      <MoreVertIcon sx={{ fontSize: '16px', color: '#000' }} />
    </IconButton>
  </Box>
);

const AdminCommittee = () => {
  const [members, setMembers] = useState([]);
  const [pastMembers, setPastMembers] = useState([]);
  const [coverImages, setCoverImages] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isAddPastMemberOpen, setIsAddPastMemberOpen] = useState(false);
  const [isAddImageOpen, setIsAddImageOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [selectedMemberType, setSelectedMemberType] = useState('committee'); // 'committee' | 'past' | 'cover'
  
  // Edit mode states
  const [isEditMode, setIsEditMode] = useState(false);
  const [editMemberData, setEditMemberData] = useState(null);

  const fetchMembers = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/committee');
      if (response.ok) {
        const data = await response.json();
        setMembers(data);
      }
    } catch (error) {
      console.error("Failed to fetch committee members", error);
    }
  };

  const fetchPastMembers = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/past-committee');
      if (response.ok) {
        const data = await response.json();
        setPastMembers(data);
      }
    } catch (error) {
      console.error("Failed to fetch past committee members", error);
    }
  };

  const fetchCoverImages = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/committee-covers');
      if (response.ok) {
        const data = await response.json();
        setCoverImages(data);
      }
    } catch (error) {
      console.error("Failed to fetch committee cover images", error);
    }
  };

  React.useEffect(() => {
    fetchMembers();
    fetchPastMembers();
    fetchCoverImages();
  }, []);

  const handleSave = async (formData) => {
    const token = localStorage.getItem('jwt_token');
    let url = 'http://localhost:8081/api/committee';
    let method = 'POST';
    if (isEditMode && editMemberData) {
      url = `http://localhost:8081/api/committee/${editMemberData.id}`;
      method = 'PUT';
    }

    const response = await fetch(url, {
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to save member');
    }

    fetchMembers();
    setIsEditMode(false);
    setEditMemberData(null);
  };

  const handleSavePast = async (formData) => {
    const token = localStorage.getItem('jwt_token');
    let url = 'http://localhost:8081/api/past-committee';
    let method = 'POST';
    if (isEditMode && editMemberData) {
      url = `http://localhost:8081/api/past-committee/${editMemberData.id}`;
      method = 'PUT';
    }

    const response = await fetch(url, {
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to save past member');
    }

    fetchPastMembers();
    setIsEditMode(false);
    setEditMemberData(null);
  };

  const handleSaveCoverImage = async (formData, id) => {
    const token = localStorage.getItem('jwt_token');
    let url = 'http://localhost:8081/api/committee-covers';
    let method = 'POST';
    if (id) {
      url = `http://localhost:8081/api/committee-covers/${id}`;
      method = 'PUT';
    }

    const response = await fetch(url, {
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to save cover image');
    }

    fetchCoverImages();
    setIsEditMode(false);
    setEditMemberData(null);
  };

  const handleMenuClick = (e, id, type = 'committee') => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
    setSelectedMemberId(id);
    setSelectedMemberType(type);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setAnchorEl(null);
    setIsEditMode(true);
    let data = null;
    if (selectedMemberType === 'past') {
      data = pastMembers.find(m => m.id === selectedMemberId);
      setEditMemberData(data);
      setIsAddPastMemberOpen(true);
    } else if (selectedMemberType === 'cover') {
      data = coverImages.find(img => img.id === selectedMemberId);
      setEditMemberData(data);
      setIsAddImageOpen(true);
    } else {
      data = members.find(m => m.id === selectedMemberId);
      setEditMemberData(data);
      setIsAddMemberOpen(true);
    }
  };

  const handleDeleteClick = () => {
    setAnchorEl(null);
    setDeleteConfirmOpen(true);
  };

  const handleAddMemberClose = () => {
    setIsAddMemberOpen(false);
    setIsEditMode(false);
    setEditMemberData(null);
  };

  const handleAddPastMemberClose = () => {
    setIsAddPastMemberOpen(false);
    setIsEditMode(false);
    setEditMemberData(null);
  };

  const handleAddCoverClose = () => {
    setIsAddImageOpen(false);
    setIsEditMode(false);
    setEditMemberData(null);
  };

  const handleConfirmDelete = async () => {
    setDeleteConfirmOpen(false);
    if (!selectedMemberId) return;

    try {
      const token = localStorage.getItem('jwt_token');
      let endpoint = `/api/committee/${selectedMemberId}`;
      if (selectedMemberType === 'past') {
        endpoint = `/api/past-committee/${selectedMemberId}`;
      } else if (selectedMemberType === 'cover') {
        endpoint = `/api/committee-covers/${selectedMemberId}`;
      }

      const response = await fetch(`http://localhost:8081${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        if (selectedMemberType === 'past') {
          fetchPastMembers();
        } else if (selectedMemberType === 'cover') {
          fetchCoverImages();
        } else {
          fetchMembers();
        }
      } else {
        alert("Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'committee-action-popover' : undefined;

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
      {/* ── COMMITTEE COVER IMAGE SECTION ────────────────────────────────── */}
      <Box sx={{ mb: '80px' }}>
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
            COMMITTEE COVER IMAGE
          </Typography>
          
          <Button
            onClick={() => setIsAddImageOpen(true)}
            sx={{
              width: '159px',
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
              Add New Image
            </Typography>
          </Button>
        </Box>

        {/* Cover Images Layout */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: '30px' }}>
          {coverImages.length > 0 ? (
            <>
              {/* Main Large Image (isMain = true) */}
              {coverImages.find(img => img.isMain) ? (
                <ActionImageBox 
                  src={`http://localhost:8081${coverImages.find(img => img.isMain).imageUrl}`} 
                  sx={{ width: { xs: '100%', lg: '563px' }, height: { xs: 'auto', lg: '392px' }, borderRadius: '20px', left: { lg: '170px' } }} 
                  onClickMenu={(e) => handleMenuClick(e, coverImages.find(img => img.isMain).id, 'cover')} 
                />
              ) : (
                /* Fallback if no main image but secondary exist */
                <ActionImageBox 
                  src={`http://localhost:8081${coverImages[0].imageUrl}`} 
                  sx={{ width: { xs: '100%', lg: '563px' }, height: { xs: 'auto', lg: '392px' }, borderRadius: '20px', left: { lg: '170px' } }} 
                  onClickMenu={(e) => handleMenuClick(e, coverImages[0].id, 'cover')} 
                />
              )}
              
              {/* Secondary Images Column */}
              {coverImages.filter(img => !img.isMain).length > 0 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {coverImages.filter(img => !img.isMain).map(cover => (
                    <ActionImageBox 
                      key={cover.id}
                      src={`http://localhost:8081${cover.imageUrl}`} 
                      sx={{ width: { xs: '100%', lg: '187px' }, height: { xs: 'auto', lg: '122px' }, borderRadius: '10px', left: { lg: '180px' } }} 
                      onClickMenu={(e) => handleMenuClick(e, cover.id, 'cover')} 
                    />
                  ))}
                </Box>
              )}
            </>
          ) : (
            <Typography sx={{ fontFamily: 'Poppins', color: '#666', width: '100%', textAlign: 'center', py: 5 }}>
              No cover images found. Please add a new image.
            </Typography>
          )}
        </Box>
      </Box>

      {/* ── COMMITTEE MEMBERS SECTION ───────────────────────────────────── */}
      <Box>
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
            COMMITTEE MEMBERS
          </Typography>
          
          <Button
            onClick={() => setIsAddMemberOpen(true)}
            sx={{
              width: '159px',
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
              Add New Member
            </Typography>
          </Button>
        </Box>

        {/* Members Grid */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, 
          gap: '40px',
          justifyItems: 'center'
        }}>
          {members.map((member) => (
            <Box key={member.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '195.56px' }}>
              {/* Member Image with Action Menu */}
              <ActionImageBox 
                src={member.imageUrl ? `http://localhost:8081${member.imageUrl}` : ourTeamImg} 
                sx={{ width: '195.56px', height: '178.82px', borderRadius: '6.63px', mb: '16px', backgroundColor: '#f5f5f5' }} 
                onClickMenu={(e) => handleMenuClick(e, member.id)} 
              />
              
              {/* Member Info */}
              <Typography sx={{
                fontFamily: 'Poppins',
                fontWeight: 600,
                fontSize: '12px',
                lineHeight: '16px',
                color: '#000',
                textAlign: 'center',
                textTransform: 'uppercase',
                mb: '2px'
              }}>
                {member.name}
              </Typography>
              <Typography sx={{
                fontFamily: 'Poppins',
                fontWeight: 400,
                fontSize: '10px',
                lineHeight: '14px',
                color: '#666',
                textAlign: 'center'
              }}>
                {member.position}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── PAST COMMITTEE MEMBERS SECTION ───────────────────────────────────── */}
      <Box sx={{ mt: '80px' }}>
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
            PAST COMMITTEE MEMBERS
          </Typography>
          
          <Button
            onClick={() => setIsAddPastMemberOpen(true)}
            sx={{
              width: 'auto', // Auto width to fit content
              height: '37px',
              backgroundColor: 'rgba(0, 28, 166, 1)',
              borderRadius: '9.98px',
              textTransform: 'none',
              padding: '7.98px 16px 7.98px 12px',
              display: 'flex',
              gap: '4.99px',
              whiteSpace: 'nowrap',
              '&:hover': { backgroundColor: 'rgba(0, 20, 120, 1)' }
            }}
          >
            <AddIcon sx={{ width: '16px', height: '16px', color: '#fff' }} />
            <Typography sx={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '13px', color: '#fff', whiteSpace: 'nowrap' }}>
              Add Past Committee Member
            </Typography>
          </Button>
        </Box>

        {/* Past Members Grid */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, 
          gap: '40px',
          justifyItems: 'center'
        }}>
          {pastMembers.map((member) => (
            <Box key={member.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '195.56px' }}>
              {/* Member Image with Action Menu */}
              <ActionImageBox 
                src={member.imageUrl ? `http://localhost:8081${member.imageUrl}` : ourTeamImg} 
                sx={{ width: '195.56px', height: '178.82px', borderRadius: '6.63px', mb: '16px', backgroundColor: '#f5f5f5' }} 
                onClickMenu={(e) => handleMenuClick(e, member.id, 'past')} 
              />
              
              {/* Member Info */}
              <Typography sx={{
                fontFamily: 'Poppins',
                fontWeight: 600,
                fontSize: '12px',
                lineHeight: '16px',
                color: '#000',
                textAlign: 'center',
                textTransform: 'uppercase',
                mb: '2px'
              }}>
                {member.name}
              </Typography>
              <Typography sx={{
                fontFamily: 'Poppins',
                fontWeight: 400,
                fontSize: '10px',
                lineHeight: '14px',
                color: '#666',
                textAlign: 'center'
              }}>
                {member.position}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── ACTION POPOVER (Edit/Delete) ───────────────────────────────── */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        disableScrollLock={true}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            elevation: 3,
            sx: {
              minWidth: '110px',
              borderRadius: '10px',
              overflow: 'hidden', // Set to hidden to clip hover background correctly
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.12)',
              backgroundColor: '#fff',
            }
          }
        }}
      >
        <Box
          onClick={handleEditClick}
          sx={{
            padding: '12px 18px',
            cursor: 'pointer',
            borderBottom: '1px solid #eeeeee',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
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
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
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

      {/* ── ADD MEMBER POPUP ──────────────────────────────────── */}
      <AddMember 
        open={isAddMemberOpen} 
        onClose={handleAddMemberClose}
        onSave={handleSave}
        member={selectedMemberType === 'committee' ? editMemberData : null}
      />
 
      {/* ── ADD PAST MEMBER POPUP ─────────────────────────────── */}
      <AddMember 
        open={isAddPastMemberOpen} 
        onClose={handleAddPastMemberClose}
        onSave={handleSavePast}
        title="Add Past Committee Member"
        member={selectedMemberType === 'past' ? editMemberData : null}
      />
 
      {/* ── ADD COVER IMAGE POPUP ─────────────── */}
      <AddCoverImage
        open={isAddImageOpen}
        onClose={handleAddCoverClose}
        onSave={handleSaveCoverImage}
        cover={selectedMemberType === 'cover' ? editMemberData : null}
      />

    </Box>
  );
};

export default AdminCommittee;
