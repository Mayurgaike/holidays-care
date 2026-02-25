const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const HeroImage = require('../models/HeroImage');
const authMiddleware = require('../middleware/auth');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/hero/');
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

// Get all hero images (public)
router.get('/', async (req, res) => {
  try {
    const heroImages = await HeroImage.find({ isActive: true }).sort({ order: 1 });
    res.json(heroImages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create hero image (admin only)
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { title, subtitle, order } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }
    
    const heroImage = new HeroImage({
      title,
      subtitle,
      imageUrl: `/uploads/hero/${req.file.filename}`,
      order: order || 0
    });
    
    await heroImage.save();
    res.status(201).json(heroImage);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update hero image (admin only)
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { title, subtitle, order, isActive } = req.body;
    
    const updateData = { title, subtitle, order, isActive };
    
    if (req.file) {
      updateData.imageUrl = `/uploads/hero/${req.file.filename}`;
    }
    
    const heroImage = await HeroImage.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!heroImage) {
      return res.status(404).json({ message: 'Hero image not found' });
    }
    
    res.json(heroImage);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete hero image (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const heroImage = await HeroImage.findByIdAndDelete(req.params.id);
    
    if (!heroImage) {
      return res.status(404).json({ message: 'Hero image not found' });
    }
    
    res.json({ message: 'Hero image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
