import { useEffect, useState } from 'react';
import { 
  Box, Container, Grid, Card, CardContent, Typography, Button,
  Paper, List, ListItem, ListItemText, Divider, CircularProgress
} from '@mui/material';
import { 
  People, Image, ShoppingBag, ContactMail, ViewCarousel
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { leadsApi } from '../../api/leads';
import { productsApi } from '../../api/products';
import { galleryApi } from '../../api/gallery';
import { coachesApi } from '../../api/coaches';
import AdminLayout from '../../components/AdminLayout';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    leads: 0,
    products: 0,
    gallery: 0,
    coaches: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentLeads, setRecentLeads] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [leadsRes, productsRes, galleryRes, coachesRes] = await Promise.all([
        leadsApi.getAll({ page: 1, limit: 5 }),
        productsApi.getAll({ page: 1, limit: 1 }),
        galleryApi.getAll({ page: 1, limit: 1 }),
        coachesApi.getAll()
      ]);

      // Extract stats from API responses
      // API responses have structure: { success, message, data: [], meta: { page, limit, total, totalPages } }
      const leadsTotal = leadsRes?.meta?.total || 0;
      const productsTotal = productsRes?.meta?.total || 0;
      const galleryTotal = galleryRes?.meta?.total || 0;
      const coachesTotal = coachesRes?.meta?.total || 0;

      setStats({
        leads: leadsTotal,
        products: productsTotal,
        gallery: galleryTotal,
        coaches: coachesTotal
      });

      // Set recent leads - data is directly in the response, not nested
      const recentLeadsData = Array.isArray(leadsRes?.data) ? leadsRes.data : [];
      setRecentLeads(recentLeadsData);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      // Set empty stats on error
      setStats({
        leads: 0,
        products: 0,
        gallery: 0,
        coaches: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { title: 'Hero Slides', icon: <ViewCarousel />, path: '/admin/hero-slides', color: '#9C27B0' },
    { title: 'Coaches', icon: <People />, path: '/admin/coaches', color: '#E91E63' },
    { title: 'Products', icon: <ShoppingBag />, path: '/admin/products', color: '#2196F3' },
    { title: 'Gallery', icon: <Image />, path: '/admin/gallery', color: '#4CAF50' },
    { title: 'Leads', icon: <ContactMail />, path: '/admin/leads', color: '#FF9800' },
  ];

  const statCards = [
    { title: 'Total Leads', value: stats.leads, icon: <ContactMail />, color: '#FF9800', path: '/admin/leads' },
    { title: 'Products', value: stats.products, icon: <ShoppingBag />, color: '#2196F3', path: '/admin/products' },
    { title: 'Gallery Images', value: stats.gallery, icon: <Image />, color: '#4CAF50', path: '/admin/gallery' },
    { title: 'Coaches', value: stats.coaches, icon: <People />, color: '#E91E63', path: '/admin/coaches' },
  ];

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
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statCards.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': { 
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  }
                }}
                onClick={() => navigate(stat.path)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {stat.title}
                      </Typography>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: stat.color }}>
                        {stat.value}
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      bgcolor: stat.color, 
                      color: 'white', 
                      p: 1.5, 
                      borderRadius: 2,
                      display: 'flex'
                    }}>
                      {stat.icon}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {/* Quick Actions */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, boxShadow: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                {quickActions.map((item, index) => (
                  <Grid item xs={6} sm={4} key={index}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={item.icon}
                      onClick={() => navigate(item.path)}
                      sx={{ 
                        py: 2,
                        justifyContent: 'flex-start',
                        borderColor: item.color,
                        color: item.color,
                        '&:hover': {
                          borderColor: item.color,
                          bgcolor: `${item.color}10`
                        }
                      }}
                    >
                      {item.title}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Recent Leads */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, boxShadow: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Recent Leads
                </Typography>
                <Button size="small" onClick={() => navigate('/admin/leads')}>
                  View All
                </Button>
              </Box>
              <List>
                {recentLeads.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                    No leads yet
                  </Typography>
                ) : (
                  recentLeads.map((lead, index) => (
                    <Box key={lead._id}>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemText
                          primary={lead.name}
                          secondary={lead.email}
                          primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem' }}
                          secondaryTypographyProps={{ fontSize: '0.8rem' }}
                        />
                      </ListItem>
                      {index < recentLeads.length - 1 && <Divider />}
                    </Box>
                  ))
                )}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AdminLayout>
  );
};

export default AdminDashboard;
