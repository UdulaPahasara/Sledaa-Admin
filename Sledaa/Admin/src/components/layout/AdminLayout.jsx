import React, { useState } from 'react';
import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import SideBar from '../common/Admin/SideBar';
import TopBar from '../common/Admin/TopBar';

const SIDEBAR_WIDTH = 250;

const AdminLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // < 900px
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh', backgroundColor: '#f6f6f6' }}>

      {/* ── DESKTOP ONLY: fixed permanent sidebar ── */}
      {!isMobile && (
        <Box
          sx={{
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            zIndex: 1050,
            overflowY: 'auto',
            overflowX: 'hidden',
            backgroundColor: 'rgba(0, 12, 70, 1)', // Ensure full height is blue
          }}
        >
          <SideBar />
        </Box>
      )}

      {/* ── MOBILE/TABLET ONLY: hamburger slide-in Drawer ── */}
      {isMobile && (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={closeDrawer}
          ModalProps={{ keepMounted: true }}
          slotProps={{
            paper: {
              sx: {
                width: SIDEBAR_WIDTH,
                backgroundColor: 'rgba(0, 12, 70, 1)',
                border: 'none',
                overflowX: 'hidden',
                overflowY: 'auto',
                // Thin scrollbar so Resources is always reachable
                '&::-webkit-scrollbar': { width: '3px' },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  borderRadius: '2px',
                },
              },
            },
          }}
        >
          <SideBar onNavigate={closeDrawer} />
        </Drawer>
      )}

      {/* ── MAIN CONTENT (offset by sidebar on desktop) ── */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          marginLeft: { xs: 0, md: `${SIDEBAR_WIDTH}px` },
        }}
      >
        <TopBar
          onMenuToggle={isMobile ? toggleDrawer : null}
          isMobile={isMobile}
        />

        <Box sx={{ flexGrow: 1, pt: '70px' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
