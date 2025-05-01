import { Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{job.title}</Typography>
        <Typography color="textSecondary">{job.company}</Typography>
        <Typography variant="body2">{job.location}</Typography>
        <Button 
          variant="contained" 
          sx={{ mt: 2 }}
          onClick={() => navigate(`/jobs/${job._id}`)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobCard;