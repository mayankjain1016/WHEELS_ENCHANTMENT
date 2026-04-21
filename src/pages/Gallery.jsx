import { Box, Container, Grid, Card, CardMedia, Chip, Dialog, IconButton, Typography, alpha, useTheme } from '@mui/material';
import { useState } from 'react';
import { X } from 'lucide-react';
import backgroundImg8 from '../assets/Background_imgs/backgroundimg8.jpeg';
import backgroundImg4_4 from '../assets/Background_imgs/backgroundimg4_4.jpeg';

// Import all gallery images
import img1 from '../assets/Gallery_img/67542B2D-A14E-4594-B781-78064ECC6CFC.JPG.jpeg';
import img2 from '../assets/Gallery_img/IMG_0312.JPG.jpeg';
import img3 from '../assets/Gallery_img/IMG_2394.JPG.jpeg';
import img4 from '../assets/Gallery_img/IMG_2450.JPG.jpeg';
import img5 from '../assets/Gallery_img/IMG_2451.JPG.jpeg';
import img6 from '../assets/Gallery_img/IMG_2452.JPG.jpeg';
import img7 from '../assets/Gallery_img/IMG_2453.JPG.jpeg';
import img8 from '../assets/Gallery_img/IMG_2454.JPG.jpeg';
import img9 from '../assets/Gallery_img/IMG_2456.JPG.jpeg';
import img10 from '../assets/Gallery_img/IMG_2457.JPG.jpeg';
import img11 from '../assets/Gallery_img/IMG_2458.JPG.jpeg';
import img12 from '../assets/Gallery_img/IMG_2459.JPG.jpeg';
import img13 from '../assets/Gallery_img/IMG_2460.JPG.jpeg';
import img14 from '../assets/Gallery_img/IMG_2461.JPG.jpeg';
import img15 from '../assets/Gallery_img/IMG_2462.JPG.jpeg';
import img16 from '../assets/Gallery_img/IMG_2463.JPG.jpeg';
import img17 from '../assets/Gallery_img/IMG_2464.JPG.jpeg';
import img18 from '../assets/Gallery_img/IMG_2465.JPG.jpeg';
import img19 from '../assets/Gallery_img/IMG_2466.JPG.jpeg';
import img20 from '../assets/Gallery_img/IMG_2467.JPG.jpeg';
import img21 from '../assets/Gallery_img/IMG_2468.JPG.jpeg';
import img22 from '../assets/Gallery_img/IMG_2469.JPG.jpeg';
import img23 from '../assets/Gallery_img/IMG_2470.JPG.jpeg';
import img24 from '../assets/Gallery_img/IMG_2471.JPG.jpeg';
import img25 from '../assets/Gallery_img/IMG_2472.JPG.jpeg';
import img26 from '../assets/Gallery_img/IMG_2473.JPG.jpeg';
import img27 from '../assets/Gallery_img/IMG_2474.JPG.jpeg';
import img28 from '../assets/Gallery_img/IMG_2475.JPG.jpeg';
import img29 from '../assets/Gallery_img/IMG_2476.JPG.jpeg';
import img30 from '../assets/Gallery_img/IMG_2477.JPG.jpeg';
import img31 from '../assets/Gallery_img/IMG_2478.JPG.jpeg';
import img32 from '../assets/Gallery_img/IMG_2479.JPG.jpeg';
import img33 from '../assets/Gallery_img/IMG_2480.JPG.jpeg';
import img34 from '../assets/Gallery_img/IMG_2481.JPG.jpeg';
import img35 from '../assets/Gallery_img/IMG_2483.JPG.jpeg';
import img36 from '../assets/Gallery_img/IMG_2484.JPG.jpeg';
import img37 from '../assets/Gallery_img/IMG_2485.JPG.jpeg';
import img38 from '../assets/Gallery_img/IMG_2486.JPG.jpeg';
import img39 from '../assets/Gallery_img/IMG_2488.JPG.jpeg';
import img40 from '../assets/Gallery_img/IMG_2489.JPG.jpeg';
import img41 from '../assets/Gallery_img/IMG_2490.JPG.jpeg';
import img42 from '../assets/Gallery_img/IMG_2491.JPG.jpeg';
import img43 from '../assets/Gallery_img/IMG_2492.JPG.jpeg';
import img44 from '../assets/Gallery_img/IMG_5313.JPG.jpeg';
import img45 from '../assets/Gallery_img/IMG_8096.JPG.jpeg';
import img46 from '../assets/Gallery_img/IMG_8782.JPG.jpeg';
import img47 from '../assets/Gallery_img/IMG_8818.JPG.jpeg';
import img48 from '../assets/Background_imgs/backgroundimg4_4.jpeg';

