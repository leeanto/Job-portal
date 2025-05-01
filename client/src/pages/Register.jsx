import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../services/api';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
  role: Yup.string().required('Required')
});

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', role: 'jobseeker' },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await api.post('/auth/register', values);
        navigate('/login');
      } catch (err) {
        setError(err.response?.data?.message || 'Registration failed');
      }
    }
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        
        <TextField
          select
          fullWidth
          margin="normal"
          label="Role"
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange}
        >
          <MenuItem value="jobseeker">Job Seeker</MenuItem>
          <MenuItem value="employer">Employer</MenuItem>
        </TextField>

        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </Button>
        
        <Box textAlign="center">
          <Button onClick={() => navigate('/login')}>
            Already have an account? Login
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Register;