import { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Button, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, Switch, FormControlLabel,
  Alert, CircularProgress, Avatar
} from '@mui/material';
import { Add, Edit, Delete, DragIndicator } from '@mui/icons-material';
import { heroApi } from '../../api/hero';
import { getImageUrl } from '../../utils/imageUrl';
import AdminLayout from '../../components/AdminLayout';

const AdminHeroSlides = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    ctaText: '',
    ctaLink: '',
    displayOrder: 0,
    isActive: true
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      setLoading(true);
      const data = await heroApi.getAll();
      setSlides(data);
    } catch (err) {
      setError('Failed to fetch hero slides');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (slide = null) => {
    if (slide) {
      setEditingSlide(slide);
      setFormData({
        title: slide.title || '',
        subtitle: slide.subtitle || '',
        ctaText: slide.ctaText || '',
        ctaLink: slide.ctaLink || '',
        displayOrder: slide.displayOrder || 0,
        isActive: slide.isActive
      });
      setImagePreview(getImageUrl(slide.image?.url));
    } else {
      setEditingSlide(null);
      setFormData({
        title: '',
        subtitle: '',
        ctaText: '',
        ctaLink: '',
        displayOrder: slides.length,
        isActive: true
      });
      setImagePreview(null);
    }
    setImageFile(null);
    setOpenDialog(true);
    setError('');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingSlide(null);
    setImageFile(null);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    try {
      setError('');
      
      if (!editingSlide && !imageFile) {
        setError('Image is required');
        return;
      }

      const data = new FormData();
      data.append('title', formData.title);
      data.append('subtitle', formData.subtitle);
      data.append('ctaText', formData.ctaText);
      data.append('ctaLink', formData.ctaLink);
      data.append('displayOrder', formData.displayOrder.toString());
      data.append('isActive', formData.isActive.toString());
      
      if (imageFile) {
        data.append('image', imageFile);
      }

      if (editingSlide) {
        await heroApi.update(editingSlide._id, data);
        setSuccess('Hero slide updated successfully');
      } else {
        await heroApi.create(data);
        setSuccess('Hero slide created successfully');
      }

      handleCloseDialog();
      fetchSlides();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save hero slide');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this hero slide?')) return;

    try {
      await heroApi.delete(id);
      setSuccess('Hero slide deleted successfully');
      fetchSlides();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete hero slide');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" fontWeight={700}>Hero Slides</Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
          >
            Add Hero Slide
          </Button>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Subtitle</TableCell>
                <TableCell>CTA</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slides.map((slide) => (
                <TableRow key={slide._id}>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <DragIndicator sx={{ mr: 1, color: 'text.secondary' }} />
                      {slide.displayOrder}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Avatar
                      src={getImageUrl(slide.image?.thumbnail)}
                      variant="rounded"
                      sx={{ width: 80, height: 50 }}
                    />
                  </TableCell>
                  <TableCell>{slide.title || '-'}</TableCell>
                  <TableCell sx={{ maxWidth: 300 }}>
                    {slide.subtitle ? slide.subtitle.substring(0, 60) + '...' : '-'}
                  </TableCell>
                  <TableCell>{slide.ctaText || '-'}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        bgcolor: slide.isActive ? 'success.light' : 'error.light',
                        color: slide.isActive ? 'success.dark' : 'error.dark',
                        display: 'inline-block',
                        fontSize: '0.75rem',
                        fontWeight: 600
                      }}
                    >
                      {slide.isActive ? 'Active' : 'Inactive'}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpenDialog(slide)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(slide._id)} color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {slides.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography color="text.secondary" py={4}>
                      No hero slides found. Add your first slide!
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>{editingSlide ? 'Edit Hero Slide' : 'Add Hero Slide'}</DialogTitle>
          <DialogContent>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            
            <TextField
              fullWidth
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Subtitle"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              margin="normal"
              multiline
              rows={3}
            />

            <TextField
              fullWidth
              label="CTA Button Text"
              value={formData.ctaText}
              onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
              margin="normal"
            />

            <TextField
              fullWidth
              label="CTA Link"
              value={formData.ctaLink}
              onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
              margin="normal"
              placeholder="/contact"
            />

            <TextField
              fullWidth
              label="Display Order"
              type="number"
              value={formData.displayOrder}
              onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
              margin="normal"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
              }
              label="Active"
              sx={{ mt: 2 }}
            />

            <Box mt={2}>
              <Button variant="outlined" component="label" fullWidth>
                {imageFile ? 'Change Image' : editingSlide ? 'Change Image' : 'Upload Image'}
                <input type="file" hidden accept="image/*" onChange={handleImageChange} />
              </Button>
              {imagePreview && (
                <Box mt={2} textAlign="center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 8 }}
                  />
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {editingSlide ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </AdminLayout>
  );
};

export default AdminHeroSlides;
