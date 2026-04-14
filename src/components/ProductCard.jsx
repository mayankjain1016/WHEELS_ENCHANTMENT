import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

const ProductCard = ({ product }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="280"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
          {product.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
