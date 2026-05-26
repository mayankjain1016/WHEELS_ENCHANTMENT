import { 
  Box, Container, Grid, Chip, Button, useMediaQuery, useTheme, 
  Typography, alpha, Stack, Fade, CircularProgress 
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { productsApi } from '../api/products';
import { categoriesApi } from '../api/categories';
import { getImageUrl } from '../utils/imageUrl';
import backgroundImg7 from '../assets/Background_imgs/backgroundimg7.jpeg';

const Products = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesApi.getAll({ isActive: true });
        const categoriesData = Array.isArray(response) ? response : (response?.data || []);
        setCategories(categoriesData);
        if (categoriesData.length > 0 && !selectedCategory) {
          setSelectedCategory(categoriesData[0]._id);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;
    
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productsApi.getAll({
          page,
          limit: 12,
          category: selectedCategory,
          isActive: true
        });
        
        const productsData = response?.data?.data || response?.data || [];
        const paginationData = response?.data?.pagination || response?.pagination || {};
        
        if (page === 1) {
          setProducts(Array.isArray(productsData) ? productsData : []);
        } else {
          setProducts(prev => [...prev, ...(Array.isArray(productsData) ? productsData : [])]);
        }
        
        setHasMore(paginationData.hasNextPage || false);
        setTotalProducts(paginationData.total || 0);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, page]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setPage(1);
    setProducts([]);
  };

  const handleViewMore = () => {
    setPage(prev => prev + 1);
  };

  const getProductImageUrl = (product) => {
    const imageUrl = getImageUrl(product?.images?.[0]?.url);
    console.log('Product:', product.name, 'Image URL:', imageUrl);
    return imageUrl;
  };

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
          {loading && page === 1 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
              <CircularProgress size={30} />
            </Box>
          ) : (
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
                  key={cat._id}
                  label={cat.name}
                  onClick={() => handleCategoryChange(cat._id)}
                  sx={{ 
                    cursor: 'pointer',
                    px: { xs: 1.25, md: 2 },
                    py: { xs: 0.5, md: 0.75 },
                    height: { xs: '30px', md: 'auto' },
                    fontSize: { xs: '0.7rem', md: '0.8125rem' },
                    fontWeight: 600,
                    borderRadius: { xs: '12px', md: '16px' },
                    transition: '0.3s',
                    bgcolor: selectedCategory === cat._id ? 'primary.main' : 'transparent',
                    color: selectedCategory === cat._id ? 'white' : 'text.primary',
                    border: `1px solid ${selectedCategory === cat._id ? 'primary.main' : alpha(theme.palette.divider, 0.2)}`,
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    '& .MuiChip-label': {
                      px: { xs: 0.75, md: 1 },
                      py: 0,
                    },
                    '&:hover': { bgcolor: selectedCategory === cat._id ? 'primary.dark' : alpha(theme.palette.primary.main, 0.05) }
                  }}
                />
              ))}
            </Stack>
          )}
        </Box>

        {/* --- PRODUCTS GRID --- */}
        {loading && page === 1 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress size={60} />
          </Box>
        ) : (
          <>
            <Grid container spacing={4}>
              {products.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} key={product._id} sx={{ display: 'flex' }}>
                  <Fade in={true} timeout={index * 200} style={{ width: '100%' }}>
                    <Box sx={{ width: '100%' }}>
                      <ProductCard product={{
                        ...product,
                        image: getProductImageUrl(product)
                      }} />
                    </Box>
                  </Fade>
                </Grid>
              ))}
            </Grid>

            {/* --- EMPTY STATE --- */}
            {products.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 10 }}>
                <Typography variant="h5" color="text.secondary">No products found in this category.</Typography>
              </Box>
            )}
          </>
        )}

        {/* --- LUXURY VIEW MORE --- */}
        {hasMore && products.length > 0 && (
          <Box sx={{ textAlign: 'center', mt: 10 }}>
            <Button 
              variant="outlined" 
              color="primary" 
              size="large" 
              onClick={handleViewMore}
              disabled={loading}
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
              {loading && page > 1 ? <CircularProgress size={20} /> : 'Discover More'}
            </Button>
            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary', fontWeight: 500 }}>
              Showing {products.length} of {totalProducts} Products
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Products;