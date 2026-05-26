import { Card, CardMedia, CardContent, Typography, Box, alpha, Button } from '@mui/material';
import { ArrowRight } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <Card
      elevation={0}
      sx={{
        height: product.isMainCategory ? '450px' : '320px',
        borderRadius: '24px',
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid',
        borderColor: alpha('#000', 0.06),
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
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
      <Box sx={{ position: 'relative', overflow: 'hidden', height: '320px', flexShrink: 0 }}>
        {product.image ? (
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name}
            className="product-image"
            onError={(e) => {
              console.error('Image failed to load:', product.image);
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<div style="width:100%;height:100%;background:#f5f5f5;display:flex;align-items:center;justify-content:center;flex-direction:column"><svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#bdbdbd" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><p style="color:#9e9e9e;margin-top:12px;font-size:14px">No Image Available</p></div>';
            }}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        ) : (
          <Box sx={{ 
            width: '100%', 
            height: '100%', 
            bgcolor: '#f5f5f5', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 1.5
          }}>
            <Box component="svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#bdbdbd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </Box>
            <Typography color="text.secondary" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>No Image Available</Typography>
          </Box>
        )}
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
      {product.isMainCategory && (
        <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: '1.1rem',
              color: 'text.primary',
              letterSpacing: '0.01em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              textAlign: 'center',
              mb: 2,
            }}
          >
            {product.name}
          </Typography>
          {product.price && (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" color="secondary" sx={{ fontWeight: 700 }}>
                ₹{product.price}
              </Typography>
              {product.compareAtPrice && (
                <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                  ₹{product.compareAtPrice}
                </Typography>
              )}
            </Box>
          )}
          <Button
            variant="contained"
            color="secondary"
            endIcon={<ArrowRight size={16} strokeWidth={2.5} />}
            sx={{
              px: 3,
              py: 1,
              borderRadius: '999px',
              fontWeight: 700,
              fontSize: '0.875rem',
              textTransform: 'none',
              boxShadow: '0 8px 24px rgba(233, 30, 99, 0.4)',
              '&:hover': {
                boxShadow: '0 12px 32px rgba(233, 30, 99, 0.5)',
              },
            }}
          >
            View More
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default ProductCard;
