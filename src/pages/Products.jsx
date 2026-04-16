import { 
  Box, Container, Grid, FormControl, Select, MenuItem, 
  InputLabel, Chip, Button, useMediaQuery, useTheme, 
  Typography, alpha, Stack, Fade 
} from '@mui/material';
import { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/data';
import backgroundImg7 from '../assets/Background_imgs/backgroundimg7.jpeg';

const Products = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const productsPerPage = isSmallScreen ? 8 : 9;
  
  const [category, setCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(productsPerPage);

  const categories = ['All', 'Skates', 'Helmets', 'Wheels', 'Protection'];

  const processedProducts = useMemo(() => {
    let result = category === 'All' 
      ? [...products] 
      : products.filter(p => p.category === category);
    return result;
  }, [category]);

  const displayedProducts = processedProducts.slice(0, visibleCount);
  const hasMore = visibleCount < processedProducts.length;

  const handleViewMore = () => setVisibleCount(prev => prev + productsPerPage);

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
          p: 2, 
          borderRadius: '16px', 
          bgcolor: alpha(theme.palette.background.paper, 0.9),
          backdropFilter: 'blur(10px)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          display: 'flex', 
          gap: 3, 
          mb: 6, 
          justifyContent: 'center', 
          alignItems: 'center',
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
        }}>
          <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', py: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
            {categories.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                onClick={() => { setCategory(cat); setVisibleCount(productsPerPage); }}
                sx={{ 
                  cursor: 'pointer',
                  px: 2,
                  fontWeight: 600,
                  transition: '0.3s',
                  bgcolor: category === cat ? 'primary.main' : 'transparent',
                  color: category === cat ? 'white' : 'text.primary',
                  border: `1px solid ${category === cat ? 'primary.main' : alpha(theme.palette.divider, 0.2)}`,
                  '&:hover': { bgcolor: category === cat ? 'primary.dark' : alpha(theme.palette.primary.main, 0.05) }
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* --- PRODUCTS GRID --- */}
        <Grid container spacing={4}>
          {displayedProducts.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Fade in={true} timeout={index * 200}>
                <Box>
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