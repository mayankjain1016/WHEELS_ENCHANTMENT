import { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Button, Grid, Card, CardContent, CardMedia,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  CircularProgress, Alert, Chip, Avatar, FormControlLabel, Switch, IconButton
} from '@mui/material';
import { Add, Edit, Delete, CloudUpload, Star, DragIndicator } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { coachesApi } from '../../api/coaches';
import AdminLayout from '../../components/AdminLayout';
import { getImageUrl } from '../../utils/imageUrl';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const AdminCoaches = () => {
  const navigate = useNavigate();
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCoach, setCurrentCoach] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    experience: '',
    specialty: '',
    bio: '',
    isActive: true,
    isFeatured: false
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchCoaches();
  }, [navigate]);

  const fetchCoaches = async () => {
    try {
      setLoading(true);
      const response = await coachesApi.getAll();
      // Extract data array from response: { success, message, data: [], meta: {} }
      const coachesData = Array.isArray(response?.data) ? response.data : [];
      const sortedCoaches = coachesData.sort((a, b) => a.displayOrder - b.displayOrder);
      setCoaches(sortedCoaches);
    } catch (error) {
      setError('Failed to fetch coaches');
      setCoaches([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (coach = null) => {
    if (coach) {
      setEditMode(true);
      setCurrentCoach(coach);
      setFormData({
        name: coach.name,
        role: coach.role || '',
        experience: coach.experience || '',
        specialty: coach.specialty || '',
        bio: coach.bio || '',
        isActive: coach.isActive,
        isFeatured: coach.isFeatured || false
      });
      setPreviewUrl(getCoachImageUrl(coach));
    } else {
      setEditMode(false);
      setCurrentCoach(null);
      setFormData({
        name: '',
        role: '',
        experience: '',
        specialty: '',
        bio: '',
        isActive: true,
        isFeatured: false
      });
      setPreviewUrl('');
    }
    setSelectedFile(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setError('');
    setSelectedFile(null);
    setPreviewUrl('');
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
      setPreviewUrl(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleSubmit = async () => {
    try {
      setError('');
      
      // Validate required fields
      if (!formData.name.trim()) {
        setError('Coach name is required');
        return;
      }
      
      if (!formData.experience.trim()) {
        setError('Experience is required');
        return;
      }
      
      // For new coach, image is required
      if (!editMode && !selectedFile) {
        setError('Coach photo is required');
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name.trim());
      if (formData.role.trim()) {
        formDataToSend.append('role', formData.role.trim());
      }
      formDataToSend.append('experience', formData.experience.trim());
      if (formData.specialty.trim()) {
        formDataToSend.append('specialty', formData.specialty.trim());
      }
      if (formData.bio.trim()) {
        formDataToSend.append('bio', formData.bio.trim());
      }
      formDataToSend.append('isActive', String(formData.isActive));
      formDataToSend.append('isFeatured', String(formData.isFeatured));
      
      if (selectedFile) {
        formDataToSend.append('image', selectedFile);
      }

      if (editMode && currentCoach) {
        await coachesApi.update(currentCoach._id, formDataToSend);
        setSuccess('Coach updated successfully');
      } else {
        await coachesApi.create(formDataToSend);
        setSuccess('Coach created successfully');
      }
      handleCloseDialog();
      fetchCoaches();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error saving coach:', error);
      setError(error.response?.data?.message || error.message || 'Failed to save coach');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this coach?')) {
      try {
        setError('');
        console.log('Deleting coach with ID:', id);
        await coachesApi.delete(id);
        console.log('Coach deleted successfully');
        setSuccess('Coach deleted successfully');
        await fetchCoaches();
        setTimeout(() => setSuccess(''), 3000);
      } catch (error) {
        console.error('Delete error:', error);
        console.error('Error response:', error.response?.data);
        setError(error.response?.data?.message || error.message || 'Failed to delete coach');
        setTimeout(() => setError(''), 5000);
      }
    }
  };

  const getCoachImageUrl = (coach) => {
    return getImageUrl(coach?.image?.url);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = coaches.findIndex((c) => c._id === active.id);
      const newIndex = coaches.findIndex((c) => c._id === over.id);

      const newCoaches = arrayMove(coaches, oldIndex, newIndex);
      const reorderedCoaches = newCoaches.map((coach, index) => ({
        ...coach,
        displayOrder: index,
      }));

      setCoaches(reorderedCoaches);

      try {
        await coachesApi.reorder(
          reorderedCoaches.map((c) => ({ id: c._id, displayOrder: c.displayOrder }))
        );
        setSuccess('Coaches reordered successfully');
        setTimeout(() => setSuccess(''), 3000);
      } catch (error) {
        setError('Failed to reorder coaches');
        fetchCoaches();
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  const SortableCoachCard = ({ coach }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: coach._id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };

    return (
      <Grid item xs={12} sm={6} md={4} ref={setNodeRef} style={style}>
        <Card sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s',
          '&:hover': { transform: isDragging ? 'none' : 'translateY(-4px)', boxShadow: 4 },
          cursor: isDragging ? 'grabbing' : 'grab',
        }}>
          <Box sx={{ position: 'relative' }}>
            <IconButton
              {...attributes}
              {...listeners}
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                bgcolor: 'rgba(255,255,255,0.9)',
                zIndex: 1,
                '&:hover': { bgcolor: 'white' },
              }}
            >
              <DragIndicator />
            </IconButton>
            {coach.image?.url ? (
              <CardMedia
                component="img"
                height="240"
                image={getCoachImageUrl(coach)}
                alt={coach.name}
                sx={{ objectFit: 'cover' }}
              />
            ) : (
              <Box sx={{ 
                height: 240, 
                bgcolor: 'primary.main', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <Avatar sx={{ width: 100, height: 100, fontSize: '3rem' }}>
                  {coach.name.charAt(0)}
                </Avatar>
              </Box>
            )}
          </Box>
          <CardContent sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {coach.name}
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {coach.isFeatured && (
                  <Chip icon={<Star />} label="Featured" size="small" color="warning" />
                )}
                <Chip 
                  label={coach.isActive ? 'Active' : 'Inactive'} 
                  size="small"
                  color={coach.isActive ? 'success' : 'default'}
                />
              </Box>
            </Box>
            <Typography variant="body2" color="secondary" sx={{ mb: 1, fontWeight: 600 }}>
              {coach.role}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {coach.bio?.substring(0, 100)}{coach.bio?.length > 100 ? '...' : ''}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              {coach.specialty && (
                <Chip label={coach.specialty} size="small" />
              )}
              {coach.experience && (
                <Chip label={coach.experience} size="small" variant="outlined" />
              )}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                size="small" 
                variant="outlined" 
                startIcon={<Edit />}
                onClick={() => handleOpenDialog(coach)}
                fullWidth
              >
                Edit
              </Button>
              <Button 
                size="small" 
                variant="outlined" 
                color="error"
                startIcon={<Delete />}
                onClick={() => handleDelete(coach._id)}
                fullWidth
              >
                Delete
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Coaches Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Coaches: {coaches?.length || 0}
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
          >
            Add Coach
          </Button>
        </Box>

        {success && <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess('')}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>{error}</Alert>}

        {!coaches || coaches.length === 0 ? (
          <Card sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No coaches found. Add your first coach!
            </Typography>
          </Card>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={coaches.map((c) => c._id)}
              strategy={verticalListSortingStrategy}
            >
              <Grid container spacing={3}>
                {coaches.map((coach) => (
                  <SortableCoachCard key={coach._id} coach={coach} />
                ))}
              </Grid>
            </SortableContext>
          </DndContext>
        )}
      </Container>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
          {editMode ? 'Edit Coach' : 'Add New Coach'}
        </DialogTitle>
        <DialogContent sx={{ mt: 3 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <Grid container spacing={3}>
            {/* Left Column - Image Upload */}
            <Grid item xs={12} md={5}>
              <Box sx={{ position: 'sticky', top: 20 }}>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Coach Photo {editMode ? '(Optional - Leave empty to keep current)' : '(Required)'}
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
                  {selectedFile ? 'Change Photo' : editMode ? 'Update Photo' : 'Upload Photo'}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>
                {previewUrl && (
                  <Box sx={{ 
                    width: '100%', 
                    height: 300, 
                    bgcolor: 'grey.100', 
                    borderRadius: 2,
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '3px solid',
                    borderColor: 'primary.main',
                    position: 'relative'
                  }}>
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {selectedFile && (
                      <Chip 
                        label="New Image" 
                        color="primary" 
                        size="small"
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                      />
                    )}
                  </Box>
                )}
                {!previewUrl && (
                  <Box sx={{ 
                    width: '100%', 
                    height: 300, 
                    bgcolor: 'grey.100', 
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px dashed',
                    borderColor: 'grey.400'
                  }}>
                    <Typography variant="body2" color="text.secondary">
                      No image selected
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>

            {/* Right Column - Form Fields */}
            <Grid item xs={12} md={7}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Enter coach name"
                />
                <TextField
                  fullWidth
                  label="Role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g., Head Coach, Senior Coach"
                />
                <TextField
                  fullWidth
                  label="Experience"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  required
                  placeholder="e.g., 10+ Years"
                />
                <TextField
                  fullWidth
                  label="Specialty"
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  placeholder="e.g., Speed Skating, Freestyle"
                />
                <TextField
                  fullWidth
                  label="Bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  multiline
                  rows={4}
                  placeholder="Brief description about the coach"
                />
                <Box sx={{ display: 'flex', gap: 2, pt: 1 }}>
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
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            disabled={!formData.name.trim() || !formData.experience.trim() || (!editMode && !selectedFile)}
          >
            {editMode ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminCoaches;
