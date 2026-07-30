import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Popover } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Pdf from '../../components/common/Admin/Pdf';
import AreYouSure from '../../components/Popup/AreYouSure';
import AddDocument from '../../components/common/Admin/AddDocument';

const Report = () => {
  const [reports, setReports] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [addReportOpen, setAddReportOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(null);
  
  // Edit states
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchReports = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/reports');
      if (response.ok) {
        const data = await response.json();
        setReports(Array.isArray(data) ? data.reverse() : data);
      }
    } catch (error) {
      console.error("Failed to fetch reports", error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleSave = async (formData) => {
    const token = localStorage.getItem('jwt_token');
    let url = 'http://localhost:8081/api/reports';
    let method = 'POST';
    if (isEditMode && editData) {
      url = `http://localhost:8081/api/reports/${editData.id}`;
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
      throw new Error(errorText || 'Failed to save report');
    }

    fetchReports();
    setIsEditMode(false);
    setEditData(null);
  };

  const handleMenuClick = (e, id) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
    setSelectedReportId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setAnchorEl(null);
    setIsEditMode(true);
    const data = reports.find(r => r.id === selectedReportId);
    setEditData(data);
    setAddReportOpen(true);
  };

  const handleDeleteClick = () => {
    setAnchorEl(null);
    setDeleteConfirmOpen(true);
  };

  const handleAddClose = () => {
    setAddReportOpen(false);
    setIsEditMode(false);
    setEditData(null);
  };

  const handleConfirmDelete = async () => {
    setDeleteConfirmOpen(false);
    if (!selectedReportId) return;

    try {
      const token = localStorage.getItem('jwt_token');
      const response = await fetch(`http://localhost:8081/api/reports/${selectedReportId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        fetchReports();
      } else {
        alert("Failed to delete report");
      }
    } catch (error) {
      console.error("Error deleting report", error);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'report-action-popover' : undefined;

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
          ANNUAL REPORT
        </Typography>
        
        <Button
          onClick={() => setAddReportOpen(true)}
          sx={{
            width: '185px',
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
            Add New Report
          </Typography>
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {reports.map((report) => (
          <Pdf
            key={report.id}
            title={report.title}
            filename={report.filename}
            onClickMenu={(e) => handleMenuClick(e, report.id)}
          />
        ))}
      </Box>

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
              overflow: 'hidden',
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

      <AreYouSure 
        open={deleteConfirmOpen} 
        onClose={() => setDeleteConfirmOpen(false)} 
        onConfirm={handleConfirmDelete} 
      />

      <AddDocument 
        open={addReportOpen}
        onClose={handleAddClose}
        uploadLabel="Add Report"
        onSave={handleSave}
        document={editData}
      />

    </Box>
  );
};

export default Report;
