import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/logo.jpeg';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'About Us', path: '/about' },
    { label: 'Admission', path: '/admission' },
  ];

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'primary.main' }}>
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src={logo} alt="Wheels Enchantment" style={{ height: '50px' }} />
        </Box>

        {isMobile ? (
          <>
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: 'primary.main' }}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
              <List sx={{ width: 250 }}>
                {menuItems.map((item) => (
                  <ListItem key={item.path} disablePadding>
                    <ListItemButton component={Link} to={item.path} onClick={() => setDrawerOpen(false)} sx={{ bgcolor: location.pathname === item.path ? 'secondary.main' : 'transparent', color: location.pathname === item.path ? 'white' : 'primary.main' }}>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {menuItems.map((item) => (
              <Button key={item.path} component={Link} to={item.path} sx={{ color: location.pathname === item.path ? 'secondary.main' : 'primary.main', fontWeight: location.pathname === item.path ? 700 : 500, '&:hover': { color: 'secondary.main' } }}>
                {item.label}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
