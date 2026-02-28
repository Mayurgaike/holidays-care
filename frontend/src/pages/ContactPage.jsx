import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  Paper
} from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ContactPage = () => {

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phone = "917666642587";
    const text =
      `Hello Holidays Care,%0A%0A` +
      `Name: ${form.name}%0A` +
      `Phone: ${form.phone}%0A` +
      `Email: ${form.email}%0A` +
      `Message: ${form.message}`;
    window.open(`https://wa.me/${phone}?text=${text}`);
  };

  return (
    <Box sx={{ py: 10, px: { xs: 2, sm: 4 } }}>

      {/* PAGE TITLE */}
      <Typography
        variant="h3"
        align="center"
        sx={{ fontWeight: 700, mb: 2, color: "#0d47a1", fontSize: { xs: "2rem", md: "3rem" } }}
      >
        Contact Us
      </Typography>

      <Typography align="center" sx={{ mb: 8, color: "#555" }}>
        We'd love to hear from you. Reach out for travel packages or queries.
      </Typography>

      {/* 50-50 FLEXBOX LAYOUT */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 5, md: 8 },
          maxWidth: 1100,
          mx: "auto",
          alignItems: "flex-start"
        }}
      >

        {/* LEFT SIDE */}
        <Box sx={{ flex: 1, width: { xs: "100%", md: "50%" } }}>

          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
            Get in Touch
          </Typography>

          <Stack spacing={3}>

            <Stack direction="row" spacing={2} alignItems="flex-start">
              <PhoneIcon sx={{ color: "#1976d2", mt: 0.5 }} />
              <Typography>
                +91 7666642587 <br />
                +91 9923442592
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <EmailIcon sx={{ color: "#1976d2" }} />
              <Typography>sales.holidaycare@gmail.com</Typography>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="flex-start">
              <LocationOnIcon sx={{ color: "#1976d2", mt: 0.5 }} />
              <Typography>Roongta Shopping Hub, Nashik, Maharashtra</Typography>
            </Stack>

          </Stack>

         {/* SOCIAL ICONS */}
<Box sx={{ mt: 4 }}>
  <Typography sx={{ fontWeight: 600, mb: 1.5 }}>Follow Us</Typography>
  <Stack direction="row" spacing={2}>

    {/* Instagram — light bg, blue icon */}
    <IconButton
      href="#"
      sx={{
        bgcolor: "#f7fafd",        // ✅ light blue background
        color: "#1976d2",          // ✅ blue icon
        "&:hover": { bgcolor: "#bbdefb" }
      }}
    >
      <InstagramIcon />
    </IconButton>

    {/* Facebook — light bg, blue icon */}
    <IconButton
      href="#"
      sx={{
        bgcolor: "#f7fafd",       
        color: "#3e84ca",          
        
      }}
    >
      <FacebookIcon />
    </IconButton>

  </Stack>
</Box>

          {/* GOOGLE MAP */}
          <Box sx={{ mt: 4 }}>
            <iframe
              src="https://www.google.com/maps?q=Roongta%20Shopping%20Hub%20Nashik&output=embed"
              width="100%"
              height="280"
              style={{ border: 0, borderRadius: "1px" }}
              loading="lazy"
            />
          </Box>

        </Box>

        {/* RIGHT SIDE */}
        <Box sx={{ flex: 1, width: { xs: "100%", md: "50%" } }}>
          <Paper
            elevation={6}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 3,
              boxShadow: "0 10px 35px rgba(0,0,0,0.12)"
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              Let's Talk
            </Typography>

            <Typography
              variant="body2"
              sx={{ mb: 4, color: "text.secondary", fontSize: "0.95rem" }}
            >
              Unlock your travel planning today.
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>

                <TextField
                  name="name"
                  label="Your Name"
                  fullWidth
                  required
                  value={form.name}
                  onChange={handleChange}
                />

                <TextField
                  name="phone"
                  label="Phone Number"
                  fullWidth
                  required
                  value={form.phone}
                  onChange={handleChange}
                />

                <TextField
                  name="email"
                  label="Email Address"
                  type="email"
                  fullWidth
                  required
                  value={form.email}
                  onChange={handleChange}
                />

                <TextField
                  name="message"
                  label="Your Message"
                  fullWidth
                  multiline
                  minRows={4}
                  required
                  value={form.message}
                  onChange={handleChange}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    borderRadius: 1,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    background: "linear-gradient(90deg,#2563eb,#3b82f6)",
                    boxShadow: "0 6px 18px rgba(37,99,235,0.35)",
                    textTransform: "none",
                    "&:hover": {
                      background: "linear-gradient(90deg,#1e40af,#2563eb)",
                      boxShadow: "0 8px 22px rgba(30,64,175,0.45)"
                    }
                  }}
                >
                  Send Message
                </Button>

              </Stack>
            </Box>
          </Paper>
        </Box>

      </Box>
    </Box>
  );
};

export default ContactPage;