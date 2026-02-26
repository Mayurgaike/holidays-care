import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Alert,
  Snackbar,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import { contactAPI } from '../services/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    destination: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await contactAPI.submit(formData);
      setSnackbar({
        open: true,
        message: 'Enquiry submitted successfully! We will contact you soon.',
        severity: 'success',
      });
      setFormData({
        name: '',
        phone: '',
        email: '',
        destination: '',
        message: '',
      });
      
      // Open WhatsApp with the enquiry details
      const whatsappMessage = `New Enquiry from ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nDestination: ${formData.destination}\nMessage: ${formData.message}`;
      const url = `https://wa.me/919999999999?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(url, '_blank');
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error submitting enquiry. Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const contactInfo = [
    {
      icon: <LocationOnIcon sx={{ fontSize: 40, color: '#0891D1' }} />,
      title: 'Address',
      details: 'Roongta Shopping Hub, 6th Floor 6074, Agra - Mumbai Hwy, near Indira Nagar Underpass, Front, at, Nashik, Maharashtra 422009',
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 40, color: '#0891D1' }} />,
      title: 'Phone',
      details: '+91 99999 99999',
    },
    {
      icon: <EmailIcon sx={{ fontSize: 40, color: '#0891D1' }} />,
      title: 'Email',
      details: 'info@holidayscare.com',
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0891D1 0%, #1565C0 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container>
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
            Contact Us
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9 }}>
            We'd Love to Hear From You
          </Typography>
        </Container>
      </Box>

      {/* Contact Info Cards */}
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {contactInfo.map((info, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'translateY(-10px)' },
                }}
              >
                <Box sx={{ mb: 2 }}>{info.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {info.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {info.details}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Contact Form */}
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
            Send Us an Enquiry
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={loading}
                  endIcon={<SendIcon />}
                  sx={{
                    bgcolor: '#0891D1',
                    py: 1.5,
                    '&:hover': { bgcolor: '#1565C0' },
                  }}
                >
                  {loading ? 'Submitting...' : 'Submit Enquiry'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>

        {/* Map Section */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
            Visit Our Office
          </Typography>
          <Paper elevation={3} sx={{ overflow: 'hidden' }}>
            <iframe
              src="https://share.google/lJisE9dFE0Dlv1QtR"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Office Location"
            />
          </Paper>
        </Box>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactPage;
