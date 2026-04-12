import { Box, Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SectionHeader from '../components/SectionHeader';
import { features, coaches } from '../data/data';

const Home = () => {
  const iconMap = {
    star: <StarIcon sx={{ fontSize: 48, color: 'secondary.main' }} />,
    local_shipping: <LocalShippingIcon sx={{ fontSize: 48, color: 'secondary.main' }} />,
    support_agent: <SupportAgentIcon sx={{ fontSize: 48, color: 'secondary.main' }} />,
  };

  return (
    <Box>
      {/* Hero Section - Full Screen */}
      <Box 
        sx={{ 
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0B1F3A 0%, #1a3a5c 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(233, 30, 99, 0.15) 0%, transparent 70%)',
            animation: 'float 6s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-30px)' }
            }
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '15%',
            left: '5%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(233, 30, 99, 0.1) 0%, transparent 70%)',
            animation: 'float 8s ease-in-out infinite',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', color: 'white' }}>
            <Typography 
              variant="overline" 
              sx={{ 
                fontSize: '0.9rem', 
                letterSpacing: 4, 
                color: 'secondary.main',
                fontWeight: 600,
                mb: 2,
                display: 'block'
              }}
            >
              WHEELS ENCHANTMENT
            </Typography>
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '3rem', md: '5.5rem' },
                fontWeight: 800,
                mb: 3,
                lineHeight: 1.1,
                letterSpacing: -2
              }}
            >
              Elevate Your
              <Box component="span" sx={{ display: 'block', color: 'secondary.main' }}>
                Ride
              </Box>
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 6, 
                opacity: 0.9,
                fontWeight: 300,
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Premium skating products engineered for performance, designed for champions
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                component={Link}
                to="/products"
                endIcon={<ArrowForwardIcon />}
                sx={{ 
                  px: 5, 
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: '0 8px 24px rgba(233, 30, 99, 0.4)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 32px rgba(233, 30, 99, 0.5)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Explore Products
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                component={Link}
                to="/admission"
                sx={{ 
                  px: 5, 
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                  borderColor: 'white',
                  color: 'white',
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    borderColor: 'secondary.main',
                    bgcolor: 'rgba(233, 30, 99, 0.1)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Join Our Academy
              </Button>
            </Box>
          </Box>
        </Container>

        {/* Scroll Indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'bounce 2s infinite',
            '@keyframes bounce': {
              '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
              '50%': { transform: 'translateX(-50%) translateY(10px)' }
            }
          }}
        >
          <Box
            sx={{
              width: 30,
              height: 50,
              border: '2px solid rgba(255,255,255,0.5)',
              borderRadius: 20,
              position: 'relative'
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 10,
                bgcolor: 'white',
                borderRadius: 3,
                position: 'absolute',
                top: 8,
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Brand Statement Section */}
      <Box sx={{ py: { xs: 12, md: 20 }, bgcolor: 'white' }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 700, 
                mb: 4,
                fontSize: { xs: '2rem', md: '3.5rem' },
                lineHeight: 1.2,
                color: 'primary.main'
              }}
            >
              Performance Meets Precision
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ 
                lineHeight: 1.8,
                fontWeight: 300,
                fontSize: { xs: '1.1rem', md: '1.3rem' }
              }}
            >
              Every product is crafted with meticulous attention to detail, tested by professionals, 
              and engineered to push the boundaries of what's possible on wheels.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Features Section - Minimal Cards */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#F8F9FB' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {features.map((feature) => (
              <Grid item xs={12} md={4} key={feature.id}>
                <Card 
                  sx={{ 
                    textAlign: 'center', 
                    p: 5,
                    height: '100%',
                    border: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    borderRadius: 3,
                    transition: 'all 0.4s ease',
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.12)'
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ mb: 3 }}>{iconMap[feature.icon]}</Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}>
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Full-Width Image Banner */}
      <Box 
        sx={{ 
          height: { xs: '50vh', md: '70vh' },
          backgroundImage: 'linear-gradient(rgba(11, 31, 58, 0.6), rgba(11, 31, 58, 0.6)), url(https://images.unsplash.com/photo-1564982752979-3f7bc974d29a?w=1600)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', color: 'white' }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 800, 
                mb: 3,
                fontSize: { xs: '2.5rem', md: '4rem' },
                textShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}
            >
              Built for Champions
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 300,
                fontSize: { xs: '1.1rem', md: '1.4rem' },
                opacity: 0.95
              }}
            >
              Trusted by professional skaters worldwide
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Coaches Section - Premium Design */}
      <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="overline" 
              sx={{ 
                fontSize: '0.9rem', 
                letterSpacing: 3, 
                color: 'secondary.main',
                fontWeight: 600,
                mb: 2,
                display: 'block'
              }}
            >
              EXPERT COACHING
            </Typography>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '3.5rem' },
                color: 'primary.main',
                mb: 2
              }}
            >
              Meet Our Coaches
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ 
                fontWeight: 300,
                maxWidth: 700,
                mx: 'auto'
              }}
            >
              Learn from experienced professionals dedicated to your skating journey
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {coaches.map((coach) => (
              <Grid item xs={12} md={4} key={coach.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    p: 4,
                    borderRadius: 3,
                    border: '1px solid #E0E0E0',
                    boxShadow: 'none',
                    transition: 'all 0.4s ease',
                    '&:hover': {
                      boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
                      transform: 'translateY(-8px)',
                      borderColor: 'secondary.main'
                    }
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Box 
                      sx={{ 
                        width: 80, 
                        height: 80, 
                        borderRadius: '50%', 
                        bgcolor: 'secondary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        fontSize: '2rem',
                        fontWeight: 700,
                        color: 'white'
                      }}
                    >
                      {coach.name.charAt(0)}
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, color: 'primary.main' }}>
                      {coach.name}
                    </Typography>
                    <Typography variant="subtitle1" color="secondary" sx={{ fontWeight: 600, mb: 2 }}>
                      {coach.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary', fontWeight: 500 }}>
                      {coach.experience} • {coach.specialty}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {coach.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section - Bold & Minimal */}
      <Box 
        sx={{ 
          py: { xs: 12, md: 20 },
          background: 'linear-gradient(135deg, #0B1F3A 0%, #1a3a5c 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(233, 30, 99, 0.2) 0%, transparent 70%)',
          }}
        />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', color: 'white' }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 800, 
                mb: 3,
                fontSize: { xs: '2.5rem', md: '4rem' },
                lineHeight: 1.2
              }}
            >
              Ready to Ride?
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 6, 
                opacity: 0.9,
                fontWeight: 300,
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                lineHeight: 1.6
              }}
            >
              Join thousands of riders who trust Wheels Enchantment for their skating needs
            </Typography>
            <Button 
              variant="contained" 
              color="secondary" 
              size="large"
              component={Link}
              to="/admission"
              endIcon={<ArrowForwardIcon />}
              sx={{ 
                px: 6, 
                py: 2.5,
                fontSize: '1.2rem',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: '0 8px 24px rgba(233, 30, 99, 0.4)',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 12px 32px rgba(233, 30, 99, 0.6)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Get Started Today
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
