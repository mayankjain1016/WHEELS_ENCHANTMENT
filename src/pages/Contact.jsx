import { useState } from 'react';
import { Box, Container, Grid, Card, CardContent, Typography, TextField, Button, Alert, CircularProgress, MenuItem } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SectionHeader from '../components/SectionHeader';

import { leadsApi } from '../api/leads';

const Contact = () => {
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
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
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
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: { xs: 10, md: 12 }, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <SectionHeader 
          title="Get In Touch" 
          subtitle="Have questions? We'd love to hear from you"
        />

        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                  Send Us a Message
                </Typography>
                {submitted && (
                  <Alert severity="success" sx={{ mb: 3 }}>
                    Application submitted successfully! We'll contact you soon.
                  </Alert>
                )}
                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}
                <Box component="form" onSubmit={handleSubmit}>
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
                    sx={{ py: 1.5, fontWeight: 600 }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Application'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Card>
                <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <EmailIcon sx={{ color: 'secondary.main', fontSize: 32 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      Email
                    </Typography>
                    <Typography color="text.secondary">
                      Wheelsenchntment27@gmail.com
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              <Card>
                <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <PhoneIcon sx={{ color: 'secondary.main', fontSize: 32 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      Phone
                    </Typography>
                    <Typography color="text.secondary">
                      +91 9674242870
                    </Typography>
                    <Typography color="text.secondary">
                      Mon-Sat: 9AM - 7PM IST
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              <Card>
                <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <LocationOnIcon sx={{ color: 'secondary.main', fontSize: 32 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      Location
                    </Typography>
                    <Typography color="text.secondary">
                      123 Skate Street<br />
                      Los Angeles, CA 90001<br />
                      United States
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card>
                <Box sx={{ 
                  height: { xs: 180, sm: 200 }, 
                  bgcolor: 'background.paper', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <Typography color="text.secondary">
                    Map Placeholder
                  </Typography>
                </Box>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
