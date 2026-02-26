import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  Card,
  CardContent,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import StarIcon from '@mui/icons-material/Star';

const AboutPage = () => {
  const differences = [
    {
      icon: <PriceCheckIcon sx={{ fontSize: 40, color: '#0891D1' }} />,
      title: 'Personalized Packages',
      description: 'Every trip is customized to match your preferences and budget',
    },
    {
      icon: <StarIcon sx={{ fontSize: 40, color: '#0891D1' }} />,
      title: 'Transparent Pricing',
      description: 'No hidden costs, complete transparency in all our dealings',
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 40, color: '#0891D1' }} />,
      title: 'Local Support',
      description: '24/7 assistance from our local partners during your trip',
    },
    {
      icon: <VisibilityIcon sx={{ fontSize: 40, color: '#0891D1' }} />,
      title: 'Happy Customers',
      description: 'Over 10,000 satisfied travelers and counting',
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
            About Holidays Care
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9 }}>
            We Take Care of Your Memories
          </Typography>
        </Container>
      </Box>

      {/* Mission & Vision */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, height: '100%', bgcolor: '#f5f5f5' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <TrackChangesIcon sx={{ fontSize: 50, color: '#0891D1', mr: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  Our Mission
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ lineHeight: 1.8 }}>
                To make travel easy, affordable, and memorable for everyone. We believe that
                everyone deserves to explore the world and create beautiful memories without
                stress or hassle.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, height: '100%', bgcolor: '#f5f5f5' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <VisibilityIcon sx={{ fontSize: 50, color: '#0891D1', mr: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  Our Vision
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ lineHeight: 1.8 }}>
                To become the most trusted travel partner in India, known for exceptional
                service, personalized experiences, and unwavering commitment to customer
                satisfaction.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Why We Are Different */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 8 }}>
        <Container>
          <Typography variant="h3" align="center" sx={{ fontWeight: 700, mb: 6 }}>
            Why We Are Different
          </Typography>
          <Grid container spacing={4}>
            {differences.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    height: '100%',
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'translateY(-10px)' },
                  }}
                >
                  <CardContent>
                    <Box sx={{ mb: 2 }}>{item.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

{/* Stats Section */}
      <Box sx={{ bgcolor: '#0891D1', color: 'white', py: 6 }}>
        <Container>
          <Grid container spacing={4} sx={{ textAlign: 'center' }}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h2" sx={{ fontWeight: 700 }}>
                10,000+
              </Typography>
              <Typography variant="h6">Happy Customers</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h2" sx={{ fontWeight: 700 }}>
                500+
              </Typography>
              <Typography variant="h6">Tours Organized</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h2" sx={{ fontWeight: 700 }}>
                50+
              </Typography>
              <Typography variant="h6">Destinations</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutPage;
