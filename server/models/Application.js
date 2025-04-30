import mongoose from 'mongoose';

const applicationSchema = mongoose.Schema({
  job: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  applicant: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'rejected', 'accepted'],
    default: 'pending'
  },
  coverLetter: {
    type: String,
    required: true
  },
  resumeUrl: String
}, { timestamps: true });

export default mongoose.model('Application', applicationSchema);