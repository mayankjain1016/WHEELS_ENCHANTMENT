import { Card, CardMedia, CardContent, Typography, Box, alpha } from '@mui/material';

const ProductCard = ({ product }) => {
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        borderRadius: '24px',
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid',
        borderColor: alpha('#000', 0.06),
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-12px)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
          borderColor: alpha('#E91E63', 0.3),
          '& .product-image': {
            transform: 'scale(1.08)',
          },
          '& .product-overlay': {
            opacity: 1,
          },
        },
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="320"
          image={product.image}
          alt={product.name}
          className="product-image"
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        <Box
          className="product-overlay"
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(11, 31, 58, 0.8) 0%, transparent 60%)',
            opacity: 0,
            transition: 'opacity 0.4s ease',
          }}
        />
      </Box>
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: '1.1rem',
            color: 'text.primary',
            letterSpacing: '0.01em',
          }}
        >
          {product.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
