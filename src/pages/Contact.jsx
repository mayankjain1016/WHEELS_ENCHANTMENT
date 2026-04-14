import { Box, Container, Grid, TextField, Button, Card, CardContent, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SectionHeader from '../components/SectionHeader';

const Contact = () => {
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
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    variant="outlined"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                    type="email"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Subject"
                    variant="outlined"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Message"
                    variant="outlined"
                    multiline
                    rows={6}
                    required
                  />
                  <Button variant="contained" color="primary" size="large">
                    Send Message
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
                      info@wheelsenchantment.com
                    </Typography>
                    <Typography color="text.secondary">
                      support@wheelsenchantment.com
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
                      +1 (555) 123-4567
                    </Typography>
                    <Typography color="text.secondary">
                      Mon-Fri: 9AM - 6PM EST
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
