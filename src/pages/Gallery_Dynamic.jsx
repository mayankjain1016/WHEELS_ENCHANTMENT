import { Box, Container, Grid, Card, CardMedia, Dialog, IconButton, Typography, alpha, useTheme, CircularProgress, Skeleton, Pagination, Chip, Stack } from '@mui/material';
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
  const [totalPages, setTotalPages] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const ITEMS_PER_PAGE = 50;

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await galleryApi.getCategories();
        setCategories(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // Fetch gallery images from API
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      
      try {
        const params = {
          page,
          limit: ITEMS_PER_PAGE,
          isActive: true
        };
        
        if (selectedCategory !== 'all') {
          params.category = selectedCategory;
        }
        
        const response = await galleryApi.getAll(params);
        
        const imagesData = response?.data?.data || response?.data || [];
        const paginationData = response?.data?.pagination || response?.pagination || {};
        
        setImages(Array.isArray(imagesData) ? imagesData : []);
        setTotalPages(paginationData?.totalPages || 0);
        setTotalImages(paginationData?.total || imagesData.length);
      } catch (error) {
        console.error('Failed to fetch gallery:', error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [page, selectedCategory]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1);
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
            Capturing moments of growth, learning, and joy at Wheels Enchntment
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -5, position: 'relative', zIndex: 10, pb: 10 }}>
        
        {/* Category Filter Bar */}
        <Box sx={{ 
          p: { xs: 2, md: 2.5 }, 
          borderRadius: { xs: '12px', md: '16px' }, 
          bgcolor: alpha(theme.palette.background.paper, 0.9),
          backdropFilter: 'blur(10px)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          mb: 6,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}>
          {loading && page === 1 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
              <CircularProgress size={30} />
            </Box>
          ) : (
            <Stack 
              direction="row" 
              spacing={1}
              sx={{ 
                flexWrap: 'wrap',
                justifyContent: { xs: 'center', md: 'center' },
                rowGap: 1,
              }}
            >
              <Chip
                label="All"
                onClick={() => handleCategoryChange('all')}
                sx={{ 
                  cursor: 'pointer',
                  px: { xs: 1.5, md: 2 },
                  py: { xs: 0.5, md: 0.75 },
                  height: { xs: '32px', md: '36px' },
                  fontSize: { xs: '0.75rem', md: '0.875rem' },
                  fontWeight: 600,
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                  bgcolor: selectedCategory === 'all' ? 'primary.main' : 'transparent',
                  color: selectedCategory === 'all' ? 'white' : 'text.primary',
                  border: `1px solid ${selectedCategory === 'all' ? 'primary.main' : alpha(theme.palette.divider, 0.2)}`,
                  '&:hover': { 
                    bgcolor: selectedCategory === 'all' ? 'primary.dark' : alpha(theme.palette.primary.main, 0.08),
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }
                }}
              />
              {categories.map((cat) => (
                <Chip
                  key={cat}
                  label={cat}
                  onClick={() => handleCategoryChange(cat)}
                  sx={{ 
                    cursor: 'pointer',
                    px: { xs: 1.5, md: 2 },
                    py: { xs: 0.5, md: 0.75 },
                    height: { xs: '32px', md: '36px' },
                    fontSize: { xs: '0.75rem', md: '0.875rem' },
                    fontWeight: 600,
                    borderRadius: '20px',
                    transition: 'all 0.3s ease',
                    bgcolor: selectedCategory === cat ? 'primary.main' : 'transparent',
                    color: selectedCategory === cat ? 'white' : 'text.primary',
                    border: `1px solid ${selectedCategory === cat ? 'primary.main' : alpha(theme.palette.divider, 0.2)}`,
                    '&:hover': { 
                      bgcolor: selectedCategory === cat ? 'primary.dark' : alpha(theme.palette.primary.main, 0.08),
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }
                  }}
                />
              ))}
            </Stack>
          )}
        </Box>

        {/* Gallery Grid */}
        {loading ? (
          <Grid container spacing={3}>
            {Array.from({ length: 12 }).map((_, index) => (
              <Grid item xs={6} md={4} key={`skeleton-${index}`}>
                <Skeleton 
                  variant="rectangular" 
                  sx={{ 
                    borderRadius: 3,
                    height: { xs: 220, sm: 260, md: 280 },
                  }} 
                />
              </Grid>
            ))}
          </Grid>
        ) : (
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
                    alt={image.title || image.category || 'Gallery image'}
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
        )}

        {/* Empty State */}
        {!loading && images.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h5" color="text.secondary">No images found.</Typography>
          </Box>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
            <Pagination 
              count={totalPages} 
              page={page} 
              onChange={handlePageChange}
              color="secondary"
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  fontWeight: 600,
                  fontSize: '1rem',
                },
                '& .Mui-selected': {
                  bgcolor: 'secondary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'secondary.dark',
                  }
                }
              }}
            />
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
