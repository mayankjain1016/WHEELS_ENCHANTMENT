import { 
  AppBar, Toolbar, Button, Box, IconButton, Drawer, 
  List, ListItem, ListItemButton, ListItemText, 
  useMediaQuery, useTheme, alpha, Container 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/logo.jpeg';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Premium scroll behavior: hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 50);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'About Us', path: '/about' },
    { label: 'Admission', path: '/admission' },
  ];

  const luxuryEasing = 'cubic-bezier(0.4, 0, 0.2, 1)';

  return (
    <AppBar 
      position="fixed" 
      elevation={isScrolled ? 4 : 0}
      sx={{ 
        bgcolor: isScrolled ? alpha('#ffffff', 0.95) : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        color: isScrolled ? 'primary.main' : '#ffffff',
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: `all 0.4s ${luxuryEasing}`,
        borderBottom: isScrolled ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none',
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: { xs: 70, md: 90 } }}>
          
          {/* LOGO SECTION */}
          <Box 
            component={Link} 
            to="/" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.05)' }
            }}
          >
            <img 
              src={logo} 
              alt="Wheels Enchantment" 
              style={{ 
                height: isMobile ? '45px' : '55px', 
                borderRadius: '50%',
                boxShadow: isScrolled ? 'none' : `0 0 20px ${alpha('#000', 0.2)}`
              }} 
            />
          </Box>

          {/* DESKTOP MENU */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 4 }}>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: 'secondary.main',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      position: 'relative',
                      px: 1,
                      minWidth: 'auto',
                      transition: `all 0.3s ${luxuryEasing}`,
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: isActive ? '100%' : '0%',
                        height: '2px',
                        bottom: 6,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        bgcolor: 'secondary.main',
                        transition: `width 0.3s ${luxuryEasing}`,
                      },
                      '&:hover': {
                        bgcolor: 'transparent',
                        color: (location.pathname === '/gallery' || location.pathname === '/admission')
                          ? '#000000'
                          : (isScrolled ? 'primary.main' : '#ffffff'),
                        transform: 'translateY(-2px)',
                        '&::after': { width: '100%' }
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Box>
          )}

          {/* RIGHT ACTION / MOBILE TOGGLE */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isMobile && (
              <IconButton 
                onClick={() => setDrawerOpen(true)} 
                sx={{ color: isScrolled ? 'primary.main' : '#ffffff' }}
              >
                <MenuIcon fontSize="large" />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* MOBILE DRAWER - Boutique Style */}
      <Drawer 
        anchor="right" 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { 
            width: '100%', 
            maxWidth: 350, 
            bgcolor: 'primary.dark', 
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column'
          }
        }}
      >
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: '#ffffff' }}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>

        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 4 }}>
          <List sx={{ width: '100%' }}>
            {menuItems.map((item) => (
              <ListItem key={item.path} disablePadding sx={{ mb: 3 }}>
                <ListItemButton 
                  component={Link} 
                  to={item.path} 
                  onClick={() => setDrawerOpen(false)}
                  sx={{ 
                    textAlign: 'center',
                    borderBottom: location.pathname === item.path ? '1px solid white' : 'none'
                  }}
                >
                  <ListItemText 
                    primary={item.label} 
                    primaryTypographyProps={{ 
                      fontSize: '1.8rem', 
                      fontWeight: 300, 
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase'
                    }} 
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;