import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h2" gutterBottom>
        Find Your Dream Job
      </Typography>
      
      <Typography variant="h5" sx={{ mb: 4 }}>
        Connect with top employers and discover amazing opportunities
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          size="large"
          onClick={() => navigate('/jobs')}
        >
          Browse Jobs
        </Button>
        
        <Button 
          variant="outlined" 
          size="large"
          onClick={() => navigate('/register')}
        >
          Get Started
        </Button>
      </Box>

      <Box sx={{ mt: 8, display: 'flex', justifyContent: 'space-around' }}>
        <div>
          <Typography variant="h6" gutterBottom>For Job Seekers</Typography>
          <Typography variant="body1">
            Create profile, upload resume, and apply easily
          </Typography>
        </div>
        
        <div>
          <Typography variant="h6" gutterBottom>For Employers</Typography>
          <Typography variant="body1">
            Post jobs and find qualified candidates
          </Typography>
        </div>
      </Box>
    </Container>
  );
};

export default Home;