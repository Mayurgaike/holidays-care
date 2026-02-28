import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Container,
  useMediaQuery,
  useTheme,
  Divider,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, logout } = useAuth();

  // Menu items
  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'About Us', path: '/about' },
    { text: 'Tours', path: '/tours' },
    { text: 'Contact', path: '/contact' },
  ];

  if (isAuthenticated) {
    menuItems.push({ text: 'Admin', path: '/admin' });
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  // Mobile Drawer (unchanged)
  const drawer = (
    <Box sx={{ width: 270 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Box
          component="img"
          src="/logo.png"
          alt="logo"
          sx={{
            height: 50,
            width: 'auto',
            maxWidth: 160,
            objectFit: 'contain',
            display: 'block'
          }}
        />
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{
              py: 1.5,
              color: isActive(item.path) ? '#1976d2' : '#333',
              fontWeight: isActive(item.path) ? 600 : 500,
            }}
          >
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
        {isAuthenticated && (
          <ListItemButton onClick={handleLogout}>
            <ListItemText
              primary="Logout"
              sx={{ color: '#d32f2f', fontWeight: 600 }}
            />
          </ListItemButton>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={1}
        sx={{
          bgcolor: 'white',
          color: '#333',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              minHeight: { xs: 65, md: 85 },
              height: { xs: 65, md: 85 }, // Fixed height
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* Logo - FIXED: Much larger + centered */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: { xs: 140, md: 260 },
                height: { xs: 65, md: 85 }, // Full toolbar height
              }}
            >
              <Box
                component="img"
                src="/logo.png"
                alt="Holidays Care"
                sx={{
                  height: { xs: 45, md: 100 }, // Much larger desktop
                  width: 'auto',
                  maxWidth: { xs: 140, md: 260 },
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </Box>

            {/* Desktop Menu (unchanged) */}
            {isMobile ? (
              <IconButton onClick={handleDrawerToggle}>
                <MenuIcon sx={{ fontSize: 30 }} />
              </IconButton>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  gap: 3,
                  alignItems: 'center',
                }}
              >
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    component={Link}
                    to={item.path}
                    sx={{
                      fontSize: '15px',
                      fontWeight: 600,
                      color: isActive(item.path) ? '#1976d2' : '#333',
                      position: 'relative',
                      '&:hover': {
                        color: '#1976d2',
                        backgroundColor: 'transparent',
                      },
                      '&::after': isActive(item.path)
                        ? {
                            content: '""',
                            position: 'absolute',
                            bottom: -5,
                            left: 0,
                            width: '100%',
                            height: '3px',
                            backgroundColor: '#1976d2',
                            borderRadius: 2,
                          }
                        : {},
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
                {isAuthenticated && (
                  <Button
                    variant="contained"
                    onClick={handleLogout}
                    sx={{
                      ml: 2,
                      bgcolor: '#1976d2',
                      borderRadius: 2,
                      px: 3,
                      fontWeight: 600,
                      '&:hover': {
                        bgcolor: '#1565c0',
                      },
                    }}
                  >
                    Logout
                  </Button>
                )}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
