import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  MenuItem,
  Typography,
  IconButton
} from '@mui/material';
import { X } from 'lucide-react';
import { leadsApi } from '../api/leads';

const LeadForm = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    age: '',
    location: '',
    preferredLocation: '',
    experienceLevel: 'Beginner',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await leadsApi.submit({
        ...formData,
        age: formData.age ? parseInt(formData.age) : undefined
      });
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({
          studentName: '',
          parentName: '',
          email: '',
          phone: '',
          age: '',
          location: '',
          preferredLocation: '',
          experienceLevel: 'Beginner',
          message: ''
        });
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '20px',
          p: 1
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>
          Apply for Admission
        </Typography>
        <IconButton onClick={onClose} size="small">
          <X size={24} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {success && (
          <Alert severity="success" sx={{ mb: 2, borderRadius: '12px' }}>
            Application submitted successfully! We'll contact you soon.
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: '12px' }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="Student Name"
            name="studentName"
            required
            value={formData.studentName}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Parent Name"
            name="parentName"
            required
            value={formData.parentName}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Phone Number (10 digits)"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            inputProps={{ maxLength: 10, pattern: '[0-9]{10}' }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            inputProps={{ min: 3, max: 100 }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Preferred Training Location"
            name="preferredLocation"
            value={formData.preferredLocation}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            select
            label="Experience Level"
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Advanced">Advanced</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Message (Optional)"
            name="message"
            multiline
            rows={3}
            value={formData.message}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            disabled={loading}
            sx={{ 
              py: 1.5,
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '1rem',
              textTransform: 'none'
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Application'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LeadForm;
