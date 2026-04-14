import { Box, Container, Grid, Card, CardMedia, Chip, Dialog, IconButton, Typography, Fade } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SectionHeader from '../components/SectionHeader';
import { galleryImages } from '../data/data';

const Gallery = () => {
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);

  const categories = ['All', ...new Set(galleryImages.map(img => img.category))];

  const filteredImages = filter === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

  return (
    <Box sx={{ py: { xs: 10, md: 12 }, bgcolor: '#F8F9FB', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <SectionHeader 
          title="Gallery" 
          subtitle="Explore the world of skating through our lens"
        />

        {/* Filter Tabs */}
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          mb: 6, 
          justifyContent: 'center', 
          flexWrap: 'wrap',
          p: 2,
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              onClick={() => setFilter(cat)}
              color={filter === cat ? 'secondary' : 'default'}
              sx={{ 
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: filter === cat ? 600 : 500,
                px: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }
              }}
            />
          ))}
        </Box>

        {/* Gallery Grid */}
        <Grid container spacing={3}>
          {filteredImages.map((image) => (
            <Grid item xs={12} sm={6} md={4} key={image.id}>
              <Card 
                sx={{ 
                  overflow: 'hidden',
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                  },
                  '&:hover .overlay': {
                    opacity: 1,
                  }
                }}
                onClick={() => handleImageClick(image)}
              >
                <CardMedia
                  component="img"
                  height="280"
                  image={image.url}
                  alt={`${image.category} - Gallery ${image.id}`}
                  sx={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    height: { xs: 220, sm: 260, md: 280 },
                    '&:hover': {
                      transform: 'scale(1.1)',
                    }
                  }}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: 'rgba(11, 31, 58, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'white', 
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: 1
                    }}
                  >
                    {image.category}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Lightbox Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        TransitionComponent={Fade}
        PaperProps={{
          sx: {
            bgcolor: 'transparent',
            boxShadow: 'none',
            overflow: 'hidden'
          }
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              bgcolor: 'white',
              zIndex: 1,
              '&:hover': {
                bgcolor: 'secondary.main',
                color: 'white'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
          {selectedImage && (
            <Box
              component="img"
              src={selectedImage.url}
              alt={`${selectedImage.category} - Gallery ${selectedImage.id}`}
              sx={{
                width: '100%',
                height: 'auto',
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
