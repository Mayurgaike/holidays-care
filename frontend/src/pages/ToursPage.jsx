import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Button,
  Chip,
  CircularProgress,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Rating,
  Slider,
  Paper,
  Drawer,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toursAPI } from '../services/api';

const ToursPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tabValue, setTabValue] = useState(0);
  const [allTours, setAllTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedDestination, setSelectedDestination] = useState('');

  useEffect(() => {
    fetchTours();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [allTours, tabValue, searchQuery, priceRange, sortBy, selectedDestination]);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await toursAPI.getAll();
      setAllTours(response.data);
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = allTours;

    // Category filter
    const category = tabValue === 0 ? 'domestic' : 'international';
    filtered = filtered.filter((tour) => tour.category === category);

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((tour) =>
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.destination?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price filter
    filtered = filtered.filter(
      (tour) => tour.price >= priceRange[0] && tour.price <= priceRange[1]
    );

    // Destination filter
    if (selectedDestination) {
      filtered = filtered.filter(
        (tour) => tour.destination === selectedDestination
      );
    }

    // Sort
    switch (sortBy) {
      case 'priceLow':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'popular':
        filtered.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
        break;
      default: // featured
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    setFilteredTours(filtered);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getUniqueDestinations = () => {
    const destinations = allTours
      .filter((tour) => tour.destination)
      .map((tour) => tour.destination);
    return [...new Set(destinations)];
  };

  const FilterPanel = () => (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
        Filters
      </Typography>

      {/* Search */}
      <TextField
        fullWidth
        placeholder="Search tours..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      {/* Destination */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Destination</InputLabel>
        <Select
          value={selectedDestination}
          label="Destination"
          onChange={(e) => setSelectedDestination(e.target.value)}
        >
          <MenuItem value="">All Destinations</MenuItem>
          {getUniqueDestinations().map((dest) => (
            <MenuItem key={dest} value={dest}>
              {dest}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Price Range */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
        </Typography>
        <Slider
          value={priceRange}
          onChange={(e, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={100000}
          step={5000}
          valueLabelFormat={(value) => `₹${value.toLocaleString()}`}
        />
      </Box>

      {/* Reset Filters */}
      <Button
        fullWidth
        variant="outlined"
        onClick={() => {
          setSearchQuery('');
          setPriceRange([0, 100000]);
          setSelectedDestination('');
          setSortBy('featured');
        }}
      >
        Reset Filters
      </Button>
    </Box>
  );

  const TourCard = ({ tour }) => (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 8,
        },
      }}
    >
      <CardActionArea onClick={() => navigate(`/tours/${tour._id}`)}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="240"
            image={
              tour.images?.[0]
                ? `http://localhost:5000${tour.images[0]}`
                : 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400'
            }
            alt={tour.title}
          />
          {tour.originalPrice && (
            <Chip
              label={`SAVE ${Math.round((1 - tour.price / tour.originalPrice) * 100)}%`}
              color="error"
              size="small"
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                fontWeight: 700,
              }}
            />
          )}
          {tour.featured && (
            <Chip
              label="Featured"
              size="small"
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                bgcolor: '#FFD700',
                color: '#000',
                fontWeight: 700,
              }}
            />
          )}
          <Box
            sx={{
              position: 'absolute',
              bottom: 12,
              left: 12,
              display: 'flex',
              gap: 1,
            }}
          >
            <Chip
              icon={<LocationOnIcon sx={{ fontSize: 16 }} />}
              label={tour.destination || tour.category}
              size="small"
              sx={{ bgcolor: 'rgba(255,255,255,0.95)', fontWeight: 600 }}
            />
          </Box>
        </Box>
        <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <Rating value={tour.rating || 4.5} precision={0.5} size="small" readOnly />
            <Typography variant="body2" color="text.secondary">
              ({tour.totalReviews || 0})
            </Typography>
            {tour.difficulty && (
              <Chip
                label={tour.difficulty}
                size="small"
                sx={{
                  ml: 'auto',
                  height: 20,
                  fontSize: '0.7rem',
                  bgcolor:
                    tour.difficulty === 'easy'
                      ? 'success.light'
                      : tour.difficulty === 'moderate'
                      ? 'warning.light'
                      : 'error.light',
                }}
              />
            )}
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
            {tour.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {tour.description}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <CalendarTodayIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {tour.duration}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid #e0e0e0',
              pt: 2,
            }}
          >
            <Box>
              <Typography variant="h5" sx={{ color: '#0891D1', fontWeight: 700 }}>
                ₹{tour.price.toLocaleString()}
              </Typography>
              {tour.originalPrice && (
                <Typography
                  variant="body2"
                  sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                >
                  ₹{tour.originalPrice.toLocaleString()}
                </Typography>
              )}
            </Box>
            <Button
              variant="contained"
              size="small"
              sx={{ bgcolor: '#7CB342', '&:hover': { bgcolor: '#689F38' } }}
            >
              View Details
            </Button>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );

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
            Explore Our Tours
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.95 }}>
            Choose from {allTours.length}+ amazing destinations
          </Typography>
        </Container>
      </Box>

      {/* Content */}
      <Container sx={{ py: 6 }}>
        {/* Tabs and Sort */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                fontSize: '1.1rem',
                fontWeight: 600,
                minWidth: 150,
              },
            }}
          >
            <Tab label="🏠 Domestic" />
            <Tab label="🌍 International" />
          </Tabs>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <IconButton
              sx={{ display: { md: 'none' } }}
              onClick={() => setMobileFilterOpen(true)}
            >
              <FilterListIcon />
            </IconButton>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
                startAdornment={<SortIcon sx={{ mr: 1, fontSize: 20 }} />}
              >
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="popular">Most Popular</MenuItem>
                <MenuItem value="priceLow">Price: Low to High</MenuItem>
                <MenuItem value="priceHigh">Price: High to Low</MenuItem>
                <MenuItem value="rating">Highest Rated</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* Filters Sidebar - Desktop */}
          <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 100 }}>
              <FilterPanel />
            </Paper>
          </Grid>

          {/* Tours Grid */}
          <Grid item xs={12} md={9}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress size={60} />
              </Box>
            ) : filteredTours.length > 0 ? (
              <>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Showing {filteredTours.length} tours
                </Typography>
                <Grid container spacing={3}>
                  {filteredTours.map((tour) => (
                    <Grid item xs={12} sm={6} lg={4} key={tour._id}>
                      <TourCard tour={tour} />
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  No tours found
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Try adjusting your filters or search criteria
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="right"
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
      >
        <Box sx={{ width: 300, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">Filters</Typography>
            <IconButton onClick={() => setMobileFilterOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <FilterPanel />
        </Box>
      </Drawer>
    </Box>
  );
};

export default ToursPage;
