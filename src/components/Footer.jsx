import { Box, Container, Grid, Typography, IconButton, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import logo from '../assets/logo.jpeg';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6, mt: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 2 }}>
              <img src={logo} alt="Wheels Enchantment" style={{ height: '40px' }} />
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
              <Link href="/" sx={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', '&:hover': { color: 'secondary.main' } }}>Home</Link>
              <Link href="/products" sx={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', '&:hover': { color: 'secondary.main' } }}>Products</Link>
              <Link href="/gallery" sx={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', '&:hover': { color: 'secondary.main' } }}>Gallery</Link>
              <Link href="/about" sx={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', '&:hover': { color: 'secondary.main' } }}>About</Link>
              <Link href="/contact" sx={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', '&:hover': { color: 'secondary.main' } }}>Contact</Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Connect With Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton sx={{ color: 'white', '&:hover': { color: 'secondary.main' } }}>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ color: 'white', '&:hover': { color: 'secondary.main' } }}>
                <InstagramIcon />
              </IconButton>
              <IconButton sx={{ color: 'white', '&:hover': { color: 'secondary.main' } }}>
                <TwitterIcon />
              </IconButton>
              <IconButton sx={{ color: 'white', '&:hover': { color: 'secondary.main' } }}>
                <YouTubeIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mt: 2 }}>
              Email: info@wheelsenchantment.com<br />
              Phone: +1 (555) 123-4567
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 4, pt: 3, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
            © 2024 Wheels Enchantment. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
