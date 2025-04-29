import express from 'express';
import Application from '../models/Application.js';
import Job from '../models/Job.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply for a job
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { jobId, coverLetter, resumeUrl } = req.body;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
      coverLetter,
      resumeUrl
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get applications for a specific job (Employer/Admin only)
router.get('/job/:jobId', authMiddleware, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    // Check if user is the job poster or admin
    if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate('applicant', 'name email profile');

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;