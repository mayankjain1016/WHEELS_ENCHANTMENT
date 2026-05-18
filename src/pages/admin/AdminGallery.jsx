import { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Button, Grid, Card, CardMedia, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  CircularProgress, Alert, Chip, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { Add, Delete, CloudUpload } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { galleryApi } from '../../api/gallery';
import AdminLayout from '../../components/AdminLayout';
import { getImageUrl } from '../../utils/imageUrl';

const AdminGallery = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Training',
    description: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploading, setUploading] = useState(false);

  const categories = ['Training', 'Competition', 'Events', 'Facilities', 'Students', 'Other'];

  useEffect(() => {
    fetchImages();
  }, [navigate]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await galleryApi.getAll({ page: 1, limit: 100 });
      const imagesData = response?.data?.data || response?.data || [];
      setImages(Array.isArray(imagesData) ? imagesData : []);
    } catch (error) {
      setError('Failed to fetch images');
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setFormData({ title: '', category: 'Training', description: '' });
    setSelectedFile(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      setSelectedFile(file);
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError('Please select an image');
      return;
    }

    try {
      setUploading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('image', selectedFile);
      if (formData.title) {
        formDataToSend.append('title', formData.title);
      }
      formDataToSend.append('category', formData.category);
      if (formData.description) {
        formDataToSend.append('caption', formData.description);
      }
      formDataToSend.append('isActive', 'true');

      await galleryApi.create(formDataToSend);
      setSuccess('Image uploaded successfully');
      handleCloseDialog();
      fetchImages();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await galleryApi.delete(id);
        setSuccess('Image deleted successfully');
        fetchImages();
        setTimeout(() => setSuccess(''), 3000);
      } catch (error) {
        setError('Failed to delete image');
      }
    }
  };

  const getGalleryImageUrl = (image) => {
    return getImageUrl(image?.image?.url);
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
              Gallery Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Images: {images?.length || 0}
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            startIcon={<Add />}
            onClick={handleOpenDialog}
          >
            Upload Image
          </Button>
        </Box>

        {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <Grid container spacing={3}>
          {!images || images.length === 0 ? (
            <Grid item xs={12}>
              <Card sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  No images found. Upload your first image!
                </Typography>
              </Card>
            </Grid>
          ) : (
            images.map((image) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={image._id}>
                <Card sx={{ 
                  position: 'relative',
                  transition: 'all 0.3s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
                  '&:hover .delete-btn': { opacity: 1 }
                }}>
                  <CardMedia
                    component="img"
                    height="240"
                    image={getGalleryImageUrl(image)}
                    alt={image.title || image.category}
                    sx={{ objectFit: 'cover' }}
                  />
                  <IconButton
                    className="delete-btn"
                    onClick={() => handleDelete(image._id)}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'error.main',
                      color: 'white',
                      opacity: 0,
                      transition: 'opacity 0.3s',
                      '&:hover': { bgcolor: 'error.dark' }
                    }}
                  >
                    <Delete />
                  </IconButton>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {image.title || 'Untitled'}
                    </Typography>
                    <Chip label={image.category} size="small" />
                  </Box>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>

      {/* Upload Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
          Upload New Image
        </DialogTitle>
        <DialogContent sx={{ mt: 3 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
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
                    borderWidth: 2
                  }
                }}
              >
                {selectedFile ? selectedFile.name : 'Click to Upload Image'}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
              {selectedFile && (
                <Box sx={{ 
                  width: '100%', 
                  height: 250, 
                  bgcolor: 'grey.100', 
                  borderRadius: 2,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  border: '2px solid',
                  borderColor: 'primary.main'
                }}>
                  <img 
                    src={URL.createObjectURL(selectedFile)} 
                    alt="Preview" 
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                </Box>
              )}
            </Box>
            <TextField
              fullWidth
              label="Title (Optional)"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Give your image a title"
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                label="Category"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Description (Optional)"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              multiline
              rows={3}
              placeholder="Add a description for this image"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseDialog} disabled={uploading}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            disabled={uploading || !selectedFile}
          >
            {uploading ? <CircularProgress size={24} /> : 'Upload'}
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminGallery;
