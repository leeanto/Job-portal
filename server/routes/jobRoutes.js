import express from 'express';
import Job from '../models/Job.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Create Job (Employer/Admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (!['employer', 'admin'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const job = await Job.create({
      ...req.body,
      postedBy: req.user.id
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'name email');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;