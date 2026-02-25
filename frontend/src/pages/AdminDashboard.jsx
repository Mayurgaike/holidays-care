import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Tab,
  Tabs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Alert,
  Snackbar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { toursAPI, heroAPI, contactAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { isAuthenticated } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [tours, setTours] = useState([]);
  const [heroImages, setHeroImages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [tourForm, setTourForm] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    category: 'domestic',
    featured: false,
    images: [],
  });

  const [heroForm, setHeroForm] = useState({
    title: '',
    subtitle: '',
    image: null,
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated]);

  const fetchAllData = async () => {
    try {
      const [toursRes, heroRes, contactsRes] = await Promise.all([
        toursAPI.getAll(),
        heroAPI.getAll(),
        contactAPI.getAll(),
      ]);
      setTours(toursRes.data);
      setHeroImages(heroRes.data);
      setContacts(contactsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (type, item = null) => {
    setDialogType(type);
    setEditItem(item);
    if (type === 'tour') {
      if (item) {
        setTourForm({
          title: item.title,
          description: item.description,
          price: item.price,
          duration: item.duration,
          category: item.category,
          featured: item.featured,
          images: [],
        });
      } else {
        setTourForm({
          title: '',
          description: '',
          price: '',
          duration: '',
          category: 'domestic',
          featured: false,
          images: [],
        });
      }
    } else if (type === 'hero') {
      if (item) {
        setHeroForm({
          title: item.title,
          subtitle: item.subtitle,
          image: null,
        });
      } else {
        setHeroForm({
          title: '',
          subtitle: '',
          image: null,
        });
      }
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditItem(null);
  };

  const handleSaveTour = async () => {
    try {
      const formData = new FormData();
      formData.append('title', tourForm.title);
      formData.append('description', tourForm.description);
      formData.append('price', tourForm.price);
      formData.append('duration', tourForm.duration);
      formData.append('category', tourForm.category);
      formData.append('featured', tourForm.featured);

      if (tourForm.images.length > 0) {
        Array.from(tourForm.images).forEach((file) => {
          formData.append('images', file);
        });
      }

      if (editItem) {
        await toursAPI.update(editItem._id, formData);
        setSnackbar({ open: true, message: 'Tour updated successfully!', severity: 'success' });
      } else {
        await toursAPI.create(formData);
        setSnackbar({ open: true, message: 'Tour created successfully!', severity: 'success' });
      }

      fetchAllData();
      handleCloseDialog();
    } catch (error) {
      setSnackbar({ open: true, message: 'Error saving tour', severity: 'error' });
    }
  };

  const handleSaveHero = async () => {
    try {
      const formData = new FormData();
      formData.append('title', heroForm.title);
      formData.append('subtitle', heroForm.subtitle);
      if (heroForm.image) {
        formData.append('image', heroForm.image);
      }

      if (editItem) {
        await heroAPI.update(editItem._id, formData);
        setSnackbar({ open: true, message: 'Hero image updated successfully!', severity: 'success' });
      } else {
        await heroAPI.create(formData);
        setSnackbar({ open: true, message: 'Hero image created successfully!', severity: 'success' });
      }

      fetchAllData();
      handleCloseDialog();
    } catch (error) {
      setSnackbar({ open: true, message: 'Error saving hero image', severity: 'error' });
    }
  };

  const handleDeleteTour = async (id) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      try {
        await toursAPI.delete(id);
        setSnackbar({ open: true, message: 'Tour deleted successfully!', severity: 'success' });
        fetchAllData();
      } catch (error) {
        setSnackbar({ open: true, message: 'Error deleting tour', severity: 'error' });
      }
    }
  };

  const handleDeleteHero = async (id) => {
    if (window.confirm('Are you sure you want to delete this hero image?')) {
      try {
        await heroAPI.delete(id);
        setSnackbar({ open: true, message: 'Hero image deleted successfully!', severity: 'success' });
        fetchAllData();
      } catch (error) {
        setSnackbar({ open: true, message: 'Error deleting hero image', severity: 'error' });
      }
    }
  };

  const handleUpdateContactStatus = async (id, status) => {
    try {
      await contactAPI.updateStatus(id, status);
      fetchAllData();
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 4 }}>
          Admin Dashboard
        </Typography>

        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 4 }}>
          <Tab label="Tours Management" />
          <Tab label="Hero Images" />
          <Tab label="Contact Enquiries" />
        </Tabs>

        {/* Tours Management */}
        {tabValue === 0 && (
          <Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog('tour')}
              sx={{ mb: 3, bgcolor: '#0891D1' }}
            >
              Add New Tour
            </Button>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Title</strong></TableCell>
                    <TableCell><strong>Category</strong></TableCell>
                    <TableCell><strong>Price</strong></TableCell>
                    <TableCell><strong>Duration</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tours.map((tour) => (
                    <TableRow key={tour._id}>
                      <TableCell>{tour.title}</TableCell>
                      <TableCell>
                        <Chip
                          label={tour.category}
                          color={tour.category === 'domestic' ? 'primary' : 'secondary'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>₹{tour.price.toLocaleString()}</TableCell>
                      <TableCell>{tour.duration}</TableCell>
                      <TableCell>
                        {tour.featured && <Chip label="Featured" color="success" size="small" />}
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpenDialog('tour', tour)} size="small">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteTour(tour._id)} size="small" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Hero Images */}
        {tabValue === 1 && (
          <Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog('hero')}
              sx={{ mb: 3, bgcolor: '#0891D1' }}
            >
              Add Hero Image
            </Button>
            <Grid container spacing={3}>
              {heroImages.map((hero) => (
                <Grid item xs={12} md={4} key={hero._id}>
                  <Paper sx={{ p: 2 }}>
                    <img
                      src={`http://localhost:5000${hero.imageUrl}`}
                      alt={hero.title}
                      style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 8 }}
                    />
                    <Typography variant="h6" sx={{ mt: 2 }}>{hero.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{hero.subtitle}</Typography>
                    <Box sx={{ mt: 2 }}>
                      <IconButton onClick={() => handleOpenDialog('hero', hero)} size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteHero(hero._id)} size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Contact Enquiries */}
        {tabValue === 2 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Phone</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Destination</strong></TableCell>
                  <TableCell><strong>Message</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact._id}>
                    <TableCell>{contact.name}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.destination}</TableCell>
                    <TableCell>{contact.message.substring(0, 50)}...</TableCell>
                    <TableCell>
                      <Select
                        value={contact.status}
                        onChange={(e) => handleUpdateContactStatus(contact._id, e.target.value)}
                        size="small"
                      >
                        <MenuItem value="new">New</MenuItem>
                        <MenuItem value="contacted">Contacted</MenuItem>
                        <MenuItem value="closed">Closed</MenuItem>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>

      {/* Dialog for Add/Edit */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editItem ? 'Edit' : 'Add'} {dialogType === 'tour' ? 'Tour' : 'Hero Image'}
        </DialogTitle>
        <DialogContent>
          {dialogType === 'tour' && (
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Title"
                value={tourForm.title}
                onChange={(e) => setTourForm({ ...tourForm, title: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={tourForm.description}
                onChange={(e) => setTourForm({ ...tourForm, description: e.target.value })}
                sx={{ mb: 2 }}
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Price"
                    type="number"
                    value={tourForm.price}
                    onChange={(e) => setTourForm({ ...tourForm, price: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Duration"
                    value={tourForm.duration}
                    onChange={(e) => setTourForm({ ...tourForm, duration: e.target.value })}
                  />
                </Grid>
              </Grid>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={tourForm.category}
                  onChange={(e) => setTourForm({ ...tourForm, category: e.target.value })}
                >
                  <MenuItem value="domestic">Domestic</MenuItem>
                  <MenuItem value="international">International</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Featured</InputLabel>
                <Select
                  value={tourForm.featured}
                  onChange={(e) => setTourForm({ ...tourForm, featured: e.target.value })}
                >
                  <MenuItem value={false}>No</MenuItem>
                  <MenuItem value={true}>Yes</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ mt: 2 }}
              >
                Upload Images
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={(e) => setTourForm({ ...tourForm, images: e.target.files })}
                />
              </Button>
            </Box>
          )}
          {dialogType === 'hero' && (
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Title"
                value={heroForm.title}
                onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Subtitle"
                value={heroForm.subtitle}
                onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                sx={{ mb: 2 }}
              />
              <Button
                variant="outlined"
                component="label"
                fullWidth
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => setHeroForm({ ...heroForm, image: e.target.files[0] })}
                />
              </Button>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={dialogType === 'tour' ? handleSaveTour : handleSaveHero}
            variant="contained"
            sx={{ bgcolor: '#0891D1' }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminDashboard;
