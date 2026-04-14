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
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {product.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
