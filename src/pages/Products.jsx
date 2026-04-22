import { 
  Box, Container, Grid, FormControl, Select, MenuItem, 
  InputLabel, Chip, Button, useMediaQuery, useTheme, 
  Typography, alpha, Stack, Fade 
} from '@mui/material';
import { useState, useMemo, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { products, allProducts } from '../data/data';
import backgroundImg7 from '../assets/Background_imgs/backgroundimg7.jpeg';

const Products = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  const [category, setCategory] = useState('Skates');
  const [subcategory, setSubcategory] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);

  const categories = ['Skates', 'Helmets', 'Wheels', 'Protection'];

  const processedProducts = useMemo(() => {
    if (subcategory) {
      return products.filter(p => p.subcategory === subcategory && !p.isMainCategory);
    }
    return products.filter(p => p.category === category && (p.isMainCategory || !p.subcategory));
  }, [category, subcategory]);

  const displayedProducts = processedProducts.slice(0, visibleCount);
  const hasMore = visibleCount < processedProducts.length;

  const handleViewMore = () => {
    const increment = isSmallScreen ? 8 : 9;
    setVisibleCount(prev => prev + increment);
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setSubcategory(null);
    setVisibleCount(isSmallScreen ? 8 : 9);
  };

  const handleProductClick = (product) => {
    if (product.isMainCategory) {
      setSubcategory(product.subcategory);
      setVisibleCount(isSmallScreen ? 8 : 9);
    }
  };

  useEffect(() => {
    setVisibleCount(isSmallScreen ? 8 : 9);
  }, [isSmallScreen]);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 10 }}>
      
      {/* --- PREMIUM SHOP HEADER --- */}
      <Box sx={{ 
        bgcolor: 'primary.main', 
        color: 'white', 
        pt: { xs: 14, md: 16 }, 
        pb: { xs: 10, md: 12 },
        textAlign: 'center',
        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${backgroundImg7})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: { xs: 'scroll', md: 'fixed' }
      }}>
        <Container maxWidth="md">
          <Typography variant="overline" sx={{ letterSpacing: 4, color: 'secondary.main', fontWeight: 700 }}>
            Curated Collection
          </Typography>
          <Typography variant="h2" sx={{ 
            fontWeight: 800, 
            fontSize: { xs: '2.2rem', md: '3.5rem' }, 
            mt: 1, 
            mb: 2 
          }}>
            Skating Excellence
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8, maxWidth: 600, mx: 'auto', fontSize: '1.1rem' }}>
            Discover professional-grade equipment engineered for champions and built for the bold.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -5, position: 'relative', zIndex: 10 }}>
        
        {/* --- REFINED FILTER BAR (Glassmorphism) --- */}
        <Box sx={{ 
          p: { xs: 1.5, md: 2 }, 
          borderRadius: '16px', 
          bgcolor: alpha(theme.palette.background.paper, 0.9),
          backdropFilter: 'blur(10px)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          display: 'flex', 
          mb: 6, 
          justifyContent: 'center', 
          alignItems: 'center',
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          overflowX: { xs: 'auto', md: 'visible' },
          '&::-webkit-scrollbar': {
            height: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: alpha(theme.palette.primary.main, 0.3),
            borderRadius: '4px',
          },
        }}>
          <Stack 
            direction="row" 
            spacing={{ xs: 1, md: 1 }} 
            sx={{ 
              py: { xs: 0.5, md: 1 }, 
              flexWrap: 'nowrap',
              justifyContent: { xs: 'flex-start', md: 'center' },
              minWidth: { xs: 'max-content', md: 'auto' },
            }}
          >
            {categories.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                onClick={() => handleCategoryChange(cat)}
                sx={{ 
                  cursor: 'pointer',
                  px: { xs: 1.25, md: 2 },
                  py: { xs: 0.5, md: 0.75 },
                  height: { xs: '30px', md: 'auto' },
                  fontSize: { xs: '0.7rem', md: '0.8125rem' },
                  fontWeight: 600,
                  borderRadius: { xs: '12px', md: '16px' },
                  transition: '0.3s',
                  bgcolor: category === cat ? 'primary.main' : 'transparent',
                  color: category === cat ? 'white' : 'text.primary',
                  border: `1px solid ${category === cat ? 'primary.main' : alpha(theme.palette.divider, 0.2)}`,
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                  '& .MuiChip-label': {
                    px: { xs: 0.75, md: 1 },
                    py: 0,
                  },
                  '&:hover': { bgcolor: category === cat ? 'primary.dark' : alpha(theme.palette.primary.main, 0.05) }
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* --- PRODUCTS GRID --- */}
        <Grid container spacing={4}>
          {displayedProducts.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={product.id} sx={{ display: 'flex' }}>
              <Fade in={true} timeout={index * 200} style={{ width: '100%' }}>
                <Box sx={{ width: '100%', cursor: product.isMainCategory ? 'pointer' : 'default' }} onClick={() => handleProductClick(product)}>
                  <ProductCard product={product} />
                </Box>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {/* --- EMPTY STATE --- */}
        {displayedProducts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h5" color="text.secondary">No products found in this category.</Typography>
          </Box>
        )}

        {/* --- LUXURY VIEW MORE --- */}
        {hasMore && (
          <Box sx={{ textAlign: 'center', mt: 10 }}>
            <Button 
              variant="outlined" 
              color="primary" 
              size="large" 
              onClick={handleViewMore}
              sx={{ 
                px: 8, 
                py: 1.5, 
                borderRadius: '50px', 
                borderWidth: 2,
                fontWeight: 800,
                letterSpacing: 1,
                '&:hover': { borderWidth: 2, bgcolor: alpha(theme.palette.primary.main, 0.05) }
              }}
            >
              Discover More
            </Button>
            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary', fontWeight: 500 }}>
              Showing {displayedProducts.length} of {processedProducts.length} Products
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Products;