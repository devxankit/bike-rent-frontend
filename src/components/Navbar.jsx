import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const SKY_BLUE = '#12B6FA';
const NAVY_BLUE = '#1B314D';

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload(); // To update Navbar state
  };

  const drawerContent = (
    <Box sx={{ width: 250, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }} role="presentation" onClick={() => setDrawerOpen(false)}>
      <Typography
        variant="h6"
        sx={{ color: NAVY_BLUE, fontWeight: 700, letterSpacing: 1, mb: 2, cursor: 'pointer', textAlign: 'left', width: '100%' }}
        onClick={() => navigate('/')}
      >
        bike rent
      </Typography>
      <Button
        startIcon={<PhoneIcon />}
        variant="contained"
        sx={{
          bgcolor: SKY_BLUE,
          color: 'white',
          minWidth: 0,
          px: 1,
          py: 0.5,
          fontSize: 13,
          height: 28,
          boxShadow: 1,
          borderRadius: 2,
          '&:hover': { bgcolor: '#0eaee6' },
          mb: 1,
          fontWeight: 400,
          alignSelf: 'flex-start'
        }}
      >
        +91 979875 74681
      </Button>
      <Button fullWidth sx={{ color: NAVY_BLUE, textTransform: 'none', fontWeight: 500, fontSize: 16, mb: 1, justifyContent: 'flex-start' }} onClick={() => navigate('/bikes')}>Bikes</Button>
      <Button fullWidth sx={{ color: NAVY_BLUE, textTransform: 'none', fontWeight: 500, fontSize: 16, mb: 1, justifyContent: 'flex-start' }} onClick={() => navigate('/')}>Home</Button>
      <Button fullWidth sx={{ color: NAVY_BLUE, textTransform: 'none', fontWeight: 500, fontSize: 16, mb: 1, justifyContent: 'flex-start' }} onClick={() => navigate('/contact')}>Contact Us</Button>
      {user && user.isAdmin && (
        <Button fullWidth sx={{ color: NAVY_BLUE, textTransform: 'none', fontWeight: 500, fontSize: 16, mb: 1, justifyContent: 'flex-start' }} onClick={() => navigate('/admin/dashboard')}>Dashboard</Button>
      )}
      {user ? (
        <Button fullWidth sx={{ color: NAVY_BLUE, textTransform: 'none', fontWeight: 500, fontSize: 16, mb: 1, justifyContent: 'flex-start' }} onClick={handleLogout}>Logout</Button>
      ) : (
        <Button fullWidth sx={{ color: NAVY_BLUE, textTransform: 'none', fontWeight: 500, fontSize: 16, justifyContent: 'flex-start' }} onClick={() => navigate('/login')}>Login / Register</Button>
      )}
    </Box>
  );

  return (
    <Box
      sx={{
        position: 'relative',
        zIndex: 2,
        px: { xs: 1, sm: 3 },
        py: { xs: 1, sm: 1.5 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: NAVY_BLUE,
        boxShadow: 3,
        minHeight: { xs: 56, sm: 72 },
      }}
    >
      {/* Left: Hamburger, Logo/Name, Home */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{ color: '#fff', fontWeight: 700, letterSpacing: 1, ml: 1, cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              bike rent
            </Typography>
            {/* Home button removed on mobile */}
          </>
        ) : (
          <>
            <Box
              component="img"
              src="/images/logo.png"
              alt="Bike Rent Logo"
              sx={{ height: { xs: 32, sm: 40 }, width: 'auto', mr: 1, cursor: 'pointer' }}
              onClick={() => navigate('/')}
            />
            <Typography
              variant="h5"
              sx={{ color: '#fff', fontWeight: 700, letterSpacing: 1, mr: 2, cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              bike rent
            </Typography>
            <Button
              startIcon={<PhoneIcon />}
              variant="contained"
              sx={{
                bgcolor: SKY_BLUE,
                color: 'white',
                minWidth: 0,
                px: { xs: 0.5, sm: 1 },
                py: 0.2,
                fontSize: { xs: 10, sm: 13 },
                height: 28,
                boxShadow: 1,
                borderRadius: 2,
                '&:hover': { bgcolor: '#0eaee6' },
                mr: 1,
                fontWeight: 400
              }}
            >
              +91 979875 74681
            </Button>
            <Button
              sx={{ color: 'white', textTransform: 'none', fontWeight: 500, fontSize: { xs: 12, sm: 16 }, mr: 1 }}
              onClick={() => navigate('/bikes')}
            >
              Bikes
            </Button>
            <Button
              sx={{ color: 'white', textTransform: 'none', fontWeight: 500, fontSize: { xs: 12, sm: 16 }, mr: 1 }}
              onClick={() => navigate('/')}
            >
              Home
            </Button>
            <Button
              sx={{ color: 'white', textTransform: 'none', fontWeight: 500, fontSize: { xs: 12, sm: 16 }, mr: 1 }}
              onClick={() => navigate('/contact')}
            >
              Contact Us
            </Button>
          </>
        )}
      </Box>
      {/* Center: Empty space for alignment */}
      <Box sx={{ flexGrow: 1 }} />
      {/* Right: Login/Register and Location Button or Drawer */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
        {isMobile ? (
          <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            {drawerContent}
          </Drawer>
        ) : (
          <>
            {user && user.isAdmin && (
              <Button
                sx={{ color: 'white', textTransform: 'none', fontWeight: 500, fontSize: { xs: 12, sm: 16 }, mr: 1 }}
                onClick={() => navigate('/admin/dashboard')}
              >
                Dashboard
              </Button>
            )}
            {user ? (
              <Button
                sx={{ color: 'white', textTransform: 'none', fontWeight: 500, fontSize: { xs: 12, sm: 16 }, mr: 1 }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Button
                sx={{ color: 'white', textTransform: 'none', fontWeight: 500, fontSize: { xs: 12, sm: 16 }, mr: 1 }}
                onClick={() => navigate('/login')}
              >
                Login / Register
              </Button>
            )}
          </>
        )}
        <Button
          startIcon={<LocationOnIcon />}
          variant="contained"
          sx={{
            bgcolor: SKY_BLUE,
            color: 'white',
            fontWeight: 600,
            px: { xs: 1, sm: 1.5 },
            py: 0.5,
            fontSize: { xs: 11, sm: 14 },
            height: 36,
            borderRadius: 2,
            boxShadow: 1,
            '&:hover': { bgcolor: '#0eaee6' }
          }}
        >
          Indore
        </Button>
      </Box>
    </Box>
  );
}