import { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Chip, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress,
  Alert, Button
} from '@mui/material';
import { Visibility, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { leadsApi } from '../../api/leads';
import AdminLayout from '../../components/AdminLayout';

const AdminLeads = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLeads();
  }, [navigate]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await leadsApi.getAll({ page: 1, limit: 100 });
      const leadsData = response?.data?.data || response?.data || [];
      setLeads(Array.isArray(leadsData) ? leadsData : []);
    } catch (error) {
      setError('Failed to fetch leads');
      setLeads([]);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewLead = (lead) => {
    setSelectedLead(lead);
    setOpenDialog(true);
  };

  const handleDeleteLead = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await leadsApi.delete(id);
        setLeads(leads.filter(l => l._id !== id));
      } catch (error) {
        setError('Failed to delete lead');
      }
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      new: 'info',
      contacted: 'warning',
      converted: 'success',
      closed: 'default'
    };
    return colors[status] || 'default';
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
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Leads Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Leads: {leads?.length || 0}
            </Typography>
          </Box>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Phone</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Source</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Date</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!leads || leads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                    <Typography color="text.secondary">No leads found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                leads.map((lead) => (
                  <TableRow key={lead._id} hover>
                    <TableCell>{lead.name}</TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>{lead.phone || '-'}</TableCell>
                    <TableCell>
                      <Chip label={lead.source} size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={lead.status} 
                        size="small" 
                        color={getStatusColor(lead.status)}
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        size="small" 
                        color="primary"
                        onClick={() => handleViewLead(lead)}
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => handleDeleteLead(lead._id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* View Lead Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
          Lead Details
        </DialogTitle>
        <DialogContent sx={{ mt: 3 }}>
          {selectedLead && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">Name</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>{selectedLead.name}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Email</Typography>
                <Typography variant="body1">{selectedLead.email}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Phone</Typography>
                <Typography variant="body1">{selectedLead.phone || 'Not provided'}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Message</Typography>
                <Typography variant="body1">{selectedLead.message || 'No message'}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Source</Typography>
                <Typography variant="body1">{selectedLead.source}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Status</Typography>
                <Chip 
                  label={selectedLead.status} 
                  size="small" 
                  color={getStatusColor(selectedLead.status)}
                  sx={{ mt: 0.5 }}
                />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Submitted On</Typography>
                <Typography variant="body1">
                  {new Date(selectedLead.createdAt).toLocaleString()}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminLeads;
