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
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Student Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Father Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Father Mobile</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>School</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Date</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!leads || leads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                    <Typography color="text.secondary">No leads found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                leads.map((lead) => (
                  <TableRow key={lead._id} hover>
                    <TableCell>{lead.studentName || lead.name || '-'}</TableCell>
                    <TableCell>{lead.fatherName || '-'}</TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>{lead.fatherMobile || '-'}</TableCell>
                    <TableCell>{lead.school || '-'}</TableCell>
                    <TableCell>
                      <Chip 
                        label={lead.status || 'New'} 
                        size="small" 
                        color={getStatusColor((lead.status || 'New').toLowerCase())}
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(lead.submittedAt || lead.createdAt).toLocaleDateString()}
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
                <Typography variant="caption" color="text.secondary">Student Name</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>{selectedLead.studentName || selectedLead.name}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Date of Birth</Typography>
                <Typography variant="body1">{selectedLead.dateOfBirth ? new Date(selectedLead.dateOfBirth).toLocaleDateString() : 'Not provided'}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">School</Typography>
                <Typography variant="body1">{selectedLead.school || 'Not provided'}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Father Name</Typography>
                <Typography variant="body1">{selectedLead.fatherName || 'Not provided'}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Father Mobile</Typography>
                <Typography variant="body1">{selectedLead.fatherMobile || 'Not provided'}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Mother Name</Typography>
                <Typography variant="body1">{selectedLead.motherName || 'Not provided'}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Mother Mobile</Typography>
                <Typography variant="body1">{selectedLead.motherMobile || 'Not provided'}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Address</Typography>
                <Typography variant="body1">{selectedLead.address || 'Not provided'}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Email</Typography>
                <Typography variant="body1">{selectedLead.email}</Typography>
              </Box>
              {selectedLead.photo && (
                <Box>
                  <Typography variant="caption" color="text.secondary">Photo</Typography>
                  <Box 
                    component="img" 
                    src={selectedLead.photo.startsWith('http') ? selectedLead.photo : `${import.meta.env.VITE_BACKEND_URL}${selectedLead.photo.replace('/uploads/uploads/', '/uploads/')}`}
                    alt="Student" 
                    sx={{ 
                      width: 150, 
                      height: 150, 
                      objectFit: 'cover', 
                      borderRadius: 1, 
                      mt: 1,
                      border: '1px solid',
                      borderColor: 'divider'
                    }} 
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <Typography variant="caption" color="error" sx={{ display: 'none', mt: 1 }}>
                    Failed to load image
                  </Typography>
                </Box>
              )}
              {selectedLead.aadharCard && (
                <Box>
                  <Typography variant="caption" color="text.secondary">Aadhar Card</Typography>
                  <Box 
                    component="img" 
                    src={selectedLead.aadharCard.startsWith('http') ? selectedLead.aadharCard : `${import.meta.env.VITE_BACKEND_URL}${selectedLead.aadharCard.replace('/uploads/uploads/', '/uploads/')}`}
                    alt="Aadhar" 
                    sx={{ 
                      width: '100%', 
                      maxWidth: 300, 
                      height: 'auto', 
                      borderRadius: 1, 
                      mt: 1,
                      border: '1px solid',
                      borderColor: 'divider'
                    }} 
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <Typography variant="caption" color="error" sx={{ display: 'none', mt: 1 }}>
                    Failed to load image
                  </Typography>
                </Box>
              )}
              <Box>
                <Typography variant="caption" color="text.secondary">Age</Typography>
                <Typography variant="body1">{selectedLead.age || 'Not provided'}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Location</Typography>
                <Typography variant="body1">{selectedLead.location || 'Not provided'}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Preferred Training Location</Typography>
                <Typography variant="body1">{selectedLead.preferredLocation || 'Not provided'}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Experience Level</Typography>
                <Typography variant="body1">{selectedLead.experienceLevel || 'Not provided'}</Typography>
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
                  {new Date(selectedLead.submittedAt || selectedLead.createdAt).toLocaleString()}
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
