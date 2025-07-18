import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material';
import Navbar from '../components/Navbar';
import api from '../utils/api';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardNavbar from '../components/DashboardNabvar';
import { useTheme, useMediaQuery } from '@mui/material';

export default function Customers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    api.get('/api/admin/users')
      .then(res => setUsers(res.data))
      .catch(() => setError('Failed to fetch users'))
      .finally(() => setLoading(false));
  }, []);

  const navItems = [
    { label: 'Dashboard', icon: <MenuIcon />, path: '/admin/dashboard' },
    { label: 'Bikes', icon: <DirectionsBikeIcon />, path: '/admin/bikes' },
    { label: 'Bookings', icon: <CalendarTodayIcon />, path: '/admin/bikes?tab=1' },
    { label: 'Customers', icon: <PeopleIcon />, path: '/admin/customers' },
    { label: 'Analytics', icon: <BarChartIcon />, path: '/admin/analytics' },
  ];
  const bottomNavItems = [
    { label: 'Settings', icon: <SettingsIcon /> },
    { label: 'Help & Support', icon: <HelpOutlineIcon /> },
    { label: 'Logout', icon: <LogoutIcon /> },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f7f9fb' }}>
      <DashboardNavbar/>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: 'calc(100vh - 64px)' }}>
        {/* Sidebar below Navbar */}
        <Box sx={{ width: 240, bgcolor: '#111827', color: '#fff', display: { xs: 'none', md: 'flex' }, flexDirection: 'column', py: 2, minHeight: '100%', position: 'relative' }}>
          <Box sx={{ px: 2, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ letterSpacing: 1, fontSize: 16 }}>BikeRental</Typography>
            <Typography variant="caption" color="#bdbdbd" sx={{ fontSize: 12 }}>Pro Dashboard</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            {navItems.map((item) => {
              let isActive = false;
              if (item.label === 'Bookings') {
                isActive = location.pathname === '/admin/bikes' && new URLSearchParams(location.search).get('tab') === '1';
              } else if (item.label === 'Bikes') {
                isActive = location.pathname === '/admin/bikes' && (!new URLSearchParams(location.search).get('tab') || new URLSearchParams(location.search).get('tab') === '0');
              } else if (item.label === 'Dashboard') {
                isActive = location.pathname === '/admin/dashboard';
              } else if (item.label === 'Customers') {
                isActive = location.pathname === '/admin/customers';
              } else if (item.label === 'Analytics') {
                isActive = location.pathname === '/admin/analytics';
              }
              return (
                <Box
                  key={item.label}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    px: 1.5,
                    py: 0.7,
                    cursor: item.path ? 'pointer' : 'default',
                    borderLeft: isActive ? '3px solid #facc15' : '3px solid transparent',
                    bgcolor: 'transparent',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#facc15' : '#fff',
                    mb: 0.5
                  }}
                  onClick={() => {
                    if (item.path) navigate(item.path);
                  }}
                >
                  <span style={{ fontSize: 18, display: 'flex', alignItems: 'center', color: isActive ? '#facc15' : '#fff' }}>{item.icon}</span>
                  <Typography sx={{ ml: 1, fontWeight: isActive ? 700 : 500, fontSize: 13 }}>{item.label}</Typography>
                </Box>
              );
            })}
          </Box>
          <Box>
            {bottomNavItems.map(item => (
              <Box
                key={item.label}
                sx={{ display: 'flex', alignItems: 'center', px: 1.5, py: 0.7, cursor: 'pointer', color: '#bdbdbd', borderRadius: 2, mb: 0.5 }}
                onClick={() => {
                  if (item.label === 'Logout') {
                    localStorage.removeItem('token');
                    navigate('/login');
                  }
                }}
              >
                <span style={{ fontSize: 16, display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                <Typography sx={{ ml: 1, fontSize: 12 }}>{item.label}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        {/* Main Content */}
        <Box sx={{ flex: 1, pl: { md: 0 }, pr: 0 }}>
          <Box sx={{ maxWidth: 950, mx: 'auto', mt: 2, px: 1 }}>
            <Typography variant="h5" fontWeight={700} mb={2}>All Customers</Typography>
            <Paper sx={{ p: 2, overflowX: 'auto' }}>
              {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                  <CircularProgress />
                </Box>
              ) : error ? (
                <Typography color="error">{error}</Typography>
              ) : (
                isMobile ? (
                  <Box>
                    {users.map(user => (
                      <Paper key={user._id} sx={{ mb: 2, p: 2, boxShadow: 1 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography fontWeight={700}>{user.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                          </Typography>
                        </Box>
                        <Box mt={0.5} display="flex" flexDirection="column" gap={0.5}>
                          <Typography variant="body2" color="text.secondary" noWrap>Email: {user.email}</Typography>
                          <Typography variant="body2" color="text.secondary">Phone: {user.phone || '-'}</Typography>
                        </Box>
                      </Paper>
                    ))}
                  </Box>
                ) : (
                  <TableContainer sx={{ minWidth: 400 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Phone</TableCell>
                          <TableCell>Registered</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users.map(user => (
                          <TableRow key={user._id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone || '-'}</TableCell>
                            <TableCell>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )
              )}
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
} 