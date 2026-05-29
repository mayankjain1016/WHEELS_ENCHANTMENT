import { useState } from 'react';
import { Box, Container, Card, CardContent, TextField, Button, Typography, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api/auth';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await authApi.login(credentials.email, credentials.password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      bgcolor: '#F8F9FB',
      pt: 10
    }}>
      <Container maxWidth="sm">
        <Card sx={{ boxShadow: 3 }}>
          <CardContent sx={{ p: 5 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
              Admin Login
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
              Wheels Enchntment
 Admin Panel
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
              />
              <Button 
                type="submit" 
                variant="contained" 
                size="large"
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
              </Button>
            </Box>

            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 3, textAlign: 'center' }}>
              Use your admin credentials to login
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default AdminLogin;
