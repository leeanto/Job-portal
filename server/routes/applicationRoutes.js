import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Application from '../models/Application.js';
import Job from '../models/Job.js';
import { uploadResume } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Apply for job
router.post('/', protect, uploadResume, async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;
    const job = await Job.findById(jobId);
    
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
      coverLetter,
      resumeUrl: req.body.resumeUrl
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;