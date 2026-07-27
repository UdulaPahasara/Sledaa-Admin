import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, Popover } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AreYouSure from '../../components/Popup/AreYouSure';
import AddMember from '../../components/common/Admin/AddMember';
import AddCoverImage from '../../components/common/Admin/AddCoverImage';
import AddPastCommittee from '../../components/common/Admin/AddPastCommittee';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

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
  const [pastYearCoverImages, setPastYearCoverImages] = useState([]);
  const [pastCommittees, setPastCommittees] = useState([
    { id: '2025', yearName: '2025 Committee', imageUrl: null },
    { id: '2024', yearName: '2024 Committee', imageUrl: null },
    { id: '2023', yearName: '2023 Committee', imageUrl: null },
    { id: '2022', yearName: '2022 Committee', imageUrl: null },
  ]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isAddPastMemberOpen, setIsAddPastMemberOpen] = useState(false);
  const [isAddPastCommitteeModalOpen, setIsAddPastCommitteeModalOpen] = useState(false);
  const [isAddImageOpen, setIsAddImageOpen] = useState(false);
  const [isAddPastYearImageOpen, setIsAddPastYearImageOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [selectedMemberType, setSelectedMemberType] = useState('committee'); // 'committee' | 'past' | 'cover' | 'pastYearCover'
  const [selectedPastYear, setSelectedPastYear] = useState(null);
  
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

  const fetchPastMembers = async (yearDbId) => {
    if (!yearDbId) {
      setPastMembers([]);
      return;
    }
    try {
      const response = await fetch(`http://localhost:8081/api/past-committee/year/${yearDbId}`);
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

  const fetchPastCommittees = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/past-committee-years');
      if (response.ok) {
        const data = await response.json();
        // Map backend fields to frontend shape
        setPastCommittees(data.map(y => ({
          id: y.yearLabel,
          dbId: y.id,
          yearName: y.yearName,
          imageUrl: y.coverImageUrl ? `http://localhost:8081${y.coverImageUrl}` : null
        })));
      }
    } catch (error) {
      console.error("Failed to fetch past committee years", error);
    }
  };

  const fetchPastYearCoverImages = async (yearLabel) => {
    try {
      const response = await fetch(`http://localhost:8081/api/past-committee-covers?year=${yearLabel}`);
      if (response.ok) {
        const data = await response.json();
        setPastYearCoverImages(data);
      } else {
        setPastYearCoverImages([]);
      }
    } catch (error) {
      console.error("Failed to fetch past year cover images", error);
      setPastYearCoverImages([]);
    }
  };

  React.useEffect(() => {
    fetchMembers();
    fetchCoverImages();
    fetchPastCommittees();
  }, []);

  React.useEffect(() => {
    if (selectedPastYear) {
      fetchPastYearCoverImages(selectedPastYear);
      const currentYear = pastCommittees.find(c => c.id === selectedPastYear);
      if (currentYear) fetchPastMembers(currentYear.dbId);
    } else {
      setPastYearCoverImages([]);
      setPastMembers([]);
    }
  }, [selectedPastYear, pastCommittees]);

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
    
    const currentYear = pastCommittees.find(c => c.id === selectedPastYear);
    if (currentYear && !isEditMode) {
      formData.append('yearId', currentYear.dbId);
    }
    
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

    if (currentYear) {
      fetchPastMembers(currentYear.dbId);
    }
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

  const handleSavePastYearCoverImage = async (formData, id) => {
    const token = localStorage.getItem('jwt_token');

    // Find the dbId of the currently selected past year
    const currentYear = pastCommittees.find(c => c.id === selectedPastYear);

    let url;
    let method;
    if (id) {
      // Editing an existing cover image
      url = `http://localhost:8081/api/past-committee-covers/${id}`;
      method = 'PUT';
    } else {
      // Adding new cover images to the selected year
      if (!currentYear?.dbId) {
        alert('Could not find the year record. Please try again.');
        return;
      }
      url = `http://localhost:8081/api/past-committee-years/${currentYear.dbId}/covers`;
      method = 'POST';
    }

    const response = await fetch(url, {
      method,
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to save past year cover image');
    }

    // Refresh the cover images for the currently selected year
    fetchPastYearCoverImages(selectedPastYear);
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
    } else if (selectedMemberType === 'pastYearCover') {
      data = pastYearCoverImages.find(img => img.id === selectedMemberId);
      setEditMemberData(data);
      setIsAddPastYearImageOpen(true);
    } else if (selectedMemberType === 'pastYear') {
      // Find the full committee object from state so we have the real dbId
      const committeeObj = pastCommittees.find(c => c.id === selectedMemberId);
      data = committeeObj ? { ...committeeObj, yearName: committeeObj.yearName } : { yearName: selectedMemberId + ' Committee' };
      setEditMemberData(data);
      setIsAddPastCommitteeModalOpen(true);
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
      let url = null;
      let refreshFn = null;

      if (selectedMemberType === 'committee') {
        url = `http://localhost:8081/api/committee/${selectedMemberId}`;
        refreshFn = fetchMembers;
      } else if (selectedMemberType === 'past') {
        url = `http://localhost:8081/api/past-committee/${selectedMemberId}`;
        const currentYear = pastCommittees.find(c => c.id === selectedPastYear);
        refreshFn = currentYear ? () => fetchPastMembers(currentYear.dbId) : () => {};
      } else if (selectedMemberType === 'cover') {
        url = `http://localhost:8081/api/committee-covers/${selectedMemberId}`;
        refreshFn = fetchCoverImages;
      } else if (selectedMemberType === 'pastYearCover') {
        url = `http://localhost:8081/api/past-committee-covers/${selectedMemberId}`;
        refreshFn = () => fetchPastYearCoverImages(selectedPastYear);
      } else if (selectedMemberType === 'pastYear') {
        
        const committeeObj = pastCommittees.find(c => c.id === selectedMemberId);
        if (!committeeObj?.dbId) {
          alert('Cannot delete: year record not found.');
          return;
        }
        url = `http://localhost:8081/api/past-committee-years/${committeeObj.dbId}`;
        refreshFn = fetchPastCommittees;
      }

      if (!url) return;

      const response = await fetch(url, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok || response.status === 204) {
        if (refreshFn) refreshFn();
      } else {
        const text = await response.text();
        alert('Failed to delete: ' + text);
      }
    } catch (error) {
      console.error('Error deleting', error);
      alert('An error occurred while deleting.');
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
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: '30px', justifyContent: 'center' }}>
          {coverImages.length > 0 ? (
            <>
              {/* Main Large Image (isMain = true) */}
              {coverImages.find(img => img.isMain) ? (
                <ActionImageBox 
                  src={`http://localhost:8081${coverImages.find(img => img.isMain).imageUrl}`} 
                  sx={{ width: { xs: '100%', lg: '563px' }, height: { xs: 'auto', lg: '392px' }, borderRadius: '20px' }} 
                  onClickMenu={(e) => handleMenuClick(e, coverImages.find(img => img.isMain).id, 'cover')} 
                />
              ) : (
                /* Fallback if no main image but secondary exist */
                <ActionImageBox 
                  src={`http://localhost:8081${coverImages[0].imageUrl}`} 
                  sx={{ width: { xs: '100%', lg: '563px' }, height: { xs: 'auto', lg: '392px' }, borderRadius: '20px' }} 
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
                      sx={{ width: { xs: '100%', lg: '187px' }, height: { xs: 'auto', lg: '122px' }, borderRadius: '10px' }} 
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
        {!selectedPastYear ? (
          <>
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
                onClick={() => setIsAddPastCommitteeModalOpen(true)}
                sx={{
                  width: 'auto',
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
                  Add Past Committee
                </Typography>
              </Button>
            </Box>

            {/* Past Year Cards Grid */}
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, 
              gap: '20px',
              width: '100%'
            }}>
              {pastCommittees.map((committee) => (
                <Box 
                  key={committee.id}
                  sx={{ 
                    position: 'relative',
                    width: '100%',
                    maxWidth: '248px',
                    mx: 'auto'
                  }}
                >
                  <Box 
                    onClick={() => setSelectedPastYear(committee.id)}
                    sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '257px',
                      backgroundColor: committee.imageUrl ? 'transparent' : 'rgba(0, 28, 166, 1)',
                      backgroundImage: committee.imageUrl ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("${committee.imageUrl}")` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)'
                      }
                    }}>
                    <Typography sx={{
                      fontFamily: 'Poppins',
                      fontWeight: 700,
                      fontSize: '20px',
                      color: '#fff',
                      textAlign: 'center'
                    }}>
                      {committee.id}
                    </Typography>
                    <Typography sx={{
                      fontFamily: 'Poppins',
                      fontWeight: 600,
                      fontSize: '20px',
                      color: '#fff',
                      textAlign: 'center'
                    }}>
                      Committee
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuClick(e, committee.id, 'pastYear');
                    }}
                    sx={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
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
              ))}
            </Box>
          </>
        ) : (
          <>
            {/* Detailed View for Selected Year */}
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Button 
                startIcon={<ArrowBackIosNewIcon />} 
                onClick={() => setSelectedPastYear(null)} 
                sx={{ 
                  color: 'rgba(0, 28, 166, 1)', 
                  fontFamily: 'Poppins', 
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '16px'
                }}
              >
                Back
              </Button>
            </Box>
            
            <Typography sx={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '20px', color: '#000', mb: 4, textAlign: 'center' }}>
              {selectedPastYear} Committee
            </Typography>

            {/* Committee Cover Image Section for Past Year */}
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
                  onClick={() => {
                    setSelectedMemberType('pastYearCover');
                    setIsAddPastYearImageOpen(true);
                  }}
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

              {/* Past Year Cover Images rendered from pastYearCoverImages state */}
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: '30px', justifyContent: 'center' }}>
                {pastYearCoverImages.length > 0 ? (
                  <>
                    {pastYearCoverImages.find(img => img.isMain) ? (
                      <ActionImageBox
                        src={pastYearCoverImages.find(img => img.isMain).imageUrl ? `http://localhost:8081${pastYearCoverImages.find(img => img.isMain).imageUrl}` : leadershipImg}
                        sx={{ width: { xs: '100%', lg: '563px' }, height: { xs: 'auto', lg: '405px' }, borderRadius: '20px' }}
                        onClickMenu={(e) => handleMenuClick(e, pastYearCoverImages.find(img => img.isMain).id, 'pastYearCover')}
                      />
                    ) : (
                      <ActionImageBox
                        src={pastYearCoverImages[0].imageUrl ? `http://localhost:8081${pastYearCoverImages[0].imageUrl}` : leadershipImg}
                        sx={{ width: { xs: '100%', lg: '563px' }, height: { xs: 'auto', lg: '392px' }, borderRadius: '20px' }}
                        onClickMenu={(e) => handleMenuClick(e, pastYearCoverImages[0].id, 'pastYearCover')}
                      />
                    )}
                    {pastYearCoverImages.filter(img => !img.isMain).length > 0 && (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {pastYearCoverImages.filter(img => !img.isMain).map(img => (
                          <ActionImageBox
                            key={img.id}
                            src={img.imageUrl ? `http://localhost:8081${img.imageUrl}` : leadershipImg}
                            sx={{ width: { xs: '100%', lg: '187px' }, height: { xs: 'auto', lg: '122px' }, borderRadius: '10px' }}
                            onClickMenu={(e) => handleMenuClick(e, img.id, 'pastYearCover')}
                          />
                        ))}
                      </Box>
                    )}
                  </>
                ) : (
                  <Box sx={{
                    width: '100%',
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(243, 243, 243, 1)',
                    borderRadius: '10px'
                  }}>
                    <Typography sx={{ fontFamily: 'Poppins', color: '#aaa', fontSize: '14px' }}>
                      No cover images yet. Click "+ Add New Image" to add one.
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>

            {/* Committee Members Section for Past Year */}
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
                  onClick={() => setIsAddPastMemberOpen(true)}
                  sx={{
                    width: 'auto',
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
                    Add New Member
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
          </>
        )}
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
 
      {/* ── ADD COVER IMAGE POPUP (MAIN COMMITTEE) ─────────────── */}
      <AddCoverImage
        open={isAddImageOpen}
        onClose={handleAddCoverClose}
        onSave={handleSaveCoverImage}
        cover={selectedMemberType === 'cover' ? editMemberData : null}
      />

      {/* ── ADD PAST YEAR COVER IMAGE POPUP (ISOLATED) ─────────────── */}
      <AddCoverImage
        open={isAddPastYearImageOpen}
        onClose={() => {
          setIsAddPastYearImageOpen(false);
          setIsEditMode(false);
          setEditMemberData(null);
        }}
        onSave={(formData) => {
          handleSavePastYearCoverImage(formData, editMemberData?.id);
        }}
        cover={selectedMemberType === 'pastYearCover' ? editMemberData : null}
      />

      {/* ── ADD PAST COMMITTEE POPUP ─────────────── */}
      <AddPastCommittee
        open={isAddPastCommitteeModalOpen}
        onClose={() => {
          setIsAddPastCommitteeModalOpen(false);
          setIsEditMode(false);
          setEditMemberData(null);
        }}
        initialData={selectedMemberType === 'pastYear' ? editMemberData : null}
        onSave={async (data) => {
          const token = localStorage.getItem('jwt_token');
          const formData = new FormData();
          formData.append('yearLabel', data.yearLabel || data.yearName.replace(' Committee', '').trim());
          formData.append('yearName', data.yearName);
          if (data.image) {
            formData.append('coverImage', data.image);
          }

          let url = 'http://localhost:8081/api/past-committee-years';
          let method = 'POST';

          if (isEditMode && editMemberData?.dbId) {
            url = `http://localhost:8081/api/past-committee-years/${editMemberData.dbId}`;
            method = 'PUT';
          }

          try {
            const response = await fetch(url, {
              method,
              headers: { 'Authorization': `Bearer ${token}` },
              body: formData
            });

            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(errorText || 'Failed to save past committee year');
            }

            fetchPastCommittees();
          } catch (err) {
            console.error('Failed to save past committee year:', err);
            
            // Extract a user-friendly message if it's a JSON string
            let msg = err.message;
            try {
              const parsed = JSON.parse(msg);
              msg = parsed.message || parsed.error || msg;
            } catch (e) {}
            
            alert('An error occurred while saving: ' + msg);
          } finally {
            setIsAddPastCommitteeModalOpen(false);
            setIsEditMode(false);
            setEditMemberData(null);
          }
        }}
      />

    </Box>
  );
};

export default AdminCommittee;
