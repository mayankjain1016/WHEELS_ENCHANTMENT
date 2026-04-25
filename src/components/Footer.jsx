import { Box, Container, Grid, Typography, IconButton, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6, mt: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 2 }}>
              <img src={logo} alt="Wheels Enchntment" style={{ height: '40px', borderRadius: '50%' }} />
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              Premium skating products for riders who demand excellence.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <MuiLink component={Link} to="/" sx={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', '&:hover': { color: 'secondary.main' } }}>Home</MuiLink>
              <MuiLink component={Link} to="/products" sx={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', '&:hover': { color: 'secondary.main' } }}>Products</MuiLink>
              <MuiLink component={Link} to="/gallery" sx={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', '&:hover': { color: 'secondary.main' } }}>Gallery</MuiLink>
              <MuiLink component={Link} to="/about" sx={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', '&:hover': { color: 'secondary.main' } }}>About</MuiLink>
              <MuiLink component={Link} to="/admission" sx={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', '&:hover': { color: 'secondary.main' } }}>Admission</MuiLink>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Connect With Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                component="a" 
                href="https://www.facebook.com/share/1GKmNGQDjj/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ 
                  color: 'white',
                  bgcolor: 'rgba(255,255,255,0.08)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': { 
                    color: 'secondary.main',
                    bgcolor: 'white',
                    transform: 'translateY(-4px) scale(1.05)',
                    boxShadow: '0 8px 20px rgba(233, 30, 99, 0.3)',
                  } 
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </IconButton>
              <IconButton 
                component="a" 
                href="https://www.instagram.com/victoriamemorial_skatingclub?igsh=MTVxcjJ6dmxjNzl0dw%3D%3D&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ 
                  color: 'white',
                  bgcolor: 'rgba(255,255,255,0.08)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': { 
                    color: 'secondary.main',
                    bgcolor: 'white',
                    transform: 'translateY(-4px) scale(1.05)',
                    boxShadow: '0 8px 20px rgba(233, 30, 99, 0.3)',
                  } 
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </IconButton>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mt: 2 }}>
              Email: Wheelsenchntment27@gmail.com<br />
              Phone: +91 9674242870
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 4, pt: 3, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 1 }}>
            © 2021-2026 Wheels Enchntment. All rights reserved. | Established in 2021
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
            Developed by AFFOBE
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
