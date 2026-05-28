import { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, TextField, Button, Box,
  Alert, CircularProgress, MenuItem, Typography, IconButton, Grid
} from '@mui/material';
import { X } from 'lucide-react';
import { leadsApi } from '../api/leads';

const initialState = {
  studentName: '', dateOfBirth: '', school: '',
  fatherName: '', fatherMobile: '', motherName: '', motherMobile: '',
  address: '', email: '', age: '', location: '', preferredLocation: '',
  experienceLevel: 'Beginner', message: ''
};

const LeadForm = ({ open, onClose }) => {
  const [formData, setFormData] = useState(initialState);
  const [photo, setPhoto] = useState(null);
  const [aadharCard, setAadharCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const fd = new FormData();
      Object.keys(formData).forEach(key => { if (formData[key]) fd.append(key, formData[key]); });
      if (photo) fd.append('photo', photo);
      if (aadharCard) fd.append('aadharCard', aadharCard);

      await leadsApi.submit(fd);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData(initialState);
        setPhoto(null);
        setAadharCard(null);
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
      PaperProps={{ sx: { borderRadius: '20px', p: 1 } }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>
          Apply for Admission
        </Typography>
        <IconButton onClick={onClose} size="small"><X size={24} /></IconButton>
      </DialogTitle>
      <DialogContent>
        {success && <Alert severity="success" sx={{ mb: 2, borderRadius: '12px' }}>Application submitted! We'll contact you soon.</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: '12px' }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth required label="Student Name" name="studentName" value={formData.studentName} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth required label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth required label="School" name="school" value={formData.school} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth required label="Father's Name" name="fatherName" value={formData.fatherName} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth required label="Father's Mobile" name="fatherMobile" value={formData.fatherMobile} onChange={handleChange} inputProps={{ maxLength: 10 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth required label="Mother's Name" name="motherName" value={formData.motherName} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth required label="Mother's Mobile" name="motherMobile" value={formData.motherMobile} onChange={handleChange} inputProps={{ maxLength: 10 }} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth required label="Address" name="address" multiline rows={2} value={formData.address} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth required label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Age" name="age" type="number" value={formData.age} onChange={handleChange} inputProps={{ min: 3, max: 100 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth select label="Experience Level" name="experienceLevel" value={formData.experienceLevel} onChange={handleChange}>
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" component="label" fullWidth sx={{ py: 1.5, textTransform: 'none' }}>
                {photo ? photo.name : 'Upload Photo'}
                <input type="file" hidden accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" component="label" fullWidth sx={{ py: 1.5, textTransform: 'none' }}>
                {aadharCard ? aadharCard.name : 'Aadhar Card (Optional)'}
                <input type="file" hidden accept="image/*" onChange={(e) => setAadharCard(e.target.files[0])} />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Message (Optional)" name="message" multiline rows={3} value={formData.message} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit" variant="contained" color="secondary" fullWidth disabled={loading}
                sx={{ py: 1.5, borderRadius: '12px', fontWeight: 700, fontSize: '1rem', textTransform: 'none' }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Application'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LeadForm;
