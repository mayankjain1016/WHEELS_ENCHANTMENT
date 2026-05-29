import { 
  Box, Container, Grid, Chip, useTheme, 
  Typography, alpha, Stack, CircularProgress, Skeleton, Pagination, MenuItem, TextField
} from '@mui/material';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { productsApi } from '../api/products';
import { categoriesApi } from '../api/categories';
import { getImageUrl } from '../utils/imageUrl';
import backgroundImg7 from '../assets/Background_imgs/backgroundimg7.jpeg';

const Products = () => {
  const theme = useTheme();
  
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesApi.getAll({ isActive: true });
        const categoriesData = Array.isArray(response) ? response : (response?.data || []);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      
      try {
        const params = {
          page,
          limit: itemsPerPage,
          isActive: true
        };
        
        if (selectedCategory !== 'all') {
          params.categoryId = selectedCategory;
        }
        
        const response = await productsApi.getAll(params);
        
        const productsData = response?.data || [];
        const paginationData = response?.meta || {};
        
        setProducts(Array.isArray(productsData) ? productsData : []);
        setTotalPages(paginationData?.totalPages || 1);
        setTotalProducts(paginationData?.total || productsData.length);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, page, itemsPerPage]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getProductImageUrl = (product) => {
    return getImageUrl(product?.images?.[0]?.url);
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
                  key={cat._id}
                  label={cat.name}
                  onClick={() => handleCategoryChange(cat._id)}
                  sx={{ 
                    cursor: 'pointer',
                    px: { xs: 1.5, md: 2 },
                    py: { xs: 0.5, md: 0.75 },
                    height: { xs: '32px', md: '36px' },
                    fontSize: { xs: '0.75rem', md: '0.875rem' },
                    fontWeight: 600,
                    borderRadius: '20px',
                    transition: 'all 0.3s ease',
                    bgcolor: selectedCategory === cat._id ? 'primary.main' : 'transparent',
                    color: selectedCategory === cat._id ? 'white' : 'text.primary',
                    border: `1px solid ${selectedCategory === cat._id ? 'primary.main' : alpha(theme.palette.divider, 0.2)}`,
                    '&:hover': { 
                      bgcolor: selectedCategory === cat._id ? 'primary.dark' : alpha(theme.palette.primary.main, 0.08),
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }
                  }}
                />
              ))}
            </Stack>
          )}
        </Box>

        {/* --- PRODUCTS GRID --- */}
        {loading ? (
          <Grid container spacing={3}>
            {Array.from({ length: 12 }).map((_, index) => (
              <Grid item xs={6} sm={6} md={4} key={`skeleton-${index}`}>
                <Skeleton 
                  variant="rectangular" 
                  sx={{ 
                    borderRadius: 3,
                    height: { xs: 280, sm: 320, md: 360 },
                  }} 
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={6} sm={6} md={4} key={product._id}>
                <ProductCard product={{
                  ...product,
                  image: getProductImageUrl(product)
                }} />
              </Grid>
            ))}
          </Grid>
        )}

        {/* --- EMPTY STATE --- */}
        {!loading && products.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h5" color="text.secondary">No products found in this category.</Typography>
          </Box>
        )}

        {/* --- PERFECT PAGINATION SYSTEM --- */}
        {!loading && (
          <Box sx={{ mt: 10 }}>
            {/* Pagination Info */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 3,
              p: { xs: 1.5, md: 2 },
              borderRadius: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              flexWrap: 'wrap',
              gap: 2
            }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 600,
                    color: 'text.secondary',
                    fontSize: { xs: '0.85rem', md: '0.95rem' }
                  }}
                >
                  Showing {((page - 1) * itemsPerPage) + 1} to {Math.min(page * itemsPerPage, totalProducts)} of {totalProducts} products
                </Typography>
                <TextField
                  select
                  size="small"
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setPage(1);
                  }}
                  sx={{
                    minWidth: '100px',
                    '& .MuiOutlinedInput-root': {
                      fontSize: { xs: '0.8rem', md: '0.875rem' },
                      fontWeight: 600
                    }
                  }}
                >
                  <MenuItem value={6}>6 per page</MenuItem>
                  <MenuItem value={12}>12 per page</MenuItem>
                  <MenuItem value={24}>24 per page</MenuItem>
                  <MenuItem value={50}>50 per page</MenuItem>
                </TextField>
              </Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 600,
                  color: 'primary.main',
                  fontSize: { xs: '0.85rem', md: '0.95rem' }
                }}
              >
                Page {page} of {totalPages}
              </Typography>
            </Box>

            {/* Pagination Controls */}
            {totalPages > 1 && (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 1,
              flexWrap: 'wrap'
            }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={handlePageChange}
                color="secondary"
                size="large"
                shape="rounded"
                showFirstButton
                showLastButton
                sx={{
                  '& .MuiPaginationItem-root': {
                    fontWeight: 600,
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    minWidth: { xs: '36px', md: '40px' },
                    height: { xs: '36px', md: '40px' },
                    border: `2px solid ${alpha(theme.palette.divider, 0.3)}`,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      borderColor: theme.palette.secondary.main,
                    }
                  },
                  '& .Mui-selected': {
                    bgcolor: 'secondary.main',
                    color: 'white',
                    fontWeight: 700,
                    border: `2px solid ${theme.palette.secondary.main}`,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    '&:hover': {
                      bgcolor: 'secondary.dark',
                      borderColor: 'secondary.dark',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                    }
                  },
                  '& .MuiButtonBase-root.Mui-disabled': {
                    opacity: 0.4,
                    cursor: 'not-allowed',
                  }
                }}
              />
            </Box>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Products;