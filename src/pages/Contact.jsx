import { useState } from 'react';
import { Box, Container, Grid, Card, CardContent, Typography, TextField, Button, Alert, CircularProgress, MenuItem } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SectionHeader from '../components/SectionHeader';

import { leadsApi } from '../api/leads';

const Contact = () => {
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
    age: '',
    location: '',
    preferredLocation: '',
    experienceLevel: 'Beginner',
    message: ''
  });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [aadharCard, setAadharCard] = useState(null);
  const [aadharPreview, setAadharPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors({ ...validationErrors, [name]: '' });
    }
  };

  const validateFile = (file, type) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (!file) return null;

    if (!allowedTypes.includes(file.type)) {
      return `${type} must be an image (JPEG, PNG, or WebP)`;
    }

    if (file.size > maxSize) {
      return `${type} size must be less than 5MB`;
    }

    return null;
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    
    if (!file) return;

    const error = validateFile(file, type === 'photo' ? 'Photo' : 'Aadhar Card');
    
    if (error) {
      setValidationErrors({ ...validationErrors, [type]: error });
      e.target.value = '';
      return;
    }

    // Clear error
    setValidationErrors({ ...validationErrors, [type]: '' });

    // Set file and preview
    if (type === 'photo') {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setAadharCard(file);
      setAadharPreview(URL.createObjectURL(file));
    }
  };

  const removeFile = (type) => {
    if (type === 'photo') {
      setPhoto(null);
      if (photoPreview) URL.revokeObjectURL(photoPreview);
      setPhotoPreview(null);
    } else {
      setAadharCard(null);
      if (aadharPreview) URL.revokeObjectURL(aadharPreview);
      setAadharPreview(null);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email || !formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (formData.fatherMobile && !/^[0-9]{10}$/.test(formData.fatherMobile)) {
      errors.fatherMobile = 'Must be 10 digits';
    }

    if (formData.motherMobile && !/^[0-9]{10}$/.test(formData.motherMobile)) {
      errors.motherMobile = 'Must be 10 digits';
    }

    if (formData.age && (formData.age < 3 || formData.age > 100)) {
      errors.age = 'Age must be between 3 and 100';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      setError('Please fix the errors below');
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Append all text fields (only non-empty values)
      Object.keys(formData).forEach(key => {
        if (formData[key] && formData[key].toString().trim() !== '') {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append files
      if (photo) formDataToSend.append('photo', photo);
      if (aadharCard) formDataToSend.append('aadharCard', aadharCard);

      console.log('Submitting form data...');
      await leadsApi.submit(formDataToSend);
      
      setSubmitted(true);
      
      // Reset form
      setFormData({
        studentName: '',
        dateOfBirth: '',
        school: '',
        fatherName: '',
        fatherMobile: '',
        motherName: '',
        motherMobile: '',
        address: '',
        email: '',
        age: '',
        location: '',
        preferredLocation: '',
        experienceLevel: 'Beginner',
        message: ''
      });
      removeFile('photo');
      removeFile('aadhar');
      setValidationErrors({});
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Form submission error:', err);
      
      // Handle validation errors from backend
      if (err.response?.status === 422 && err.response?.data?.errors) {
        const backendErrors = {};
        err.response.data.errors.forEach(error => {
          const field = error.field.replace('body.', '');
          backendErrors[field] = error.message;
        });
        setValidationErrors(backendErrors);
        setError('Please fix the validation errors');
      } else {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to submit form. Please try again.';
        setError(errorMessage);
      }
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
                    value={formData.studentName}
                    onChange={handleChange}
                    error={!!validationErrors.studentName}
                    helperText={validationErrors.studentName}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    error={!!validationErrors.dateOfBirth}
                    helperText={validationErrors.dateOfBirth}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="School"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    error={!!validationErrors.school}
                    helperText={validationErrors.school}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Father Name"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    error={!!validationErrors.fatherName}
                    helperText={validationErrors.fatherName}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Father Mobile"
                    name="fatherMobile"
                    value={formData.fatherMobile}
                    onChange={handleChange}
                    error={!!validationErrors.fatherMobile}
                    helperText={validationErrors.fatherMobile || '10 digit mobile number'}
                    inputProps={{ maxLength: 10 }}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Mother Name"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    error={!!validationErrors.motherName}
                    helperText={validationErrors.motherName}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Mother Mobile"
                    name="motherMobile"
                    value={formData.motherMobile}
                    onChange={handleChange}
                    error={!!validationErrors.motherMobile}
                    helperText={validationErrors.motherMobile || '10 digit mobile number'}
                    inputProps={{ maxLength: 10 }}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    multiline
                    rows={2}
                    value={formData.address}
                    onChange={handleChange}
                    error={!!validationErrors.address}
                    helperText={validationErrors.address}
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
                    error={!!validationErrors.email}
                    helperText={validationErrors.email || 'Required'}
                    sx={{ mb: 2 }}
                  />
                  
                  {/* Photo Upload */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                      Passport Size Photo
                    </Typography>
                    {photoPreview ? (
                      <Box sx={{ position: 'relative', display: 'inline-block' }}>
                        <Box
                          component="img"
                          src={photoPreview}
                          alt="Photo preview"
                          sx={{
                            width: 150,
                            height: 150,
                            objectFit: 'cover',
                            borderRadius: 1,
                            border: '2px solid',
                            borderColor: 'primary.main'
                          }}
                        />
                        <Button
                          size="small"
                          color="error"
                          onClick={() => removeFile('photo')}
                          sx={{ mt: 1, display: 'block' }}
                        >
                          Remove
                        </Button>
                      </Box>
                    ) : (
                      <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                        startIcon={<CloudUploadIcon />}
                        sx={{ 
                          justifyContent: 'flex-start', 
                          textTransform: 'none',
                          borderColor: validationErrors.photo ? 'error.main' : undefined
                        }}
                      >
                        Choose Photo (Max 5MB)
                        <input
                          type="file"
                          hidden
                          accept="image/jpeg,image/jpg,image/png,image/webp"
                          onChange={(e) => handleFileChange(e, 'photo')}
                        />
                      </Button>
                    )}
                    {validationErrors.photo && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                        {validationErrors.photo}
                      </Typography>
                    )}
                  </Box>

                  {/* Aadhar Upload */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                      Aadhar Card (Optional)
                    </Typography>
                    {aadharPreview ? (
                      <Box sx={{ position: 'relative', display: 'inline-block' }}>
                        <Box
                          component="img"
                          src={aadharPreview}
                          alt="Aadhar preview"
                          sx={{
                            width: '100%',
                            maxWidth: 300,
                            height: 'auto',
                            borderRadius: 1,
                            border: '2px solid',
                            borderColor: 'primary.main'
                          }}
                        />
                        <Button
                          size="small"
                          color="error"
                          onClick={() => removeFile('aadhar')}
                          sx={{ mt: 1, display: 'block' }}
                        >
                          Remove
                        </Button>
                      </Box>
                    ) : (
                      <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                        startIcon={<CloudUploadIcon />}
                        sx={{ 
                          justifyContent: 'flex-start', 
                          textTransform: 'none',
                          borderColor: validationErrors.aadharCard ? 'error.main' : undefined
                        }}
                      >
                        Choose Aadhar Card (Max 5MB)
                        <input
                          type="file"
                          hidden
                          accept="image/jpeg,image/jpg,image/png,image/webp"
                          onChange={(e) => handleFileChange(e, 'aadhar')}
                        />
                      </Button>
                    )}
                    {validationErrors.aadharCard && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                        {validationErrors.aadharCard}
                      </Typography>
                    )}
                  </Box>

                  <TextField
                    fullWidth
                    label="Age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    error={!!validationErrors.age}
                    helperText={validationErrors.age}
                    inputProps={{ min: 3, max: 100 }}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    error={!!validationErrors.location}
                    helperText={validationErrors.location}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Preferred Training Location"
                    name="preferredLocation"
                    value={formData.preferredLocation}
                    onChange={handleChange}
                    error={!!validationErrors.preferredLocation}
                    helperText={validationErrors.preferredLocation}
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
                    error={!!validationErrors.message}
                    helperText={validationErrors.message}
                    sx={{ mb: 3 }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CheckCircleIcon />}
                    sx={{ py: 1.5, fontWeight: 600 }}
                  >
                    {loading ? 'Submitting...' : 'Submit Application'}
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
                      +91 96742 42870
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
                      329 Netaji Subhas Road<br />
                      Near Kali Babu Bazar, 3rd Floor<br />
                      Howrah - 711101
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              {/* Map removed - contact us for location details */}
              <Card>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LocationOnIcon sx={{ color: 'secondary.main', fontSize: 32 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      Get Directions
                    </Typography>
                    <Typography color="text.secondary">
                      329 Netaji Subhas Road<br />
                      Near Kali Babu Bazar, 3rd Floor<br />
                      Howrah - 711101
                    </Typography>
                    <Button
                      variant="text"
                      size="small"
                      sx={{ mt: 1 }}
                      onClick={() => window.open('https://maps.google.com/?q=329+Netaji+Subhas+Road+Howrah', '_blank')}
                    >
                      Open in Google Maps
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
