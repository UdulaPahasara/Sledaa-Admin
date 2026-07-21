import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import pdfIcon from '../../../assets/AnnualReport/pdf-icon-red.webp';

const Pdf = ({ title = "2026 Annual Report", filename = "2026annualreport.pdf", onClickMenu }) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '963px',
        minHeight: '153px',
        backgroundColor: 'rgba(243, 243, 243, 1)',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: { xs: '20px', sm: '30px 40px' },
        boxSizing: 'border-box',
        position: 'relative'
      }}
    >
      {/* Top Row: Title and Menu */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Typography
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            fontSize: { xs: '18px', sm: '20px' },
            lineHeight: { xs: '28px', sm: '45px' },
            color: 'rgba(0, 0, 0, 1)',
            textTransform: 'capitalize'
          }}
        >
          {title}
        </Typography>
        
        <IconButton
          onClick={onClickMenu}
          sx={{
            width: '24px',
            height: '24px',
            backgroundColor: '#fff',
            borderRadius: '5px',
            boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
            '&:hover': { backgroundColor: '#f5f5f5' }
          }}
        >
          <MoreVertIcon sx={{ fontSize: '18px', color: '#000' }} />
        </IconButton>
      </Box>

      {/* Bottom Row: PDF Icon and Filename */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Box
          component="img"
          src={pdfIcon}
          alt="PDF Icon"
          sx={{
            width: '55px',
            height: '55px',
            objectFit: 'contain'
          }}
        />
        <Typography
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '28px',
            color: 'rgba(150, 150, 150, 1)',
            wordBreak: 'break-all'
          }}
        >
          {filename}
        </Typography>
      </Box>
    </Box>
  );
};

export default Pdf;
