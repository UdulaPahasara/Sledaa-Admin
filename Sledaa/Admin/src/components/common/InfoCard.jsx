import React from 'react';
import { Box, Typography } from '@mui/material';

const InfoCard = ({ icon, title, description }) => {
  return (
    <Box sx={{ flexShrink: 0, scrollSnapAlign: 'center', width: '295px', height: 'auto', minHeight: '359px', backgroundColor: 'rgba(243, 243, 243, 1)', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', pt: '39px', px: '20px', pb: '20px', textAlign: 'center' }}>
      <Box sx={{ width: '56.69px', height: '56.69px', backgroundColor: 'rgba(221, 221, 221, 1)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', mb: '30px' }}>
        <img src={icon} alt={title} style={{ width: '24px', height: '24px' }} />
      </Box>
      <Typography sx={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', lineHeight: '20px', color: 'rgba(0, 0, 0, 1)', mb: '15px' }}>
        {title}
      </Typography>
      <Typography sx={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: '16px', lineHeight: '20px', color: 'rgba(117, 117, 117, 1)' }}>
        {description}
      </Typography>
    </Box>
  );
};

export default InfoCard;
