import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import ArticleIcon from '@mui/icons-material/Article';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ExploreIcon from '@mui/icons-material/Explore';
import { FaTaxi } from 'react-icons/fa';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  // Navigation items
  const navItems = [
    { label: 'Dashboard', icon: <MenuIcon />, path: '/admin/dashboard' },
    { label: 'Bikes', icon: <DirectionsBikeIcon />, path: '/admin/bikes' },
    { label: 'Bookings', icon: <CalendarTodayIcon />, path: '/admin/bikes?tab=1' },
    { label: 'Taxis', icon: <DirectionsCarIcon />, path: '/admin/taxis' },
    { label: 'Tours', icon: <ExploreIcon />, path: '/admin/tours' },
    { label: 'Customers', icon: <PeopleIcon />, path: '/admin/customers' },
    { label: 'City Pages', icon: <LocationCityIcon />, path: '/admin/city-pages' },
    { label: 'Taxi Cities', icon: <FaTaxi />, path: '/admin/taxi-cities' },
    { label: 'Blogs', icon: <ArticleIcon />, path: '/admin/blogs' },
    { label: 'Analytics', icon: <BarChartIcon />, path: '/admin/analytics' },
  ];

  const bottomNavItems = [
    { label: 'Settings', icon: <SettingsIcon /> },
    { label: 'Help & Support', icon: <HelpOutlineIcon /> },
    { label: 'Logout', icon: <LogoutIcon /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  };

  const handleNavigation = (item) => {
    if (item.label === 'Logout') {
      handleLogout();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const isActive = (item) => {
    if (item.label === 'Bookings') {
      return location.pathname === '/admin/bikes' && new URLSearchParams(location.search).get('tab') === '1';
    } else if (item.label === 'Bikes') {
      return location.pathname === '/admin/bikes' && (!new URLSearchParams(location.search).get('tab') || new URLSearchParams(location.search).get('tab') === '0');
    } else if (item.label === 'Taxis') {
      return location.pathname === '/admin/taxis' && (!new URLSearchParams(location.search).get('tab') || new URLSearchParams(location.search).get('tab') === '0');
    } else if (item.label === 'Tours') {
      return location.pathname === '/admin/tours';
    } else if (item.path) {
      return location.pathname === item.path;
    }
    return false;
  };

  return (
    <Box sx={{ 
      width: 240, 
      bgcolor: '#111827', 
      color: '#fff', 
      display: { xs: 'none', md: 'flex' }, 
      flexDirection: 'column', 
      py: 2, 
      minHeight: '100%', 
      position: 'relative' 
    }}>
      {/* Header */}
      <Box sx={{ px: 2, mb: 2 }}>
        <Typography variant="subtitle1" fontWeight={700} sx={{ letterSpacing: 1, fontSize: 16 }}>
          BikeRental
        </Typography>
        <Typography variant="caption" color="#bdbdbd" sx={{ fontSize: 12 }}>
          Pro Dashboard
        </Typography>
      </Box>

      {/* Navigation Items */}
      <Box sx={{ flex: 1 }}>
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <Box
              key={item.label}
              sx={{
                display: 'flex',
                alignItems: 'center',
                px: 2,
                py: 1.5,
                mx: 1,
                borderRadius: 1,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: active ? '#374151' : 'transparent',
                '&:hover': {
                  backgroundColor: active ? '#374151' : '#1f2937',
                },
                borderLeft: active ? '3px solid #3b82f6' : '3px solid transparent',
              }}
              onClick={() => handleNavigation(item)}
            >
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mr: 2,
                color: active ? '#3b82f6' : '#9ca3af',
                fontSize: '20px'
              }}>
                {item.icon}
              </Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: active ? 600 : 400,
                  color: active ? '#fff' : '#d1d5db',
                  fontSize: '14px'
                }}
              >
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* Bottom Navigation Items */}
      <Box sx={{ borderTop: '1px solid #374151', pt: 1 }}>
        {bottomNavItems.map((item) => (
          <Box
            key={item.label}
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 2,
              py: 1.5,
              mx: 1,
              borderRadius: 1,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: '#1f2937',
              },
            }}
            onClick={() => handleNavigation(item)}
          >
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mr: 2,
              color: '#9ca3af',
              fontSize: '20px'
            }}>
              {item.icon}
            </Box>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 400,
                color: '#d1d5db',
                fontSize: '14px'
              }}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AdminSidebar;
