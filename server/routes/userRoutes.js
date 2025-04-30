import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

// Get user profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, profile } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, profile },
      { new: true }
    ).select('-password');
    
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;