import { useEffect, useState } from 'react';
import { TextField, Container, Grid } from '@mui/material';
import JobCard from '../components/JobCard';
import api from '../services/api';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await api.get('/jobs/search', {
          params: { title: searchTerm }
        });
        setJobs(data.jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, [searchTerm]);

  return (
    <Container>
      <TextField
        fullWidth
        label="Search Jobs"
        variant="outlined"
        sx={{ mb: 4, mt: 4 }}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      
      <Grid container spacing={3}>
        {jobs.map(job => (
          <Grid item xs={12} md={6} key={job._id}>
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default JobsPage;