import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link
} from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(135deg,#0d47a1,#0a2e6d)",
        color: "white",
        pt: 6,
        pb: 3,
        mt: 8
      }} 
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>

          {/* ABOUT */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              HOLIDAYS CARE
            </Typography>

            <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
              We Take Care of Your Memories
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.7 }}>
              Your trusted travel partner for unforgettable journeys. We
              specialize in curated domestic and international tour packages
              designed to create lifelong memories.
            </Typography>
          </Grid>

          {/* QUICK LINKS */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Quick Links
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
              <Link href="/" color="inherit" underline="none" sx={{ "&:hover": { opacity: 0.8 } }}>
                Home
              </Link>

              <Link href="/about" color="inherit" underline="none" sx={{ "&:hover": { opacity: 0.8 } }}>
                About Us
              </Link>

              <Link href="/tours" color="inherit" underline="none" sx={{ "&:hover": { opacity: 0.8 } }}>
                Tours
              </Link>

              <Link href="/contact" color="inherit" underline="none" sx={{ "&:hover": { opacity: 0.8 } }}>
                Contact
              </Link>
            </Box>
          </Grid>

          {/* CONTACT INFO */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Contact Info
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOnIcon fontSize="small" />
                <Typography variant="body2">
                  Roongta Shopping Hub, 6th Floor 6074, Agra - Mumbai Hwy, near Indira Nagar Underpass, Nashik, Maharashtra 422009
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <PhoneIcon fontSize="small" />
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography variant="body2">
                  +91 7666642587 
                </Typography>
                <Typography variant="body2">
                  +91 9923442592
                </Typography>
              </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EmailIcon fontSize="small" />
                <Typography variant="body2">
                  holidayscare@gmail.com
                </Typography>
              </Box>

            </Box>

            {/* SOCIAL MEDIA */}
          {/* SOCIAL MEDIA */}
<Box
  sx={{
    mt: 3,
    display: "flex",
    gap: 1.5
  }}
>

  <IconButton
    href="https://www.facebook.com/p/Holidays-Care-61570874318243/"
    target="_blank"
    sx={{
      bgcolor: "rgba(255,255,255,0.12)",
      width: 42,
      height: 42,
      color: "white",
      transition: "0.3s",
      "&:hover": {
        bgcolor: "#1877f2",
        transform: "scale(1.1)"
      }
    }}
  >
    <FacebookIcon fontSize="small" />
  </IconButton>

  <IconButton
    href="https://www.instagram.com/holidays_care/"
    target="_blank"
    sx={{
      bgcolor: "rgba(255,255,255,0.12)",
      width: 42,
      height: 42,
      color: "white",
      transition: "0.3s",
      "&:hover": {
        bgcolor: "#E4405F",
        transform: "scale(1.1)"
      }
    }}
  >
    <InstagramIcon fontSize="small" />
  </IconButton>

</Box>
          </Grid>
        </Grid>

        {/* COPYRIGHT */}
        <Box
          sx={{
            borderTop: "1px solid rgba(255,255,255,0.2)",
            mt: 4,
            pt: 3,
            textAlign: "center"
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            © {new Date().getFullYear()} Holidays Care. All rights reserved.
            Developed by SoftnicsMedia
          </Typography>
        </Box>

      </Container>
    </Box>
  );
};

export default Footer;