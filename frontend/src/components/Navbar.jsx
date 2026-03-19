import React, { useState } from "react";
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
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const menuItems = [
    { text: "Home", path: "/" },
    { text: "About Us", path: "/about" },
    { text: "Tours", path: "/tours" },
    { text: "Gallery", path: "/gallery" },
    { text: "Contact", path: "/contact" },
  ];

  if (isAuthenticated) menuItems.push({ text: "Admin", path: "/admin" });

  const isActive = (path) => location.pathname === path;

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileOpen(false);
  };

  const drawer = (
    <Box sx={{ width: 260 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <img
          src="/logo 1.png"
          alt="logo"
          style={{
            height: "clamp(70px, 7.5vw, 95px)",
            width: "auto",
            objectFit: "contain",
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
              color: isActive(item.path) ? "#1976d2" : "#333",
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
              sx={{ color: "#d32f2f", fontWeight: 600 }}
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
        sx={{ bgcolor: "white", color: "#333" }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 70, md: 100 },
              justifyContent: "space-between",
              alignItems: "center",
              px: { xs: 1, md: 4 },
            }}
          >
            {/* Logo */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <img
                src="/logo-horizontal.png"
                alt="Holidays Care"
                style={{
                  height: "clamp(70px, 7.5vw, 95px)",
                  width: "auto",
                  objectFit: "contain",
                }}
              />
            </Box>

            {/* Desktop Menu */}
            {isMobile ? (
              <IconButton onClick={handleDrawerToggle}>
                <MenuIcon sx={{ fontSize: 28 }} />
              </IconButton>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    component={Link}
                    to={item.path}
                    sx={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: isActive(item.path) ? "#1976d2" : "#333",
                      position: "relative",
                      "&:hover": {
                        color: "#1976d2",
                        backgroundColor: "transparent",
                      },
                      "&::after": isActive(item.path)
                        ? {
                            content: '""',
                            position: "absolute",
                            bottom: -4,
                            left: 0,
                            width: "100%",
                            height: "3px",
                            bgcolor: "#1976d2",
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
                      ml: 1,
                      bgcolor: "#1976d2",
                      borderRadius: 2,
                      px: 3,
                      fontWeight: 600,
                      "&:hover": { bgcolor: "#1565c0" },
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
