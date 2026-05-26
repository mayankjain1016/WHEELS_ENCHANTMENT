import { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Button, Grid, Card, CardContent, CardMedia,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton,
  CircularProgress, Alert, Chip, Select, MenuItem, FormControl, InputLabel,
  FormControlLabel, Switch
} from '@mui/material';
import { Add, Edit, Delete, CloudUpload, Star } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { productsApi } from '../../api/products';
import { categoriesApi } from '../../api/categories';
import AdminLayout from '../../components/AdminLayout';
import { getImageUrl } from '../../utils/imageUrl';

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    specifications: '',
    price: '',
    compareAtPrice: '',
    categoryId: '',
    sku: '',
    stock: '',
    isActive: true,
    isFeatured: false,
    isBestseller: false
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsRes, categoriesRes] = await Promise.all([
        productsApi.getAll({ page: 1, limit: 100 }),
        categoriesApi.getAll()
      ]);
      const productsData = productsRes?.data?.data || productsRes?.data || [];
      setProducts(Array.isArray(productsData) ? productsData : []);
      setCategories(Array.isArray(categoriesRes) ? categoriesRes : []);
    } catch (error) {
      setError('Failed to fetch data');
      setProducts([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (product = null) => {
    if (product) {
      setEditMode(true);
      setCurrentProduct(product);
      setFormData({
        name: product.name,
        description: product.description || '',
        specifications: product.specifications || '',
        price: product.price || '',
        compareAtPrice: product.compareAtPrice || '',
        categoryId: product.categoryId?._id || '',
        sku: product.sku || '',
        stock: product.stock || '',
        isActive: product.isActive,
        isFeatured: product.isFeatured || false,
        isBestseller: product.isBestseller || false
      });
      if (product.images?.length > 0) {
        setPreviewUrls(product.images.map(img => getImageUrl(product)));
      }
    } else {
      setEditMode(false);
      setCurrentProduct(null);
      setFormData({
        name: '',
        description: '',
        specifications: '',
        price: '',
        compareAtPrice: '',
        categoryId: '',
        sku: '',
        stock: '',
        isActive: true,
        isFeatured: false,
        isBestseller: false
      });
      setPreviewUrls([]);
    }
    setSelectedFiles([]);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setError('');
    setSelectedFiles([]);
    setPreviewUrls([]);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = [];
    const urls = [];

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Each file must be less than 5MB');
        continue;
      }
      if (!file.type.startsWith('image/')) {
        setError('Please select only image files');
        continue;
      }
      validFiles.push(file);
      urls.push(URL.createObjectURL(file));
    }

    setSelectedFiles(validFiles);
    setPreviewUrls(urls);
    if (validFiles.length > 0) setError('');
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('specifications', formData.specifications);
      
      // Convert numbers properly
      if (formData.price) {
        formDataToSend.append('price', parseFloat(formData.price).toString());
      }
      if (formData.compareAtPrice) {
        formDataToSend.append('compareAtPrice', parseFloat(formData.compareAtPrice).toString());
      }
      if (formData.stock) {
        formDataToSend.append('stock', parseInt(formData.stock).toString());
      }
      
      formDataToSend.append('categoryId', formData.categoryId);
      formDataToSend.append('sku', formData.sku);
      
      // Convert booleans properly
      formDataToSend.append('isActive', formData.isActive.toString());
      formDataToSend.append('isFeatured', formData.isFeatured.toString());
      formDataToSend.append('isBestseller', formData.isBestseller.toString());
      
      selectedFiles.forEach((file) => {
        formDataToSend.append('images', file);
      });

      if (editMode && currentProduct) {
        if (selectedFiles.length > 0) {
          await productsApi.addImages(currentProduct._id, formDataToSend);
        }
        const updateData = {
          name: formData.name,
          description: formData.description,
          specifications: formData.specifications,
          price: formData.price ? parseFloat(formData.price) : undefined,
          compareAtPrice: formData.compareAtPrice ? parseFloat(formData.compareAtPrice) : undefined,
          categoryId: formData.categoryId,
          sku: formData.sku,
          stock: formData.stock ? parseInt(formData.stock) : undefined,
          isActive: formData.isActive,
          isFeatured: formData.isFeatured,
          isBestseller: formData.isBestseller
        };
        await productsApi.update(currentProduct._id, updateData);
        setSuccess('Product updated successfully');
      } else {
        await productsApi.create(formDataToSend);
        setSuccess('Product created successfully');
      }
      handleCloseDialog();
      fetchData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save product');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productsApi.delete(id);
        setSuccess('Product deleted successfully');
        fetchData();
        setTimeout(() => setSuccess(''), 3000);
      } catch (error) {
        setError('Failed to delete product');
      }
    }
  };

  const getProductImageUrl = (product) => {
    return getImageUrl(product?.images?.[0]?.url);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Products Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Products: {products?.length || 0}
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
          >
            Add Product
          </Button>
        </Box>

        {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <Grid container spacing={3}>
          {!products || products.length === 0 ? (
            <Grid item xs={12}>
              <Card sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  No products found. Add your first product!
                </Typography>
              </Card>
            </Grid>
          ) : (
            products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                <Card sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 }
                }}>
                  {product.images?.[0]?.url ? (
                    <CardMedia
                      component="img"
                      height="200"
                      image={getProductImageUrl(product)}
                      alt={product.name}
                      sx={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <Box sx={{ 
                      height: 200, 
                      bgcolor: 'grey.200', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      <Typography color="text.secondary">No Image</Typography>
                    </Box>
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>
                        {product.name}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {product.isFeatured && (
                          <Chip icon={<Star />} label="Featured" size="small" color="warning" />
                        )}
                        {product.isBestseller && (
                          <Chip label="Bestseller" size="small" color="success" />
                        )}
                        <Chip 
                          label={product.isActive ? 'Active' : 'Inactive'} 
                          size="small"
                          color={product.isActive ? 'success' : 'default'}
                        />
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {product.description?.substring(0, 80)}{product.description?.length > 80 ? '...' : ''}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" color="secondary" sx={{ fontWeight: 700 }}>
                        ₹{product.price}
                      </Typography>
                      {product.compareAtPrice && (
                        <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                          ₹{product.compareAtPrice}
                        </Typography>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                      {product.categoryId?.name && (
                        <Chip label={product.categoryId.name} size="small" />
                      )}
                      {product.stock !== undefined && (
                        <Chip 
                          label={`Stock: ${product.stock}`} 
                          size="small"
                          color={product.stock > 0 ? 'success' : 'error'}
                        />
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button 
                        size="small" 
                        variant="outlined" 
                        startIcon={<Edit />}
                        onClick={() => handleOpenDialog(product)}
                        fullWidth
                      >
                        Edit
                      </Button>
                      <Button 
                        size="small" 
                        variant="outlined" 
                        color="error"
                        startIcon={<Delete />}
                        onClick={() => handleDelete(product._id)}
                        fullWidth
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
          {editMode ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent sx={{ mt: 3 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <Grid container spacing={3}>
            {/* Left Column - Image Upload */}
            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'sticky', top: 20 }}>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Product Images {editMode && '(Add more images)'}
                </Typography>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<CloudUpload />}
                  fullWidth
                  sx={{ 
                    py: 3, 
                    mb: 2,
                    borderStyle: 'dashed',
                    borderWidth: 2,
                    '&:hover': {
                      borderStyle: 'dashed',
                      borderWidth: 2,
                      bgcolor: 'action.hover'
                    }
                  }}
                >
                  {selectedFiles.length > 0 ? `${selectedFiles.length} Image(s) Selected` : editMode ? 'Add More Images' : 'Upload Images'}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                  />
                </Button>
                {previewUrls.length > 0 ? (
                  <Grid container spacing={1}>
                    {previewUrls.map((url, index) => (
                      <Grid item xs={6} key={index}>
                        <Box sx={{ 
                          width: '100%', 
                          height: 120, 
                          bgcolor: 'grey.100', 
                          borderRadius: 1,
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '2px solid',
                          borderColor: 'primary.main',
                          position: 'relative'
                        }}>
                          <img 
                            src={url} 
                            alt={`Preview ${index + 1}`} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          {selectedFiles[index] && (
                            <Chip 
                              label="New" 
                              color="primary" 
                              size="small"
                              sx={{ position: 'absolute', top: 4, right: 4 }}
                            />
                          )}
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box sx={{ 
                    width: '100%', 
                    height: 250, 
                    bgcolor: 'grey.100', 
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px dashed',
                    borderColor: 'grey.400'
                  }}>
                    <Typography variant="body2" color="text.secondary">
                      No images selected
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>

            {/* Right Column - Form Fields */}
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Product Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Enter product name"
                />
                <TextField
                  fullWidth
                  label="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  multiline
                  rows={3}
                  placeholder="Product description"
                />
                <TextField
                  fullWidth
                  label="Specifications"
                  value={formData.specifications}
                  onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                  multiline
                  rows={2}
                  placeholder="Technical details, features, etc."
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                      placeholder="0.00"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Compare At Price"
                      type="number"
                      value={formData.compareAtPrice}
                      onChange={(e) => setFormData({ ...formData, compareAtPrice: e.target.value })}
                      placeholder="Original price"
                    />
                  </Grid>
                </Grid>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    label="Category"
                  >
                    {categories?.map((cat) => (
                      <MenuItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="SKU"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      placeholder="Product code"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      placeholder="0"
                    />
                  </Grid>
                </Grid>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', pt: 1 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                        color="success"
                      />
                    }
                    label="Active"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.isFeatured}
                        onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                        color="warning"
                      />
                    }
                    label="Featured"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.isBestseller}
                        onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
                        color="secondary"
                      />
                    }
                    label="Bestseller"
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editMode ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminProducts;
