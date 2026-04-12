import { Box, Container, Typography, TextField, Button, Grid, MenuItem } from '@mui/material';
import { useState } from 'react';
import SectionHeader from '../components/SectionHeader';

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    experience: '',
    program: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Experience Level"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              >
                <MenuItem value="beginner">Beginner</MenuItem>
                <MenuItem value="intermediate">Intermediate</MenuItem>
                <MenuItem value="advanced">Advanced</MenuItem>
                <MenuItem value="professional">Professional</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Program"
                name="program"
                value={formData.program}
                onChange={handleChange}
                required
              >
                <MenuItem value="speed">Speed Skating & Competition Training</MenuItem>
                <MenuItem value="freestyle">Freestyle & Trick Development</MenuItem>
                <MenuItem value="youth">Youth Programs</MenuItem>
                <MenuItem value="general">General Skating</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Message"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your skating goals and any questions you have..."
              />
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
