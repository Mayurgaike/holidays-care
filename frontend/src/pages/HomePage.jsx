import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Avatar,
  Paper,
  Chip,
  Skeleton,
  CardActionArea,
  Fade,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  ArrowForwardIos,
  ArrowBackIos,
  KeyboardArrowRight,
  KeyboardArrowLeft,
  AttachMoney,
  Place,
  People,
  Star,
  Flight,
  BeachAccess,
  Favorite,
} from '@mui/icons-material';
import { toursAPI, heroAPI } from '../services/api';

const HomePage = () => {
  const navigate = useNavigate();
  const [heroImages, setHeroImages] = useState([]);
  const [currentHero, setCurrentHero] = useState(0);
  const [loading, setLoading] = useState(true);
  const [domesticScroll, setDomesticScroll] = useState(0);
  const [internationalScroll, setInternationalScroll] = useState(0);
  
  const domesticRef = useRef(null);
  const internationalRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (heroImages.length > 1) {
      const timer = setInterval(() => {
        setCurrentHero((prev) => (prev + 1) % heroImages.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [heroImages]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const heroRes = await heroAPI.getAll();
      setHeroImages(heroRes.data.length > 0 ? heroRes.data : [
        { title: 'Discover Your Dream Destination', subtitle: 'We Take Care of Your Memories', imageUrl: '' }
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const domesticTours = [
    { name: 'Kashmir', price: 24999, image: '/kashmir.jpg' },
    { name: 'Leh Ladakh', price: 34999, image: '/ladakh.jpg' },
    { name: 'Sikkim', price: 29999, image: '/sikkim.jpg' },
    { name: 'Rajasthan', price: 19999, image: '/rajasthan.jpg' },
    { name: 'Himachal', price: 29999, image: '/himachal.jpg' },
    { name: 'Uttarakhand', price: 24999, image: '/uttarakhand.jpg' },
    { name: 'Kerala', price: 14999, image: '/kerala.jpg' },
    { name: 'Seven Sisters', price: 64999, image: '/northeast.jpg' },
    { name: 'Varanasi', price: 24999, image: '/varanasi.jpg' },
  ];

  const internationalTours = [
    { name: 'Nepal', price: 45999, image: '/nepal.jpg' },
    { name: 'Singapore', price: 59999, image: '/singapore.jpg' },
    { name: 'Vietnam', price: 65999, image: '/vietnam.jpg' },
    { name: 'Dubai', price: 49999, image: '/dubai.jpg' },
    { name: 'Baku', price: 44999, image: '/baku.jpg' },
    { name: 'Sri Lanka', price: 34999, image: '/srilanka.jpg' },
    { name: 'Maldives', price: 85000, image: '/maldives.jpg' },
    { name: 'Bali', price: 65999, image: '/bali.jpg' },
    { name: 'Thailand', price: 45999, image: '/thailand.jpg' },
  ];

  const popularDestinations = [
    { name: 'Nepal', image: '/nepal.jpg', tours: 12 },
    { name: 'Vietnam', image: '/vietnam.jpg', tours: 8 },
    { name: 'Dubai', image: '/dubai.jpg', tours: 15 },
    { name: 'Kashmir', image: '/kashmir.jpg', tours: 20 },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      rating: 5,
      comment: 'Amazing experience! The team was professional and everything was perfectly organized. Would definitely recommend!',
      avatar: 'P',
      location: 'Mumbai',
      tour: 'Goa Beach Paradise'
    },
    {
      name: 'Rahul Patel',
      rating: 5,
      comment: 'Best honeymoon package ever! They took care of every detail. The Kashmir tour was breathtaking.',
      avatar: 'R',
      location: 'Ahmedabad',
      tour: 'Kashmir Valley Tour'
    },
    {
      name: 'Anjali Gupta',
      rating: 5,
      comment: 'Excellent service from start to finish. Great prices and wonderful memories created!',
      avatar: 'A',
      location: 'Delhi',
      tour: 'Rajasthan Heritage'
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Customers', icon: People },
    { number: '500+', label: 'Successful Tours', icon: Flight },
    { number: '8+', label: 'Years Experience', icon: Star },
    { number: '100+', label: 'Exciting Destinations', icon: Place },
  ];

  const whyChooseUs = [
    {
      icon: Place,
      title: 'Many Destinations',
      description: 'We offer a wide range of domestic and international tour packages.',
      color: '#FF6B6B'
    },
    {
      icon: AttachMoney,
      title: 'Best Value for Money',
      description: 'Get the best prices with quality service and no hidden costs.',
      color: '#4ECDC4'
    },
    {
      icon: BeachAccess,
      title: 'Beautiful Places',
      description: 'We take you to the most beautiful and popular tourist destinations.',
      color: '#45B7D1'
    },
    {
      icon: Favorite,
      title: 'Passion for Travel',
      description: 'We love travel and work hard to give you the best holiday experience.',
      color: '#F9CA24'
    },
  ];

  const handleNextHero = () => setCurrentHero((prev) => (prev + 1) % heroImages.length);
  const handlePrevHero = () => setCurrentHero((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  // Carousel Functions
  const scrollLeft = (ref, setScroll) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -360, behavior: 'smooth' });
      setScroll(prev => prev - 1);
    }
  };

  const scrollRight = (ref, setScroll) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 360, behavior: 'smooth' });
      setScroll(prev => prev + 1);
    }
  };

  return (
    <Box>
      {/* Hero Slider - Same as before */}
      <Box sx={{ position: 'relative', height: { xs: '70vh', md: '90vh' }, overflow: 'hidden' }}>
        <Fade in={true} timeout={1000}>
          <Box
            sx={{
              height: '100%',
              background: heroImages[currentHero]?.imageUrl
                ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(http://localhost:5000${heroImages[currentHero].imageUrl})`
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              transition: 'all 1s ease-in-out',
            }}
          />
        </Fade>
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center', py: 4 }}>
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: { xs: '3rem', md: '5rem' }, 
              fontWeight: 900, 
              mb: 2,
              lineHeight: 1.1,
              textShadow: '3px 3px 6px rgba(0,0,0,0.5)'
            }}
          >
            {heroImages[currentHero]?.title || 'Discover Your Dream Destination'}
          </Typography>
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 6, 
              fontWeight: 300,
              maxWidth: 800,
              mx: 'auto',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            {heroImages[currentHero]?.subtitle || 'We Take Care of Your Memories'}
          </Typography>
          
          <Paper
            elevation={24}
            sx={{
              p: 0.5,
              display: 'flex',
              bgcolor: 'rgba(255,255,255,0.98)',
              backdropFilter: 'blur(20px)',
              borderRadius: 4,
              maxWidth: 700,
              mx: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
            }}
          >
            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{
                flex: 1,
                borderRadius: 3,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                bgcolor: '#0891D1',
                '&:hover': { bgcolor: '#1565C0', transform: 'scale(1.02)' }
              }}
              onClick={() => navigate('/tours')}
            >
              Start Your Journey
            </Button>
          </Paper>
        </Container>

        <IconButton onClick={handlePrevHero} sx={{ position: 'absolute', left: 30, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', color: 'white', width: 56, height: 56, '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}>
          <ArrowBackIos />
        </IconButton>
        <IconButton onClick={handleNextHero} sx={{ position: 'absolute', right: 30, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', color: 'white', width: 56, height: 56, '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}>
          <ArrowForwardIos />
        </IconButton>

        <Box sx={{ position: 'absolute', bottom: 40, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 1 }}>
          {heroImages.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentHero(index)}
              sx={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                bgcolor: currentHero === index ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': { transform: 'scale(1.3)', bgcolor: 'white' }
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Popular Destinations - Same */}
      <Container sx={{ py: 12 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ fontSize: '3rem', fontWeight: 800, mb: 2, color: '#1a1a1a' }}>
            Popular Destinations
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontSize: '1.2rem', maxWidth: 600, mx: 'auto' }}>
            Explore our most loved travel destinations
          </Typography>
        </Box>
        <Grid container spacing={4} justifyContent="center">
          {popularDestinations.map((dest, index) => (
            <Grid item xs={6} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: 300,
                  borderRadius: 3,
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  '&:hover': {
                    transform: 'translateY(-20px) scale(1.02)',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.2)',
                  },
                }}
                onClick={() => navigate(`/tours?destination=${dest.name}`)}
              >
                <CardMedia component="img" height="100%" image={dest.image} alt={dest.name} sx={{ transition: 'transform 0.5s' }} />
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, bgcolor: 'rgba(0,0,0,0.8)', color: 'white', p: 3, transform: 'translateY(100%)', transition: 'all 0.4s ease-out' }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{dest.name}</Typography>
                  <Typography variant="body2">{dest.tours} Tours Available</Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 3. Domestic Tours - SCROLLING CAROUSEL (3 at a time) */}
      <Box sx={{ bgcolor: '#f8f9fa', py: 12 }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" sx={{ fontSize: '3rem', fontWeight: 800, mb: 2 }}>
              Domestic Tours
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontSize: '1.2rem' }}>
              Explore the beauty of India
            </Typography>
          </Box>
          
          <Box sx={{ position: 'relative', mb: 12 }}>
            <Box
              ref={domesticRef}
              sx={{
                display: 'flex',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                gap: 4,
                pb: 2,
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
                scrollBehavior: 'smooth',
              }}
            >
              {domesticTours.map((tour, index) => (
                <Box
                  key={index}
                  sx={{
                    flex: '0 0 360px',
                    scrollSnapAlign: 'start',
                    height: 420,
                  }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      overflow: 'hidden',
                      transition: 'all 0.4s',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
                      }
                    }}
                  >
                    <CardMedia component="img" height="220" image={tour.image} alt={tour.name} />
                    <CardContent sx={{ p: 3, pt: 0 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1a1a1a' }}>
                        {tour.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <AttachMoney sx={{ fontSize: 24, color: '#0891D1', mr: 1 }} />
                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#0891D1' }}>
                          ₹{tour.price.toLocaleString()}
                        </Typography>
                      </Box>
                      <Button
                        fullWidth
                        variant="contained"
                        endIcon={<KeyboardArrowRight />}
                        sx={{
                          mt: 2,
                          py: 1.2,
                          borderRadius: 2,
                          bgcolor: '#0891D1',
                          fontWeight: 600,
                          '&:hover': { bgcolor: '#1565C0', transform: 'translateX(5px)' }
                        }}
                        onClick={() => navigate(`/tours?destination=${tour.name}`)}
                      >
                        Explore Tour
                      </Button>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>

            {/* Carousel Navigation */}
            <IconButton
              onClick={() => scrollLeft(domesticRef, setDomesticScroll)}
              sx={{
                position: 'absolute',
                left: -60,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'white',
                width: 48,
                height: 48,
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                zIndex: 10,
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
            >
              <ArrowBackIos sx={{ fontSize: 20 }} />
            </IconButton>
            <IconButton
              onClick={() => scrollRight(domesticRef, setDomesticScroll)}
              sx={{
                position: 'absolute',
                right: -60,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'white',
                width: 48,
                height: 48,
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                zIndex: 10,
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
            >
              <ArrowForwardIos sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>

          {/* International Tours - SCROLLING CAROUSEL (3 at a time) */}
          <Box sx={{ position: 'relative' }}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="h2" sx={{ fontSize: '3rem', fontWeight: 800, mb: 2 }}>
                🌍 International Tours
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontSize: '1.2rem' }}>
                Discover the world with us
              </Typography>
            </Box>
            
            <Box
              ref={internationalRef}
              sx={{
                display: 'flex',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                gap: 4,
                pb: 2,
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
                scrollBehavior: 'smooth',
              }}
            >
              {internationalTours.map((tour, index) => (
                <Box
                  key={index}
                  sx={{
                    flex: '0 0 360px',
                    scrollSnapAlign: 'start',
                    height: 420,
                  }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      overflow: 'hidden',
                      transition: 'all 0.4s',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
                      }
                    }}
                  >
                    <CardMedia component="img" height="220" image={tour.image} alt={tour.name} />
                    <CardContent sx={{ p: 3, pt: 0 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1a1a1a' }}>
                        {tour.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <AttachMoney sx={{ fontSize: 24, color: '#0891D1', mr: 1 }} />
                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#0891D1' }}>
                          ₹{tour.price.toLocaleString()}
                        </Typography>
                      </Box>
                      <Button
                        fullWidth
                        variant="contained"
                        endIcon={<KeyboardArrowRight />}
                        sx={{
                          mt: 2,
                          py: 1.2,
                          borderRadius: 2,
                          bgcolor: '#0891D1',
                          fontWeight: 600,
                          '&:hover': { bgcolor: '#1565C0', transform: 'translateX(5px)' }
                        }}
                        onClick={() => navigate(`/tours?destination=${tour.name}`)}
                      >
                        Book Now
                      </Button>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>

            {/* International Carousel Navigation */}
            <IconButton
              onClick={() => scrollLeft(internationalRef, setInternationalScroll)}
              sx={{
                position: 'absolute',
                left: -60,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'white',
                width: 48,
                height: 48,
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                zIndex: 10,
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
            >
              <ArrowBackIos sx={{ fontSize: 20 }} />
            </IconButton>
            <IconButton
              onClick={() => scrollRight(internationalRef, setInternationalScroll)}
              sx={{
                position: 'absolute',
                right: -60,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'white',
                width: 48,
                height: 48,
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                zIndex: 10,
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
            >
              <ArrowForwardIos sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
        </Container>
      </Box>

      {/* Rest of the sections remain the same - Why Choose Us, Stats, Testimonials, CTA */}
      <Container sx={{ py: 16 }}>
        <Box sx={{ textAlign: 'center', mb: 12 }}>
          <Typography variant="h2" sx={{ fontSize: '3rem', fontWeight: 800, mb: 2 }}>
            Why Choose Us
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontSize: '1.2rem', maxWidth: 700, mx: 'auto' }}>
            Trusted by thousands of travelers worldwide
          </Typography>
        </Box>
        <Grid container spacing={6}>
          {whyChooseUs.map((item, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <Paper sx={{ p: 6, textAlign: 'center', height: '100%', borderRadius: 4, bgcolor: 'white', transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', border: `3px solid transparent`, '&:hover': { transform: 'translateY(-15px) scale(1.02)', boxShadow: '0 30px 60px rgba(0,0,0,0.15)', borderColor: item.color, bgcolor: `${item.color}08` } }}>
                <Box sx={{ width: 100, height: 100, borderRadius: '50%', bgcolor: `${item.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 4, transition: 'all 0.3s', '&:hover': { transform: 'scale(1.1)', bgcolor: `${item.color}20` } }}>
                  <item.icon sx={{ fontSize: 40, color: item.color }} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: '#1a1a1a' }}>{item.title}</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>{item.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', py: 12, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', opacity: 0.1 }}>
          <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path d="M0,0 L500,100 L1000,0 Z" fill="white"/>
          </svg>
        </Box>
        <Container>
          <Grid container spacing={6} sx={{ textAlign: 'center' }}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box sx={{ color: 'white', p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    <stat.icon sx={{ fontSize: 40, mr: 2, opacity: 0.8 }} />
                    <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, fontWeight: 900, background: 'linear-gradient(45deg, #fff, rgba(255,255,255,0.8))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{stat.number}</Typography>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>{stat.label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Container sx={{ py: 16 }}>
        <Box sx={{ textAlign: 'center', mb: 12 }}>
          <Typography variant="h2" sx={{ fontSize: '3rem', fontWeight: 800, mb: 2 }}>
            What Our Travelers Say
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontSize: '1.2rem', maxWidth: 600, mx: 'auto' }}>
            Don't just take our word for it
          </Typography>
        </Box>
        <Grid container spacing={4} justifyContent="center">
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper sx={{ p: 5, height: 350, borderRadius: 3, position: 'relative', overflow: 'hidden', bgcolor: 'white', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 30px 80px rgba(0,0,0,0.15)' }, '&:before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: 4, bgcolor: '#0891D1' } }}>
                <Box sx={{ mb: 3 }}>
                  <Rating value={testimonial.rating} readOnly size="large" sx={{ mb: 1 }} />
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>"{testimonial.comment}"</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: '#0891D1', width: 60, height: 60, fontSize: '1.5rem', fontWeight: 700, mr: 3 }}>{testimonial.avatar}</Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{testimonial.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{testimonial.location}</Typography>
                    <Chip label={testimonial.tour} size="small" sx={{ mt: 0.5, bgcolor: 'rgba(8, 145, 209, 0.1)', color: '#0891D1', fontWeight: 600 }} />
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ bgcolor: '#1a1a1a', py: 12, textAlign: 'center' }}>
        <Container>
          <Typography variant="h2" sx={{ color: 'white', fontSize: '3rem', fontWeight: 800, mb: 3 }}>
            Ready for Your Adventure?
          </Typography>
          <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.8)', mb: 6, maxWidth: 600, mx: 'auto' }}>
            Let's create unforgettable memories together
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/tours')}
            sx={{
              px: 6,
              py: 2,
              fontSize: '1.2rem',
              fontWeight: 700,
              borderRadius: 50,
              bgcolor: '#0891D1',
              boxShadow: '0 10px 30px rgba(8, 145, 209, 0.4)',
              '&:hover': {
                bgcolor: '#1565C0',
                transform: 'translateY(-3px)',
                boxShadow: '0 20px 40px rgba(8, 145, 209, 0.5)'
              }
            }}
          >
            Explore All Tours
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
