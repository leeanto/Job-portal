import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';
import api from '../services/api';

const validationSchema = Yup.object({
  coverLetter: Yup.string().required('Cover letter is required')
});

const ApplicationForm = ({ jobId }) => {
  const [resume, setResume] = useState(null);
  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: { coverLetter: '' },
    validationSchema,
    onSubmit: async values => {
      const formData = new FormData();
      formData.append('resume', resume);
      formData.append('coverLetter', values.coverLetter);
      formData.append('jobId', jobId);

      try {
        await api.post('/applications', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Application submitted!');
      } catch (error) {
        alert('Application failed');
      }
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        multiline
        rows={4}
        name="coverLetter"
        label="Cover Letter"
        value={values.coverLetter}
        onChange={handleChange}
        error={!!errors.coverLetter}
        helperText={errors.coverLetter}
        sx={{ mb: 2 }}
      />
      
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={e => setResume(e.target.files[0])}
      />
      
      <Button 
        type="submit" 
        variant="contained" 
        sx={{ mt: 2 }}
      >
        Submit Application
      </Button>
    </form>
  );
};

export default ApplicationForm;