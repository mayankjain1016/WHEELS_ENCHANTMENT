import { Box, Container, Grid, FormControl, Select, MenuItem, InputLabel, Chip, Button, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import SectionHeader from '../components/SectionHeader';
import { products } from '../data/data';

const Products = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const productsPerPage = isSmallScreen ? 8 : 9;
  
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [visibleCount, setVisibleCount] = useState(productsPerPage);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = category === 'All' 
    ? products 
    : products.filter(p => p.category === category);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleViewMore = () => {
    setVisibleCount(prev => prev + productsPerPage);
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <SectionHeader 
          title="Our Products" 
          subtitle="Premium skating gear for every rider"
        />

        {/* Filters */}
        <Box sx={{ display: 'flex', gap: 2, mb: 6, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                onClick={() => setCategory(cat)}
                color={category === cat ? 'secondary' : 'default'}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Box>

          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} label="Sort By" onChange={(e) => setSortBy(e.target.value)}>
              <MenuItem value="featured">Featured</MenuItem>
              <MenuItem value="price-low">Price: Low to High</MenuItem>
              <MenuItem value="price-high">Price: High to Low</MenuItem>
              <MenuItem value="name">Name</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Products Grid */}
        <Grid container spacing={4}>
          {displayedProducts.map((product) => (
            <Grid item xs={6} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>

        {/* View More Button */}
        {hasMore && (
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button variant="contained" color="primary" size="large" onClick={handleViewMore}>
              View More
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Products;
