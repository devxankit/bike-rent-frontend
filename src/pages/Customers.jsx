import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material';
import Navbar from '../components/Navbar';
import api from '../utils/api';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardNavbar from '../components/DashboardNabvar';
import AdminSidebar from '../components/AdminSidebar';
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


  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f7f9fb' }}>
      <DashboardNavbar/>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: 'calc(100vh - 64px)' }}>
        {/* Sidebar below Navbar */}
        <AdminSidebar />
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