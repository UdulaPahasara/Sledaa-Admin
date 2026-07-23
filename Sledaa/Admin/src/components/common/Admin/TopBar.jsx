import React from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import userAccIcon from '../../../assets/Admin/SideBar/useAcc.webp';
import { useAuth } from '../../../context/AuthContext';

const TopBar = ({ onMenuToggle, isMobile }) => {
  const { logout, user } = useAuth();

  const userName = user?.name || 'Kamal Rathnayaka';

  return (
    <Box
      sx={{
        left: { xs: 0, md: '250px' },
        height: 70,
        backgroundColor: 'rgba(0, 12, 70, 1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: { xs: '12px', md: '24px' },
        paddingRight: '32px',
        boxSizing: 'border-box',
        position: 'fixed',
        top: 0,
        right: 0,
        zIndex: 1100,
      }}
    >
      {/* ── Left: Hamburger (mobile/tablet only) ─── */}
      {isMobile ? (
        <IconButton
          onClick={onMenuToggle}
          sx={{
            color: '#fff',
            padding: '8px',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
          }}
        >
          <MenuIcon sx={{ fontSize: '28px' }} />
        </IconButton>
      ) : (
        // Spacer on desktop so the user section stays at the right
        <Box />
      )}

      {/* ── Right: User Account & Logout ─────────── */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
          {/* Account Icon Box */}
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: '15px',
              backgroundColor: 'rgba(255, 255, 255, 1)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '7px',
              boxSizing: 'border-box',
            }}
          >
            <Box
              component="img"
              src={userAccIcon}
              alt="User Account"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: 'invert(11%) sepia(85%) saturate(3015%) hue-rotate(224deg) brightness(88%) contrast(110%)',
              }}
            />
          </Box>

          {/* Text Section */}
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                fontSize: '10px',
                lineHeight: '100%',
                color: 'rgba(255, 255, 255, 1)',
                marginBottom: '3px',
              }}
            >
              Welcome
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 500,
                fontSize: { xs: '11px', md: '13px' },
                lineHeight: '100%',
                color: 'rgba(255, 255, 255, 1)',
                display: 'block',
              }}
            >
              {userName}
            </Typography>
          </Box>
        </Box>

        {/* ── Logout Button ── */}
        <Tooltip title="Logout">
          <IconButton 
            onClick={logout} 
            sx={{ 
              color: '#fff', 
              ml: 2,
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default TopBar;
