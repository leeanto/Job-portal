import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, CircularProgress } from '@mui/material';
import api from '../services/api';
import ApplicationForm from '../components/ApplicationForm';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await api.get(`/jobs/${id}`);
        setJob(data);
      } catch (error) {
        console.error('Error fetching job:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>{job.title}</Typography>
      <Typography variant="h5" gutterBottom>{job.company}</Typography>
      <Typography variant="subtitle1" gutterBottom>{job.location}</Typography>
      <Typography variant="body1" paragraph>{job.description}</Typography>
      
      <ApplicationForm jobId={id} />
    </Container>
  );
};

export default JobDetails;  // <- This is the crucial line