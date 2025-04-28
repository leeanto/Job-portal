import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Local MongoDB connection
mongoose.connect('mongodb://localhost:27017/jobportal')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Job Portal API Running');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});