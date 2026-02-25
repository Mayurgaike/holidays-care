const express = require('express');
const router = express.Router();
const axios = require('axios');
const Contact = require('../models/Contact');
const authMiddleware = require('../middleware/auth');

// Submit contact form (public)
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, destination, message } = req.body;
    
    // Create contact entry
    const contact = new Contact({
      name,
      phone,
      email,
      destination,
      message
    });
    
    await contact.save();
    
    // Send WhatsApp notification
    try {
      const whatsappMessage = `🆕 New Enquiry - Holidays Care\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n📧 Email: ${email}\n🌍 Destination: ${destination}\n💬 Message: ${message}\n\n📅 Date: ${new Date().toLocaleString()}`;
      
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${process.env.WHATSAPP_NUMBER}&text=${encodeURIComponent(whatsappMessage)}`;
      
      // Note: This will open WhatsApp on the client side
      // For automated sending, you'd need WhatsApp Business API
      console.log('WhatsApp notification URL:', whatsappUrl);
    } catch (whatsappError) {
      console.error('WhatsApp notification error:', whatsappError);
      // Continue even if WhatsApp fails
    }
    
    res.status(201).json({
      message: 'Enquiry submitted successfully! We will contact you soon.',
      contact
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all contacts (admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update contact status (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete contact (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
