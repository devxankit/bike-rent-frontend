import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import { Box, Typography, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useLocation } from 'react-router-dom';
// For charting, use recharts (or chart.js if preferred)
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import DashboardNavbar from '../components/DashboardNabvar';

const navItems = [
  { label: 'Dashboard', icon: <MenuIcon />, path: '/admin/dashboard' },
  { label: 'Bikes', icon: <DirectionsBikeIcon />, path: '/admin/bikes' },
  { label: 'Bookings', icon: <CalendarTodayIcon />, path: '/admin/bikes?tab=1' },
  { label: 'Customers', icon: <PeopleIcon />, path: '/admin/customers' },
  { label: 'Analytics', icon: <BarChartIcon />, path: '/admin/analytics' },
];
const bottomNavItems = [
  { label: 'Help & Support', icon: <HelpOutlineIcon /> },
  { label: 'Logout', icon: <LogoutIcon /> },
];

// Example data for charts
const bookingsData = [
  { month: 'Jan', bookings: 30 },
  { month: 'Feb', bookings: 45 },
  { month: 'Mar', bookings: 60 },
  { month: 'Apr', bookings: 50 },
  { month: 'May', bookings: 80 },
  { month: 'Jun', bookings: 65 },
];
const bikesPieData = [
  { name: 'Available', value: 24 },
  { name: 'Booked', value: 12 },
  { name: 'Maintenance', value: 4 },
];
const COLORS = ['#22c55e', '#FDB813', '#f59e42'];

export default function Analytics() {
  const navigate = useNavigate();
  const location = useLocation();
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const res = await api.get('/api/bikes');
        setBikes(res.data);
      } catch {
        setBikes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBikes();
  }, []);

  // Calculate bike status distribution
  const statusCounts = bikes.reduce((acc, bike) => {
    if (bike.isBooked) acc.Booked += 1;
    else acc.Available += 1;
    // If you have a maintenance field, add logic here
    return acc;
  }, { Available: 0, Booked: 0 });
  const bikesPieData = [
    { name: 'Available', value: statusCounts.Available },
    { name: 'Booked', value: statusCounts.Booked },
  ];

  // Calculate monthly bookings (by bookingPeriod.from month)
  const bookingsByMonth = {};
  bikes.forEach(bike => {
    if (bike.isBooked && bike.bookingPeriod && bike.bookingPeriod.from) {
      const date = new Date(bike.bookingPeriod.from);
      const month = date.toLocaleString('default', { month: 'short' });
      bookingsByMonth[month] = (bookingsByMonth[month] || 0) + 1;
    }
  });
  // Ensure all months are present (Jan-Dec)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const bookingsData = months.map(month => ({ month, bookings: bookingsByMonth[month] || 0 }));

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f7f9fb' }}>
      <DashboardNavbar/>
      <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 56px)' }}>
        {/* Sidebar */}
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
                    borderLeft: isActive ? '3px solid #FDB813' : '3px solid transparent',
                    bgcolor: 'transparent',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#FDB813' : '#fff',
                    mb: 0.5
                  }}
                  onClick={() => {
                    if (item.path) navigate(item.path);
                  }}
                >
                  <span style={{ fontSize: 18, display: 'flex', alignItems: 'center', color: isActive ? '#FDB813' : '#fff' }}>{item.icon}</span>
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
            <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>Analytics</Typography>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>Monthly Bookings</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={bookingsData}>
                  <XAxis dataKey="month" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#FDB813" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
            <Paper sx={{ p: 3 }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>Bike Status Distribution</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={bikesPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {bikesPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
} 