import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Rating,
  Alert,
} from '@mui/material';
import { Check, X, Trash2, Edit } from 'lucide-react';
import { reviewsApi } from '../../api/reviews';
import AdminLayout from '../../components/AdminLayout';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editDialog, setEditDialog] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await reviewsApi.getAll();
      // Backend returns paginated data: { success, message, data: [...], meta: {...} }
      setReviews(response.data || []);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
      setError(err.response?.data?.message || 'Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await reviewsApi.approve(id);
      setSuccess('Review approved successfully');
      fetchReviews();
    } catch (err) {
      setError('Failed to approve review');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await reviewsApi.delete(id);
      setSuccess('Review deleted successfully');
      fetchReviews();
    } catch (err) {
      setError('Failed to delete review');
    }
  };

  const handleEdit = (review) => {
    setSelectedReview(review);
    setEditDialog(true);
  };

  const handleUpdate = async () => {
    try {
      await reviewsApi.update(selectedReview._id, {
        name: selectedReview.name,
        role: selectedReview.role,
        rating: selectedReview.rating,
        comment: selectedReview.comment,
        isActive: selectedReview.isActive,
        displayOrder: selectedReview.displayOrder,
      });
      setSuccess('Review updated successfully');
      setEditDialog(false);
      fetchReviews();
    } catch (err) {
      setError('Failed to update review');
    }
  };

  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Reviews Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage customer reviews and testimonials
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">Loading...</TableCell>
              </TableRow>
            ) : reviews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">No reviews found</TableCell>
              </TableRow>
            ) : (
              reviews.map((review) => (
                <TableRow key={review._id}>
                  <TableCell>{review.name}</TableCell>
                  <TableCell>{review.role}</TableCell>
                  <TableCell>
                    <Rating value={review.rating} readOnly size="small" />
                  </TableCell>
                  <TableCell sx={{ maxWidth: 300 }}>
                    {review.comment.substring(0, 100)}
                    {review.comment.length > 100 && '...'}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={review.isApproved ? 'Approved' : 'Pending'}
                      color={review.isApproved ? 'success' : 'warning'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{new Date(review.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                      {!review.isApproved && (
                        <IconButton
                          size="small"
                          color="success"
                          onClick={() => handleApprove(review._id)}
                          title="Approve"
                        >
                          <Check size={18} />
                        </IconButton>
                      )}
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEdit(review)}
                        title="Edit"
                      >
                        <Edit size={18} />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(review._id)}
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Review</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Name"
              value={selectedReview?.name || ''}
              onChange={(e) => setSelectedReview({ ...selectedReview, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="Role"
              value={selectedReview?.role || ''}
              onChange={(e) => setSelectedReview({ ...selectedReview, role: e.target.value })}
              fullWidth
            />
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>Rating</Typography>
              <Rating
                value={selectedReview?.rating || 0}
                onChange={(e, newValue) => setSelectedReview({ ...selectedReview, rating: newValue })}
              />
            </Box>
            <TextField
              label="Comment"
              value={selectedReview?.comment || ''}
              onChange={(e) => setSelectedReview({ ...selectedReview, comment: e.target.value })}
              multiline
              rows={4}
              fullWidth
            />
            <TextField
              label="Display Order"
              type="number"
              value={selectedReview?.displayOrder || 0}
              onChange={(e) => setSelectedReview({ ...selectedReview, displayOrder: parseInt(e.target.value) })}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
    </AdminLayout>
  );
};

export default AdminReviews;
