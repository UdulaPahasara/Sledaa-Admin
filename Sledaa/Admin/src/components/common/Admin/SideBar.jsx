import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

// Assets
import logo from '../../../assets/logo/logo.webp';
import galleryIcon from '../../../assets/Admin/SideBar/gellery.webp';
import eventIcon from '../../../assets/Admin/SideBar/event.webp';
import committeeIcon from '../../../assets/Admin/SideBar/tabler_user.webp';
import newsIcon from '../../../assets/Admin/SideBar/news.webp';
import projectsIcon from '../../../assets/Admin/SideBar/project.webp';
import reportIcon from '../../../assets/Admin/SideBar/report.webp';
import resourcesIcon from '../../../assets/Admin/SideBar/Resources.webp';

const menuItems = [
  { text: 'Gallery', path: '/admin/gallery', icon: galleryIcon },
  { text: 'Events', path: '/admin/events', icon: eventIcon },
  { text: 'Committee', path: '/admin/committee', icon: committeeIcon },
  { text: 'News', path: '/admin/news', icon: newsIcon },
  { text: 'Projects', path: '/admin/projects', icon: projectsIcon },
  { text: 'Report', path: '/admin/report', icon: reportIcon },
  { text: 'Resources', path: '/admin/resources', icon: resourcesIcon },
];

const SideBar = ({ onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      sx={{
        width: 250,
        backgroundColor: 'rgba(0, 12, 70, 1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '28px',
        paddingBottom: '28px',
        boxSizing: 'border-box',
        // On desktop this Box is inside a fixed container - natural height is fine
        // On mobile it's inside a Drawer Paper with overflowY auto - natural height scrolls
      }}
    >
      {/* Logo */}
      <Box
        component="img"
        src={logo}
        alt="Logo"
        sx={{
          width: 82,
          height: 83,
          objectFit: 'contain',
          marginBottom: { xs: '24px', md: '52px' }, // Reduce gap on small screens
        }}
      />

      {/* Menu List */}
      <List sx={{ width: '100%', padding: 0 }}>
        {menuItems.map((item) => {
          // Check if active (exact match or starts with path)
          const isActive = location.pathname.startsWith(item.path);

          return (
            <ListItem
              key={item.text}
              onClick={() => {
                navigate(item.path);
                if (onNavigate) onNavigate(); // Close drawer on mobile
              }}
              sx={{
                width: 223,
                height: 48,
                margin: '0 auto 8px auto',
                borderRadius: '10px',
                padding: '0 16px',
                backgroundColor: isActive ? 'rgba(240, 245, 255, 1)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: isActive ? 'rgba(240, 245, 255, 1)' : 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 'unset' }}>
                {item.icon ? (
                  <Box
                    component="img"
                    src={item.icon}
                    alt={item.text}
                    sx={{
                      width: 24,
                      height: 24,
                      objectFit: 'contain',
                    // We must start with brightness(0) saturate(100%) to turn the white icon black,
                    // then apply invert, sepia, and hue-rotate to reach the dark blue #000C46.
                    filter: isActive 
                      ? 'brightness(0) saturate(100%) invert(9%) sepia(59%) saturate(4678%) hue-rotate(228deg) brightness(92%) contrast(109%)' 
                      : 'none',
                    }}
                  />
                ) : (
                  <item.FallbackIcon
                    sx={{
                      width: 24,
                      height: 24,
                      color: isActive ? 'rgba(0, 12, 70, 1)' : 'rgba(255, 255, 255, 1)',
                    }}
                  />
                )}
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography
                    sx={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 500,
                      fontSize: '16px',
                      lineHeight: '24px',
                      letterSpacing: '0px',
                      color: isActive ? 'rgba(0, 12, 70, 1)' : 'rgba(255, 255, 255, 1)',
                    }}
                  >
                    {item.text}
                  </Typography>
                }
                sx={{ margin: 0 }}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default SideBar;
