import express from 'express';
import { protect, adminCheck } from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import Job from '../models/Job.js';

const router = express.Router();

// Get all users
router.get('/users', protect, adminCheck, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete job
router.delete('/jobs/:id', protect, adminCheck, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user role
router.patch('/users/:id/role', protect, adminCheck, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: req.body.role },
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;