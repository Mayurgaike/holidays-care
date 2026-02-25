import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Chip,
  Paper,
  Rating,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Card,
  CardContent,
  ImageList,
  ImageListItem,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupIcon from '@mui/icons-material/Group';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import StarIcon from '@mui/icons-material/Star';
import { toursAPI } from '../services/api';

const TourDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchTourDetails();
  }, [id]);

  const fetchTourDetails = async () => {
    try {
      setLoading(true);
      const response = await toursAPI.getOne(id);
      setTour(response.data);
    } catch (error) {
      console.error('Error fetching tour details:', error);
      navigate('/tours');
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    const message = `Hi! I'm interested in booking the "${tour.title}" tour package. Can you provide more details?`;
    const url = `https://wa.me/919999999999?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!tour) {
    return null;
  }

  const images = tour.images && tour.images.length > 0
    ? tour.images.map(img => `http://localhost:5000${img}`)
    : ['https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800'];

  return (
    <Box>
      {/* Hero Image Section */}
      <Box sx={{ bgcolor: '#000' }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              height: { xs: 400, md: 500 },
              backgroundImage: `url(${images[selectedImage]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: { xs: 0, md: 2 },
              position: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: 'rgba(0,0,0,0.6)',
                color: 'white',
                p: 3,
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {tour.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip
                  icon={<LocationOnIcon />}
                  label={tour.destination || tour.category}
                  sx={{ bgcolor: 'rgba(255,255,255,0.9)' }}
                />
                <Chip
                  icon={<CalendarTodayIcon />}
                  label={tour.duration}
                  sx={{ bgcolor: 'rgba(255,255,255,0.9)' }}
                />
                {tour.difficulty && (
                  <Chip
                    label={tour.difficulty.toUpperCase()}
                    sx={{ bgcolor: 'rgba(255,255,255,0.9)' }}
                  />
                )}
              </Box>
            </Box>
          </Box>

          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <Box sx={{ mt: 2, display: 'flex', gap: 1, overflowX: 'auto', pb: 2 }}>
              {images.map((img, index) => (
                <Box
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  sx={{
                    width: 100,
                    height: 70,
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: 1,
                    cursor: 'pointer',
                    border: selectedImage === index ? '3px solid #0891D1' : '3px solid transparent',
                    transition: 'all 0.3s',
                    '&:hover': { opacity: 0.8 },
                  }}
                />
              ))}
            </Box>
          )}
        </Container>
      </Box>

      {/* Content Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            {/* Rating and Reviews */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Rating value={tour.rating || 4.5} precision={0.5} size="large" readOnly />
                <Typography variant="h6">
                  {(tour.rating || 4.5).toFixed(1)} ({tour.totalReviews || 0} reviews)
                </Typography>
                {tour.featured && (
                  <Chip
                    icon={<StarIcon />}
                    label="Featured"
                    color="warning"
                    sx={{ ml: 'auto' }}
                  />
                )}
              </Box>
            </Box>

            {/* Description */}
            <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                About This Tour
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
                {tour.description}
              </Typography>
            </Paper>

            {/* Highlights */}
            {tour.highlights && tour.highlights.length > 0 && (
              <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                  Tour Highlights
                </Typography>
                <Grid container spacing={2}>
                  {tour.highlights.map((highlight, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <CheckCircleIcon sx={{ color: '#7CB342', mt: 0.5 }} />
                        <Typography variant="body1">{highlight}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            )}

            {/* Inclusions */}
            {tour.inclusions && tour.inclusions.length > 0 && (
              <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                  What's Included
                </Typography>
                <List dense>
                  {tour.inclusions.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircleIcon sx={{ color: '#7CB342' }} />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}

            {/* Exclusions */}
            {tour.exclusions && tour.exclusions.length > 0 && (
              <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                  What's Not Included
                </Typography>
                <List dense>
                  {tour.exclusions.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CancelIcon sx={{ color: '#f44336' }} />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}

            {/* Itinerary */}
            {tour.itinerary && tour.itinerary.length > 0 && (
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                  Day-by-Day Itinerary
                </Typography>
                {tour.itinerary.map((day, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          bgcolor: '#0891D1',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                        }}
                      >
                        {day.day}
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {day.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 7 }}>
                      {day.description}
                    </Typography>
                    {index < tour.itinerary.length - 1 && <Divider sx={{ mt: 2 }} />}
                  </Box>
                ))}
              </Paper>
            )}
          </Grid>

          {/* Booking Sidebar */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                position: 'sticky',
                top: 100,
                border: '2px solid #0891D1',
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Starting From
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 1 }}>
                  <Typography variant="h3" sx={{ color: '#0891D1', fontWeight: 700 }}>
                    ₹{tour.price.toLocaleString()}
                  </Typography>
                  {tour.originalPrice && (
                    <Typography
                      variant="h6"
                      sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                    >
                      ₹{tour.originalPrice.toLocaleString()}
                    </Typography>
                  )}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  per person
                </Typography>
                {tour.originalPrice && (
                  <Chip
                    label={`Save ₹${(tour.originalPrice - tour.price).toLocaleString()}`}
                    color="success"
                    size="small"
                    sx={{ mt: 1 }}
                  />
                )}
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Quick Info */}
              <List dense sx={{ mb: 3 }}>
                <ListItem>
                  <ListItemIcon>
                    <CalendarTodayIcon color="action" />
                  </ListItemIcon>
                  <ListItemText primary="Duration" secondary={tour.duration} />
                </ListItem>
                {tour.maxGroupSize && (
                  <ListItem>
                    <ListItemIcon>
                      <GroupIcon color="action" />
                    </ListItemIcon>
                    <ListItemText primary="Group Size" secondary={`Max ${tour.maxGroupSize} people`} />
                  </ListItem>
                )}
                <ListItem>
                  <ListItemIcon>
                    <LocationOnIcon color="action" />
                    </ListItemIcon>
                  <ListItemText primary="Destination" secondary={tour.destination || tour.category} />
                </ListItem>
              </List>

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleBookNow}
                sx={{
                  bgcolor: '#7CB342',
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  '&:hover': { bgcolor: '#689F38' },
                  mb: 2,
                }}
              >
                Book Now
              </Button>

              <Button
                fullWidth
                variant="outlined"
                size="large"
                onClick={() => navigate('/contact')}
                sx={{
                  borderColor: '#0891D1',
                  color: '#0891D1',
                  py: 1.5,
                }}
              >
                Contact Us
              </Button>

              <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                <Typography variant="body2" align="center" color="text.secondary">
                  💯 100% Money Back Guarantee
                  <br />
                  🔒 Secure Payment
                  <br />
                  📞 24/7 Customer Support
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TourDetailPage;
