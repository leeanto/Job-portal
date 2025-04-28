import mongoose from 'mongoose';

const jobSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  salary: { type: String, required: true },
  location: { type: String, required: true },
  skillsRequired: { type: [String], default: [] },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);