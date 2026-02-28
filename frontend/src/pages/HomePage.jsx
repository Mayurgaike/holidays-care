import React, { useEffect, useState, useRef} from 'react';
import {
  Box, Container, Typography, Button, Grid, Card, CardContent,
  CardMedia, Avatar, Paper, IconButton, Rating,  TextField,Stack, Chip
} from '@mui/material';

import {
  ArrowBackIosNew, ArrowForwardIos, KeyboardArrowRight,
  Place, People, Flight, Star, Explore, Public
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { heroAPI } from '../services/api';

const HomePage = () => {
  const navigate = useNavigate();
  const [heroImages, setHeroImages] = useState([]);
 

  // Pagination states for showing 3 tours at a time
  const [domIndex, setDomIndex] = useState(0);
  const [intIndex, setIntIndex] = useState(0);
  const [currentHero, setCurrentHero] = useState(0);
const [fade, setFade] = useState(true);

useEffect(() => {
  if (!heroImages || heroImages.length === 0) return;
  const interval = setInterval(() => {
    setFade(false);                          // fade out
    setTimeout(() => {
      setCurrentHero(prev => (prev + 1) % heroImages.length);
      setFade(true);                         // fade in
    }, 400);
  }, 4000);
  return () => clearInterval(interval);
}, [heroImages]);

  useEffect(() => {
    fetchHero();
  }, []);
  

  const fetchHero = async () => {
    try {
      const res = await heroAPI.getAll();
      setHeroImages(res.data.length > 0 ? res.data : [
        { title: "Explore The World", subtitle: "Find your perfect destination", imageUrl: "" }
      ]);
    } catch {
      setHeroImages([{ title: "Explore The World", subtitle: "Find your perfect destination", imageUrl: "" }]);
    }
  };
  

  const popularTours = [
    { name: 'Nepal', price: 45999, image: 'nepal.jpg', caption: 'The Roof of the World' },
    { name: 'Vietnam', price: 65999, image: 'vietnam.jpg', caption: 'Land of the Ascending Dragon' },
    { name: 'Dubai', price: 49999, image: 'dubai.jpg', caption: 'Where Luxury Meets the Desert' },
  ];

  const domesticTours = [
    { name: 'Kashmir', price: 24999, image: 'kashmir.jpg' },
    { name: 'Kerala', price: 19999, image: 'kerala.jpg' },
    { name: 'Leh Ladakh', price: 34999, image: 'ladakh.jpg' },
    { name: 'Rajasthan', price: 17999, image: 'rajasthan.jpg' },
  ];

  const internationalTours = [
    { name: 'Thailand', price: 45999, image: 'thailand.jpg' },
    { name: 'Bali', price: 65999, image: 'bali.jpg' },
    { name: 'Maldives', price: 85000, image: 'maldives.jpg' },
    { name: 'Switzerland', price: 125000, image: 'northeast.jpg' },
    { name: 'Singapore', price: 59999, image: 'singapore.jpg' },
    {name: 'sri lanka', price: 34999, image: 'srilanka.jpg' },
     { name: 'Nepal', price: 45999, image: 'nepal.jpg'},
    { name: 'Vietnam', price: 65999, image: 'vietnam.jpg'},
    { name: 'Dubai', price: 49999, image: 'dubai.jpg'},
  ];
  const domScrollRef = useRef(null);
const intScrollRef = useRef(null);

// Auto scroll - Domestic
useEffect(() => {
  const el = domScrollRef.current;
  if (!el) return;
  const interval = setInterval(() => {
    const cardWidth = el.offsetWidth;
    const maxScroll = el.scrollWidth - el.offsetWidth;
    if (el.scrollLeft >= maxScroll - 10) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      el.scrollTo({ left: el.scrollLeft + cardWidth, behavior: 'smooth' });
    }
  }, 2500);
  return () => clearInterval(interval);
}, []);

// Auto scroll - International
useEffect(() => {
  const el = intScrollRef.current;
  if (!el) return;
  const interval = setInterval(() => {
    const cardWidth = el.offsetWidth;
    const maxScroll = el.scrollWidth - el.offsetWidth;
    if (el.scrollLeft >= maxScroll - 10) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      el.scrollTo({ left: el.scrollLeft + cardWidth, behavior: 'smooth' });
    }
  }, 2500);
  return () => clearInterval(interval);
}, []);
 const [isHovered, setIsHovered] = useState(false);
 const [form, setForm] = useState({
  name: "",
  phone: "",
  email: "",
  message: ""
});

