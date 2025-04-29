import express from 'express';
import User from '../models/User.js';
import Job from '../models/Job.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Middleware to check admin role
const adminCheck = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// Get all users (Admin only)
router.get('/users', authMiddleware, adminCheck, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a job (Admin only)
router.delete('/jobs/:id', authMiddleware, adminCheck, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;