const Gallery = () => {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  // Gallery images with categories
  const galleryImages = [
    { id: 1, url: img1, category: 'Training' },
    { id: 2, url: img2, category: 'Students' },
    { id: 3, url: img3, category: 'Training' },
    { id: 4, url: img4, category: 'Students' },
    { id: 5, url: img5, category: 'Events' },
    { id: 6, url: img6, category: 'Training' },
    { id: 7, url: img7, category: 'Students' },
    { id: 8, url: img8, category: 'Training' },
    { id: 9, url: img9, category: 'Students' },
    { id: 10, url: img10, category: 'Events' },
    { id: 11, url: img11, category: 'Training' },
    { id: 12, url: img12, category: 'Students' },
    { id: 13, url: img13, category: 'Training' },
    { id: 14, url: img14, category: 'Students' },
    { id: 15, url: img15, category: 'Events' },
    { id: 16, url: img16, category: 'Training' },
    { id: 17, url: img17, category: 'Students' },
    { id: 18, url: img18, category: 'Training' },
    { id: 19, url: img19, category: 'Students' },
    { id: 20, url: img20, category: 'Events' },
    { id: 21, url: img21, category: 'Training' },
    { id: 22, url: img22, category: 'Students' },
    { id: 23, url: img23, category: 'Training' },
    { id: 24, url: img24, category: 'Students' },
    { id: 25, url: img25, category: 'Events' },
    { id: 26, url: img26, category: 'Training' },
    { id: 27, url: img27, category: 'Students' },
    { id: 28, url: img28, category: 'Training' },
    { id: 29, url: img29, category: 'Students' },
    { id: 30, url: img30, category: 'Events' },
    { id: 31, url: img31, category: 'Training' },
    { id: 32, url: img32, category: 'Students' },
    { id: 33, url: img33, category: 'Training' },
    { id: 34, url: img34, category: 'Students' },
    { id: 35, url: img35, category: 'Events' },
    { id: 36, url: img36, category: 'Training' },
    { id: 37, url: img37, category: 'Students' },
    { id: 38, url: img38, category: 'Training' },
    { id: 39, url: img39, category: 'Students' },
    { id: 40, url: img40, category: 'Events' },
    { id: 41, url: img41, category: 'Training' },
    { id: 42, url: img42, category: 'Students' },
    { id: 43, url: img43, category: 'Training' },
    { id: 44, url: img44, category: 'Students' },
    { id: 45, url: img45, category: 'Events' },
    { id: 46, url: img46, category: 'Training' },
    { id: 47, url: img47, category: 'Students' },
    { id: 48, url: img48, category: 'Training' },
  ];

  const categories = ['All', 'Training', 'Students', 'Events'];

  const filteredImages = galleryImages;

  const displayedImages = filteredImages.slice(0, visibleCount);
  const hasMore = visibleCount < filteredImages.length;

  const handleSeeMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  const handleImageClick = (index) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setSelectedIndex(null), 300);
  };

  return (
    <Box sx={{ bgcolor: '#F8F9FB', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box sx={{ 
        position: 'relative',
        color: 'white', 
        pt: { xs: 14, md: 16 }, 
        pb: { xs: 8, md: 10 },
        textAlign: 'center',
        backgroundImage: `url(${backgroundImg8})`,
        backgroundSize: 'cover',
        backgroundPosition: { xs: 'center 30%', md: 'center center' },
        backgroundRepeat: 'no-repeat',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.85)} 0%, ${alpha(theme.palette.primary.dark, 0.9)} 100%)`,
          zIndex: 1,
        }
      }}>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="overline" sx={{ letterSpacing: 4, color: 'secondary.main', fontWeight: 700 }}>
            Our Academy
          </Typography>
          <Typography variant="h2" sx={{ 
            fontWeight: 800, 
            fontSize: { xs: '2.2rem', md: '3.5rem' }, 
            mt: 1, 
            mb: 2 
          }}>
            Gallery
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto', fontSize: '1.1rem' }}>
            Capturing moments of growth, learning, and joy at Wheels Enchantment
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 6, position: 'relative', zIndex: 10, pb: 10 }}>
        {/* Gallery Grid */}
        <Grid container spacing={3}>
          {displayedImages.map((image, index) => (
            <Grid item xs={6} md={4} key={image.id}>
              <Card 
                sx={{ 
                  overflow: 'hidden',
                  borderRadius: 3,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
                  },
                  '&:hover img': {
                    transform: 'scale(1.1)',
                  }
                }}
                onClick={() => handleImageClick(index)}
              >
                <CardMedia
                  component="img"
                  image={image.url}
                  alt={`${image.category} - ${image.id}`}
                  sx={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    height: { xs: 220, sm: 260, md: 280 },
                  }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {displayedImages.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h5" color="text.secondary">No images found in this category.</Typography>
          </Box>
        )}

        {/* See More Button */}
        {hasMore && (
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Box
              onClick={handleSeeMore}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 5,
                py: 1.5,
                borderRadius: '50px',
                bgcolor: 'secondary.main',
                color: 'white',
                fontWeight: 700,
                fontSize: '1rem',
                letterSpacing: 1,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(233, 30, 99, 0.3)',
                '&:hover': {
                  bgcolor: 'secondary.dark',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(233, 30, 99, 0.4)',
                }
              }}
            >
              See More
            </Box>
            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary', fontWeight: 500 }}>
              Showing {displayedImages.length} of {filteredImages.length} images
            </Typography>
          </Box>
        )}
      </Container>

      {/* Lightbox Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={false}
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'rgba(0, 0, 0, 0.95)',
            boxShadow: 'none',
            m: 0,
            maxWidth: '100vw',
            height: '100vh'
          }
        }}
      >
        <Box sx={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Close Button */}
            <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 20,
              right: 20,
              bgcolor: alpha('#fff', 0.1),
              color: 'white',
              backdropFilter: 'blur(10px)',
              zIndex: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'secondary.main',
                transform: 'scale(1.1)',
              }
            }}
          >
            <X size={24} strokeWidth={2.5} />
          </IconButton>

          {/* Image */}
          {selectedIndex !== null && (
            <Box
              component="img"
              src={displayedImages[selectedIndex].url}
              alt={`${displayedImages[selectedIndex].category} - ${displayedImages[selectedIndex].id}`}
              sx={{
                maxWidth: '90%',
                maxHeight: '90vh',
                objectFit: 'contain',
                borderRadius: 2
              }}
            />
          )}
        </Box>
      </Dialog>
    </Box>
  );
};

export default Gallery;
