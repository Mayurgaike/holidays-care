const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Tour = require('../models/Tour');
const authMiddleware = require('../middleware/auth');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/tours/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Get all tours (public)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    
    if (category) {
      filter.category = category;
    }
    
    const tours = await Tour.find(filter).sort({ createdAt: -1 });
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single tour (public)
router.get('/:id', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create tour (admin only)
router.post('/', authMiddleware, upload.array('images', 5), async (req, res) => {
  try {
    const { title, description, price, duration, category, featured } = req.body;
    
    const images = req.files ? req.files.map(file => `/uploads/tours/${file.filename}`) : [];
    
    const tour = new Tour({
      title,
      description,
      price,
      duration,
      category,
      featured: featured === 'true',
      images
    });
    
    await tour.save();
    res.status(201).json(tour);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update tour (admin only)
router.put('/:id', authMiddleware, upload.array('images', 5), async (req, res) => {
  try {
    const { title, description, price, duration, category, featured, isActive } = req.body;
    
    const updateData = {
      title,
      description,
      price,
      duration,
      category,
      featured: featured === 'true',
      isActive: isActive === 'true'
    };
    
    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map(file => `/uploads/tours/${file.filename}`);
    }
    
    const tour = await Tour.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete tour (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    
    res.json({ message: 'Tour deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
