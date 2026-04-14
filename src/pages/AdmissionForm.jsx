import { Box, Container, Typography, TextField, Button, Grid, MenuItem } from '@mui/material';
import { useState } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SectionHeader from '../components/SectionHeader';

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    dateOfBirth: '',
    school: '',
    fatherName: '',
    fatherMobile: '',
    motherName: '',
    motherMobile: '',
    address: '',
    email: '',
    photo: null,
    aadhaar: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Application submitted successfully!');
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="md">
        <SectionHeader 
          title="Admission Form" 
          subtitle="Join our skating community and start your journey with expert coaching"
        />

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Student's Name"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="School"
                name="school"
                value={formData.school}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Father's Name"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Father's Mobile Number"
                name="fatherMobile"
                value={formData.fatherMobile}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mother's Name"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mother's Mobile Number"
                name="motherMobile"
                value={formData.motherMobile}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                multiline
                rows={3}
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email ID"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<UploadFileIcon />}
                sx={{ py: 1.5 }}
              >
                Upload Passport Size Photo *
                <input
                  type="file"
                  name="photo"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </Button>
              {formData.photo && (
                <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                  {formData.photo.name}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<UploadFileIcon />}
                sx={{ py: 1.5 }}
              >
                Upload Aadhaar Card (Optional)
                <input
                  type="file"
                  name="aadhaar"
                  hidden
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                />
              </Button>
              {formData.aadhaar && (
                <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                  {formData.aadhaar.name}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                size="large"
                fullWidth
              >
                Submit Application
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default AdmissionForm;
