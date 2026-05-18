import { Box, Container, Grid, Card, CardMedia, Dialog, IconButton, Typography, alpha, useTheme, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { galleryApi } from '../api/gallery';
import { getImageUrl } from '../utils/imageUrl';
import backgroundImg8 from '../assets/Background_imgs/backgroundimg8.jpeg';

const Gallery = () => {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalImages, setTotalImages] = useState(0);

  // Fetch gallery images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await galleryApi.getAll({
          page,
          limit: 12,
          isActive: true
        });
        
        if (page === 1) {
          setImages(response.data);
        } else {
          setImages(prev => [...prev, ...response.data]);
        }
        
        setHasMore(response.pagination.hasNextPage);
        setTotalImages(response.pagination.total);
      } catch (error) {
        console.error('Failed to fetch gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [page]);

  const handleSeeMore = () => {
    setPage(prev => prev + 1);
  };

  const handleImageClick = (index) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setSelectedIndex(null), 300);
  };

  const getGalleryImageUrl = (image) => {
    return getImageUrl(image?.image?.url);
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
        {/* Loading State */}
        {loading && page === 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress size={60} />
          </Box>
        )}

        {/* Gallery Grid */}
        {!loading || page > 1 ? (
          <Grid container spacing={3}>
            {images.map((image, index) => (
              <Grid item xs={6} md={4} key={image._id}>
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
                    image={getGalleryImageUrl(image)}
                    alt={image.title || image.category}
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
        ) : null}

        {/* Empty State */}
        {!loading && images.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h5" color="text.secondary">No images found.</Typography>
          </Box>
        )}

        {/* See More Button */}
        {hasMore && images.length > 0 && (
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
              {loading && page > 1 ? <CircularProgress size={20} color="inherit" /> : 'See More'}
            </Box>
            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary', fontWeight: 500 }}>
              Showing {images.length} of {totalImages} images
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
          {selectedIndex !== null && images[selectedIndex] && (
            <Box
              component="img"
              src={getGalleryImageUrl(images[selectedIndex])}
              alt={images[selectedIndex].title || images[selectedIndex].category}
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
