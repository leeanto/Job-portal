import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Job from '../models/Job.js';

const router = express.Router();

// Create job
router.post('/', protect, async (req, res) => {
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

export default router;