useEffect(() => {

  if (isHovered) return;

  const interval = setInterval(() => {
    setDomIndex(prev =>
      (prev + 1) % domesticTours.length
    );
  }, 4000);

  return () => clearInterval(interval);

}, [isHovered, domesticTours.length]);

const handleChange = (e) => {
  setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
};

const handleSubmit = (e) => {
  e.preventDefault();
  const phone = "917666642587";  // ✅ your WhatsApp number
  const text =
    `Hello Holidays Care,%0A%0A` +
    `Name: ${form.name}%0A` +
    `Phone: ${form.phone}%0A` +
    `Email: ${form.email}%0A` +
    `Message: ${form.message}`;
  window.open(`https://wa.me/${phone}?text=${text}`);
};

  // Helper function to get 3 items for display
  const getVisibleTours = (list, startIndex) => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(list[(startIndex + i) % list.length]);
    }
    return items;
  };

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      
      {/* HERO SECTION */}
<Box
  sx={{
    height: "95vh",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${
      heroImages[currentHero]?.imageUrl
        ? `http://localhost:5000${heroImages[currentHero].imageUrl}`
        : '/hero.png'
    })`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: fade ? 1 : 0,                  // ✅ fade on the whole box
    transition: 'opacity 0.4s ease-in-out', // ✅ opacity transition works!
  }}
>
  <Container maxWidth="md">
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 6 },
        textAlign: 'center',
        background: 'rgba(255,255,255,0.15)',
        backdropFilter: 'blur(5px)',
        borderRadius: 6,
        border: '1px solid rgba(255,255,255,0.3)'
      }}
    >
      <Typography
        variant="h2"
        fontWeight={800}
        sx={{
          fontSize: { xs: '2.5rem', md: '3.75rem' },
          textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
          mb: 2
        }}
      >
        {heroImages[currentHero]?.title}
      </Typography>

      <Typography
        variant="h6"
        sx={{ mb: 4, opacity: 0.9, fontWeight: 300, letterSpacing: 1 }}
      >
        {heroImages[currentHero]?.subtitle}
      </Typography>

      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("/tours")}
        sx={{
          px: 6, py: 1.8,
          borderRadius: '50px',
          fontSize: 18,
          fontWeight: 600,
          textTransform: 'none',
          bgcolor: '#fff',
          color: '#1976d2',
          '&:hover': { bgcolor: '#f0f0f0' }
        }}
      >
        Start Your Journey
      </Button>

      {/* ✅ Dots indicator */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 3 }}>
        {heroImages.map((_, i) => (
          <Box
            key={i}
            onClick={() => setCurrentHero(i)}
            sx={{
              width: i === currentHero ? 24 : 8,
              height: 8,
              borderRadius: '10px',
              bgcolor: i === currentHero ? '#fff' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </Box>

    </Paper>
  </Container>
</Box>

      {/* MOST POPULAR SECTION */}
<Box sx={{ py: 10, bgcolor: '#fcf8f5' }}>
  <Container maxWidth="lg"> {/* Using lg ensures a standard comfortable width */}
    <Box textAlign="center" mb={6}>
      <Chip 
        icon={<Star sx={{ color: '#ff9800 !important' }} />} 
        label="Top Picks" 
        sx={{ fontWeight: 700, mb: 2, bgcolor: '#fff', border: '1px solid #ff9800' }} 
      />
      <Typography variant="h3" fontWeight={800} gutterBottom>
        Most Popular Tours
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Our most loved destinations by travelers around the globe.
      </Typography>
    </Box>

   <Grid
  container
  spacing={4}
  sx={{
    justifyContent: 'center',
    alignItems: 'stretch'
  }}
>
  {popularTours.map((tour, i) => (
    <Grid
      item
      key={i}
      xs={12}
      sm={6}
      md={4}
      sx={{ display: 'flex' }}
    >
      <Card
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
          height: { xs: 320, sm: 380, md: 420 },  // ✅ fixed height, no aspectRatio
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          '&:hover img': {
            transform: 'scale(1.1)'
          }
        }}
      >
        <CardMedia
          component="img"
          image={tour.image}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',      // ✅ all images fill equally
            transition: '0.6s'
          }}
        />

        {/* Gradient Overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)'
          }}
        />

        {/* Content */}
        <Box sx={{ position: 'relative', p: 4, color: 'white', zIndex: 2 }}>
          <Typography
            variant="overline"
            sx={{ opacity: 0.9, letterSpacing: 2, display: 'block', mb: 0.5 }}
          >
            {tour.caption}
          </Typography>

          <Typography
            variant="h4"
            fontWeight={800}
            sx={{ mb: 1, fontSize: { xs: '1.5rem', md: '2rem' } }}
          >
            {tour.name}
          </Typography>

          <Typography variant="h5" fontWeight={800} sx={{ color: '#4fc3f7', mb: 2 }}>
            ₹{tour.price.toLocaleString()}
          </Typography>

          <Button
            variant="contained"
            fullWidth
            sx={{
              borderRadius: 2,
              py: 1.5,
              fontWeight: 700,
              textTransform: 'none',
              boxShadow: '0 4px 14px rgba(0,118,255,0.39)'
            }}
            onClick={() => navigate(`/tours?destination=${tour.name}`)}
          >
            Book Now
          </Button>
        </Box>
      </Card>
    </Grid>
  ))}
</Grid>
  </Container>
</Box>

    {/* DOMESTIC SECTION */}
<Container sx={{ py: 10 }}>

  <Box mb={4}>
    <Stack direction="row" spacing={1} alignItems="center" color="primary.main" mb={1}>
      <Explore />
      <Typography variant="button" fontWeight={700}>
        Incredible India
      </Typography>
    </Stack>
    <Typography variant="h4" fontWeight={800}>Domestic Escapes</Typography>
    <Typography color="text.secondary">
      From the snowy peaks of the North to the serene backwaters of the South.
    </Typography>
  </Box>

  <Box
    sx={{ position: 'relative', px: { xs: 0, md: 6 } }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >

    {/* LEFT ARROW — desktop only */}
    <IconButton
      onClick={() => setDomIndex(prev => (prev - 1 + domesticTours.length) % domesticTours.length)}
      sx={{
        display: { xs: 'none', md: 'flex' },
        position: 'absolute', left: 0, top: '50%',
        transform: 'translateY(-50%)', zIndex: 2,
        bgcolor: '#fff', border: '1px solid #e0e0e0',
        width: 48, height: 48,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        '&:hover': { bgcolor: '#f5f5f5' }
      }}
    >
      <ArrowBackIosNew fontSize="small" />
    </IconButton>

    {/* RIGHT ARROW — desktop only */}
    <IconButton
      onClick={() => setDomIndex(prev => (prev + 1) % domesticTours.length)}
      sx={{
        display: { xs: 'none', md: 'flex' },
        position: 'absolute', right: 0, top: '50%',
        transform: 'translateY(-50%)', zIndex: 2,
        bgcolor: '#fff', border: '1px solid #e0e0e0',
        width: 48, height: 48,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        '&:hover': { bgcolor: '#f5f5f5' }
      }}
    >
      <ArrowForwardIos fontSize="small" />
    </IconButton>

    {/* MOBILE: auto-scroll + swipe */}
    <Box
      ref={domScrollRef}
      sx={{
        display: { xs: 'flex', md: 'none' },
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
        '&::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      {domesticTours.map((tour, i) => (
        <Box
          key={i}
          sx={{
            flex: '0 0 100%',       // ✅ exactly one card
            scrollSnapAlign: 'start',
            px: 1,
            pb: 2
          }}
        >
          <Card
            sx={{
              borderRadius: 4,
              border: '1px solid #f0f0f0',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              transition: '0.3s',
            }}
          >
            <CardMedia
              component="img"
              height="220"
              image={tour.image}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="h6" fontWeight={700}>{tour.name}</Typography>
              <Typography variant="h5" color="primary" fontWeight={800} my={1}>
                ₹{tour.price.toLocaleString()}
              </Typography>
              <Button variant="contained" sx={{ borderRadius: 1, fontWeight: 600, textTransform: 'none' }}>
                GET A QUOTE
              </Button>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>

    {/* DESKTOP: arrow carousel */}
    <Grid
      container spacing={3} justifyContent="center"
      sx={{ display: { xs: 'none', md: 'flex' } }}
    >
      {getVisibleTours(domesticTours, domIndex).map((tour, i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <Card
            sx={{
              borderRadius: 4, border: '1px solid #f0f0f0',
              boxShadow: 'none', transition: '0.3s',
              '&:hover': { boxShadow: '0 10px 30px rgba(0,0,0,0.08)', transform: 'translateY(-5px)' }
            }}
          >
            <CardMedia component="img" height="220" image={tour.image} sx={{ objectFit: 'cover' }} />
            <CardContent>
              <Typography variant="h6" fontWeight={700}>{tour.name}</Typography>
              <Typography variant="h5" color="primary" fontWeight={800} my={1}>
                ₹{tour.price.toLocaleString()}
              </Typography>
              <Button variant="contained" sx={{ borderRadius: 1, fontWeight: 600, textTransform: 'none' }}>
                GET A QUOTE
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

  </Box>
</Container>


{/* INTERNATIONAL SECTION */}
<Box sx={{ bgcolor: '#f8f9fa', py: 10 }}>
  <Container>

    <Box mb={4}>
      <Stack direction="row" spacing={1} alignItems="center" color="primary.main" mb={1}>
        <Public />
        <Typography variant="button" fontWeight={700}>Global Wonders</Typography>
      </Stack>
      <Typography variant="h4" fontWeight={800}>International Wonders</Typography>
      <Typography color="text.secondary">
        Collect stamps in your passport with our curated global experiences.
      </Typography>
    </Box>

    <Box
      sx={{ position: 'relative', px: { xs: 0, md: 6 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      {/* LEFT ARROW — desktop only */}
      <IconButton
        onClick={() => setIntIndex(prev => (prev - 1 + internationalTours.length) % internationalTours.length)}
        sx={{
          display: { xs: 'none', md: 'flex' },
          position: 'absolute', left: 0, top: '50%',
          transform: 'translateY(-50%)', zIndex: 2,
          bgcolor: '#fff', border: '1px solid #e0e0e0',
          width: 48, height: 48,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          '&:hover': { bgcolor: '#f5f5f5' }
        }}
      >
        <ArrowBackIosNew fontSize="small" />
      </IconButton>

      {/* RIGHT ARROW — desktop only */}
      <IconButton
        onClick={() => setIntIndex(prev => (prev + 1) % internationalTours.length)}
        sx={{
          display: { xs: 'none', md: 'flex' },
          position: 'absolute', right: 0, top: '50%',
          transform: 'translateY(-50%)', zIndex: 2,
          bgcolor: '#fff', border: '1px solid #e0e0e0',
          width: 48, height: 48,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          '&:hover': { bgcolor: '#f5f5f5' }
        }}
      >
        <ArrowForwardIos fontSize="small" />
      </IconButton>

      {/* MOBILE: auto-scroll + swipe */}
      <Box
        ref={intScrollRef}
        sx={{
          display: { xs: 'flex', md: 'none' },
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {internationalTours.map((tour, i) => (
          <Box
            key={i}
            sx={{
              flex: '0 0 100%',     // ✅ exactly one card
              scrollSnapAlign: 'start',
              px: 1,
              pb: 2
            }}
          >
            <Card
              sx={{
                borderRadius: 4,
                border: '1px solid #f0f0f0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: '0.3s',
              }}
            >
              <CardMedia
                component="img"
                height="220"
                image={tour.image}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" fontWeight={700}>{tour.name}</Typography>
                <Typography variant="h5" color="primary" fontWeight={800} my={1}>
                  ₹{tour.price.toLocaleString()}
                </Typography>
                <Button variant="contained" sx={{ borderRadius: 1, fontWeight: 600, textTransform: 'none' }}>
                  GET A QUOTE
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* DESKTOP: arrow carousel */}
      <Grid
        container spacing={3} justifyContent="center"
        sx={{ display: { xs: 'none', md: 'flex' } }}
      >
        {getVisibleTours(internationalTours, intIndex).map((tour, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card
              sx={{
                borderRadius: 4, border: '1px solid #eee',
                boxShadow: 'none', transition: '0.3s',
                '&:hover': { boxShadow: '0 10px 30px rgba(0,0,0,0.08)', transform: 'translateY(-5px)' }
              }}
            >
              <CardMedia component="img" height="220" image={tour.image} sx={{ objectFit: 'cover' }} />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" fontWeight={700}>{tour.name}</Typography>
                <Typography variant="h5" color="primary" fontWeight={800} my={1}>
                  ₹{tour.price.toLocaleString()}
                </Typography>
                <Button variant="contained" sx={{ borderRadius: 1, fontWeight: 600, textTransform: 'none' }}>
                  GET A QUOTE
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

    </Box>
  </Container>
</Box>

     <Box sx={{ py: 10, px: { xs: 2, sm: 4 } }}>

  {/* ✅ TRUE 50-50 FLEXBOX — same approach */}
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

      <Box sx={{ maxWidth: 500 }}>

        <Typography variant="h5" fontWeight={700} mb={3}>
          Get in Touch
        </Typography>

        {/* Phone */}
        <Box display="flex" mb={2} alignItems="flex-start">
          <Typography mr={2}>📞</Typography>
          <Box>
            <Typography>+91 98765 43210</Typography>
            <Typography>+91 91234 56789</Typography>
          </Box>
        </Box>

        {/* Email */}
        <Box display="flex" mb={2} alignItems="center">
          <Typography mr={2}>✉️</Typography>
          <Typography>sales.holidaycare@gmail.com</Typography>
        </Box>

        {/* Address */}
        <Box display="flex" mb={3} alignItems="flex-start">
          <Typography mr={2}>📍</Typography>
          <Typography>
            6th Floor, Roongta Shopping Hub, Nashik, Maharashtra, India
          </Typography>
        </Box>

        {/* Map */}
        <Paper
          elevation={4}
          sx={{
            borderRadius: 1,
            overflow: "hidden",
            height: 300,
            width: "100%"
          }}
        >
          <iframe
            title="map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            src="https://www.google.com/maps?q=Roongta%20Shopping%20Hub%20Nashik&output=embed"
          />
        </Paper>

      </Box>
    </Box>


    {/* RIGHT SIDE FORM */}
    <Box sx={{ flex: 1, width: { xs: "100%", md: "50%" } }}>

      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 3,
          width: "100%",
          boxShadow: "0 10px 35px rgba(0,0,0,0.12)"
        }}
      >

        <Typography variant="h5" fontWeight={700} mb={1}>
          Let's Talk
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Unlock your travel planning today.
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
  <Stack spacing={3}>

    <TextField
      name="name"
      fullWidth
      label="Your Name"
      required
      value={form.name}
      onChange={handleChange}
    />

    <TextField
      name="phone"
      fullWidth
      label="Phone Number"
      required
      value={form.phone}
      onChange={handleChange}
    />

    <TextField
      name="email"
      fullWidth
      label="Email Address"
      type="email"
      required
      value={form.email}
      onChange={handleChange}
    />

    <TextField
      name="message"
      fullWidth
      multiline
      rows={4}
      label="Your Message"
      required
      value={form.message}
      onChange={handleChange}
    />

    <Button
      type="submit"          
      fullWidth
      variant="contained"
      sx={{
        py: 1.6,
        borderRadius: 3,
        fontWeight: 700,
        fontSize: { xs: 14, md: 16 },
        textTransform: "none",
        background: "linear-gradient(90deg,#1976d2,#42a5f5)",
        "&:hover": {
          background: "linear-gradient(90deg,#1565c0,#1976d2)"
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

    </Box>
  );
};

export default HomePage;