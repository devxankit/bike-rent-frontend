import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Checkbox, FormControlLabel, Snackbar, Alert, IconButton, Avatar, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions, Popover } from '@mui/material';
import Navbar from '../components/Navbar';
import api, { getApiUrl } from '../utils/api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useLocation } from 'react-router-dom';

const initialForm = {
  name: '',
  image: '',
  price: '',
  location: '',
  features: '',
  fuelType: '',
  seat: '',
  trips: '',
  payAtPickup: false,
  ownerPhone: '',
};

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [bikes, setBikes] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [editId, setEditId] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [tab, setTab] = useState(0);
  const [bookingDialog, setBookingDialog] = useState({ open: false, bike: null });
  const [bookingFrom, setBookingFrom] = useState(null);
  const [bookingTo, setBookingTo] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, bikeId: null, anchorEl: null });
  const [bikeFormOpen, setBikeFormOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(getApiUrl('/api/admin/dashboard'), {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) setData(res);
        else setError(res.message || 'Unauthorized');
      })
      .catch(() => setError('Failed to fetch dashboard'));
    fetchBikes();
    fetchUsers();
  }, []);

  const fetchBikes = async () => {
    try {
      const res = await api.get('/api/bikes');
      setBikes(res.data);
    } catch {
      setSnackbar({ open: true, message: 'Failed to fetch bikes', severity: 'error' });
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get('/api/admin/users');
      setUsers(res.data);
    } catch {
      // ignore for now
    }
  };

  const handleChange = e => {
    const { name, value, type, checked, files } = e.target;
    if (name === 'image' && files && files[0]) {
      setForm(f => ({ ...f, image: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else if (type === 'checkbox') {
      setForm(f => ({ ...f, [name]: checked }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('location', form.location);
    formData.append('features', form.features);
    formData.append('fuelType', form.fuelType);
    formData.append('seat', form.seat);
    formData.append('trips', form.trips);
    formData.append('payAtPickup', form.payAtPickup);
    formData.append('ownerPhone', form.ownerPhone);
    if (form.image && form.image instanceof File) {
      formData.append('image', form.image);
    } else if (editId && typeof form.image === 'string') {
      formData.append('image', form.image);
    }
    try {
      if (editId) {
        await api.put(`/api/bikes/${editId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSnackbar({ open: true, message: 'Bike updated!', severity: 'success' });
      } else {
        await api.post('/api/bikes', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSnackbar({ open: true, message: 'Bike added!', severity: 'success' });
      }
      setForm(initialForm);
      setEditId(null);
      setImagePreview('');
      fetchBikes();
    } catch {
      setSnackbar({ open: true, message: 'Failed to save bike', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = bike => {
    setEditId(bike._id);
    setForm({
      name: bike.name || '',
      image: bike.image || '',
      price: bike.price || '',
      location: bike.location || '',
      features: bike.features ? bike.features.join(', ') : '',
      fuelType: bike.fuelType || '',
      seat: bike.seat || '',
      trips: bike.trips || '',
      payAtPickup: !!bike.payAtPickup,
      ownerPhone: bike.ownerPhone || '',
    });
    setImagePreview(bike.image || '');
  };

  const handleDelete = (id, event) => {
    setDeleteDialog({ open: true, bikeId: id, anchorEl: event.currentTarget });
  };

  const confirmDelete = async () => {
    setSnackbar({ open: true, message: 'Deleting bike...', severity: 'info' });
    try {
      await api.delete(`/api/bikes/${deleteDialog.bikeId}`);
      setSnackbar({ open: true, message: 'Bike deleted!', severity: 'success' });
      fetchBikes();
    } catch {
      setSnackbar({ open: true, message: 'Failed to delete bike', severity: 'error' });
    } finally {
      setDeleteDialog({ open: false, bikeId: null, anchorEl: null });
    }
  };

  const cancelDelete = () => {
    setDeleteDialog({ open: false, bikeId: null, anchorEl: null });
  };

  // Booking status dialog logic
  const openBookingDialog = (bike) => {
    setBookingDialog({ open: true, bike });
    setBookingFrom(bike.bookingPeriod?.from ? dayjs(bike.bookingPeriod.from) : null);
    setBookingTo(bike.bookingPeriod?.to ? dayjs(bike.bookingPeriod.to) : null);
  };
  const closeBookingDialog = () => {
    setBookingDialog({ open: false, bike: null });
    setBookingFrom(null);
    setBookingTo(null);
  };
  const handleBookingUpdate = async () => {
    if (!bookingDialog.bike) return;
    try {
      await api.patch(`/api/bikes/${bookingDialog.bike._id}/booking`, {
        isBooked: !!(bookingFrom && bookingTo),
        bookingPeriod: bookingFrom && bookingTo ? { from: bookingFrom, to: bookingTo } : { from: null, to: null },
        bookedDays: bookingFrom && bookingTo ? dayjs(bookingTo).diff(dayjs(bookingFrom), 'day') + 1 : 0,
      });
      setSnackbar({ open: true, message: 'Booking status updated!', severity: 'success' });
      fetchBikes();
      closeBookingDialog();
    } catch {
      setSnackbar({ open: true, message: 'Failed to update booking status', severity: 'error' });
    }
  };

  // Show only 3-4 recent bikes, sorted by created date descending (newest first)
  const sortedBikes = [...bikes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Newest bikes first
  const recentBikes = sortedBikes.slice(0, 3);
  const navigate = useNavigate();
  const location = useLocation();

  // Filtering logic for All Bikes section
  const filteredBikes = sortedBikes.filter(bike => {
    if (tab === 1) return bike.isBooked;
    if (tab === 2) return !bike.isBooked;
    return true;
  });

  // Sidebar navigation items
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

  // Real stats
  const activeBookings = bikes.filter(b => b.isBooked).length;
  const totalBikes = bikes.length;
  const totalCustomers = users.length;
  const stats = [
    { label: 'Active Bookings', value: activeBookings, icon: <CalendarTodayIcon color="success" /> },
    { label: 'Total Bikes', value: totalBikes, icon: <DirectionsBikeIcon color="primary" /> },
    { label: 'Total Customers', value: totalCustomers, icon: <PeopleIcon color="warning" /> },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f7f9fb' }}>
      {/* Navbar at the very top, full width */}
      <Navbar />
      <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 56px)' }}>
        {/* Sidebar below Navbar */}
        <Box sx={{ width: 240, bgcolor: '#111827', color: '#fff', display: { xs: 'none', md: 'flex' }, flexDirection: 'column', py: 2, minHeight: '100%', position: 'relative' }}>
          <Box sx={{ px: 2, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ letterSpacing: 1, fontSize: 16 }}>BikeRental</Typography>
            <Typography variant="caption" color="#bdbdbd" sx={{ fontSize: 12 }}>Pro Dashboard</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            {navItems.map((item, idx) => {
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
                    borderLeft: isActive ? '3px solid #2563eb' : '3px solid transparent',
                    bgcolor: 'transparent',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#2563eb' : '#fff',
                    mb: 0.5
                  }}
                  onClick={() => {
                    if (item.label === 'Bookings') navigate('/admin/bikes?tab=1');
                    else if (item.label === 'Bikes') navigate('/admin/bikes');
                    else if (item.label === 'Dashboard') navigate('/admin/dashboard');
                    else if (item.label === 'Customers') navigate('/admin/customers');
                    else if (item.label === 'Analytics') navigate('/admin/analytics');
                  }}
                >
                  <span style={{ fontSize: 18, display: 'flex', alignItems: 'center', color: isActive ? '#2563eb' : '#fff' }}>{item.icon}</span>
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
            {/* Welcome Section */}
            <Box sx={{ bgcolor: '#2563eb', color: '#fff', borderRadius: 2, p: 2, mb: 2 }}>
              <Typography variant="h5" fontWeight={700} sx={{ fontSize: 26 }}>Welcome back, Admin!</Typography>
              <Typography variant="body2" mt={0.5} sx={{ fontSize: 15 }}>Here's what's happening with your bike rental business today.</Typography>
            </Box>
            {/* Stats Cards */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 1.5, mb: 2 }}>
              {stats.map(stat => (
                <Box key={stat.label} sx={{ bgcolor: '#fff', borderRadius: 1.5, p: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight: 70 }}>
                  <Box sx={{ mb: 0.5, fontSize: 20 }}>{stat.icon}</Box>
                  <Typography variant="h6" fontWeight={700} sx={{ fontSize: 18 }}>{stat.value}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: 13 }}>{stat.label}</Typography>
                </Box>
              ))}
            </Box>
            {/* Main Grid: Recent Bikes & Quick Actions */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 2 }}>
              {/* Recent Bikes */}
              <Box sx={{ bgcolor: '#fff', borderRadius: 1.5, p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                  <Typography variant="subtitle1" fontWeight={700} sx={{ fontSize: 17 }}>Recent Bikes</Typography>
                  <Button variant="text" onClick={() => navigate('/admin/bikes')} sx={{ textTransform: 'none', fontWeight: 500, fontSize: 14 }}>View All</Button>
                </Box>
                {recentBikes.length === 0 ? (
                  <Typography sx={{ fontSize: 14 }}>No bikes found.</Typography>
                ) : (
                  recentBikes.map(bike => (
                    <Box key={bike._id} sx={{ display: 'flex', alignItems: 'center', mb: 1.2, p: 0.5, borderBottom: '1px solid #eee' }}>
                      <img src={bike.image} alt={bike.name} style={{ width: 38, height: 26, objectFit: 'cover', borderRadius: 3, marginRight: 10 }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography fontWeight={600} sx={{ fontSize: 15 }}>{bike.name}</Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: 12, display: 'block' }}>{dayjs(bike.createdAt).format('DD MMM YYYY')}</Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: 13 }}>₹{bike.price} | {bike.location}</Typography>
                        {bike.isBooked ? (
                          <Typography variant="caption" color="error" sx={{ fontSize: 12 }}>Booked</Typography>
                        ) : (
                          <Typography variant="caption" color="success.main" sx={{ fontSize: 12 }}>Available</Typography>
                        )}
                      </Box>
                    </Box>
                  ))
                )}
              </Box>
              {/* Quick Actions */}
              <Box sx={{ bgcolor: '#fff', borderRadius: 1.5, p: 2, display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                <Typography variant="subtitle1" fontWeight={700} mb={1} sx={{ fontSize: 16 }}>Quick Actions</Typography>
                <Button variant="contained" sx={{ bgcolor: '#2563eb', color: '#fff', fontWeight: 600, mb: 0.5, fontSize: 14, py: 1 }} onClick={() => { setBikeFormOpen(true); setEditId(null); setForm(initialForm); setImagePreview(''); }}>
                  Add New Bike
                </Button>
                <Button variant="contained" sx={{ bgcolor: '#22c55e', color: '#fff', fontWeight: 600, mb: 0.5, fontSize: 14, py: 1 }} onClick={() => navigate('/admin/bikes?tab=1')}>
                  View Bookings
                </Button>
                <Button variant="contained" sx={{ bgcolor: '#a21caf', color: '#fff', fontWeight: 600, fontSize: 14, py: 1 }} onClick={async () => { await fetchBikes(); await fetchUsers(); setSnackbar({ open: true, message: 'Dashboard data refreshed!', severity: 'success' }); }}>
                  Refresh Dashboard Data
                </Button>
              </Box>
            </Box>
          </Box>
          {/* Add Bike Modal */}
          <Dialog open={bikeFormOpen} onClose={() => setBikeFormOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontSize: 15, py: 0.7, position: 'relative', pr: 4 }}>
              {editId ? 'Edit Bike' : 'Add New Bike'}
              {/* Cross/Close Button */}
              <IconButton
                aria-label="close"
                onClick={() => setBikeFormOpen(false)}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
                size="small"
              >
                <span style={{ fontSize: 22, fontWeight: 'bold', lineHeight: 1 }}>&times;</span>
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 1 }}>
              <form onSubmit={handleSubmit} style={{ width: '100%' }} encType="multipart/form-data">
                {/* Bike Details Section */}
                <Typography variant="subtitle2" mt={0.2} mb={0.2} sx={{ fontWeight: 600, fontSize: 12 }}>Bike Details</Typography>
                <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={0.5} mb={0.7}>
                  <TextField label="Name" name="name" value={form.name} onChange={handleChange} required helperText="Enter bike name" size="small" sx={{ fontSize: 12 }} InputProps={{ style: { fontSize: 12 } }} InputLabelProps={{ style: { fontSize: 12 } }} FormHelperTextProps={{ style: { fontSize: 11 } }} />
                  <TextField label="Location" name="location" value={form.location} onChange={handleChange} helperText="City or area" size="small" sx={{ fontSize: 12 }} InputProps={{ style: { fontSize: 12 } }} InputLabelProps={{ style: { fontSize: 12 } }} FormHelperTextProps={{ style: { fontSize: 11 } }} />
                  <TextField label="Features (comma separated)" name="features" value={form.features} onChange={handleChange} helperText="e.g. ABS, Disc Brakes" size="small" sx={{ fontSize: 12 }} InputProps={{ style: { fontSize: 12 } }} InputLabelProps={{ style: { fontSize: 12 } }} FormHelperTextProps={{ style: { fontSize: 11 } }} />
                  <TextField label="Fuel Type" name="fuelType" value={form.fuelType} onChange={handleChange} helperText="e.g. Petrol, Electric" size="small" sx={{ fontSize: 12 }} InputProps={{ style: { fontSize: 12 } }} InputLabelProps={{ style: { fontSize: 12 } }} FormHelperTextProps={{ style: { fontSize: 11 } }} />
                  <TextField label="Seats" name="seat" value={form.seat} onChange={handleChange} type="number" helperText="Number of seats" size="small" sx={{ fontSize: 12 }} InputProps={{ style: { fontSize: 12 } }} InputLabelProps={{ style: { fontSize: 12 } }} FormHelperTextProps={{ style: { fontSize: 11 } }} />
                  <TextField label="Trips" name="trips" value={form.trips} onChange={handleChange} type="number" helperText="Number of trips" size="small" sx={{ fontSize: 12 }} InputProps={{ style: { fontSize: 12 } }} InputLabelProps={{ style: { fontSize: 12 } }} FormHelperTextProps={{ style: { fontSize: 11 } }} />
                  <Box display="flex" alignItems="center" gap={0.5} gridColumn={{ xs: '1', sm: '1 / span 2' }}>
                    <Button variant="outlined" component="label" size="small" sx={{ fontSize: 11, py: 0.1, px: 0.7, minWidth: 0, height: 26 }}>
                      {form.image && form.image instanceof File ? 'Change Image' : 'Upload Image'}
                      <input type="file" name="image" accept="image/*" hidden onChange={handleChange} />
                    </Button>
                    {imagePreview && (
                      <Avatar src={imagePreview} alt="Preview" sx={{ width: 26, height: 26 }} />
                    )}
                  </Box>
                </Box>
                {/* Owner Details Section */}
                <Typography variant="subtitle2" mt={0.2} mb={0.2} sx={{ fontWeight: 600, fontSize: 12 }}>Owner Details</Typography>
                <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={0.5} mb={0.7}>
                  <TextField label="Owner Phone Number" name="ownerPhone" value={form.ownerPhone} onChange={handleChange} required helperText="Enter valid phone number" size="small" sx={{ fontSize: 12 }} InputProps={{ style: { fontSize: 12 } }} InputLabelProps={{ style: { fontSize: 12 } }} FormHelperTextProps={{ style: { fontSize: 11 } }} />
                </Box>
                {/* Rental Details Section */}
                <Typography variant="subtitle2" mt={0.2} mb={0.2} sx={{ fontWeight: 600, fontSize: 12 }}>Rental Details</Typography>
                <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={0.5} mb={0.7}>
                  <TextField label="Price per day" name="price" value={form.price} onChange={handleChange} required type="number" helperText="Rental price per day" size="small" sx={{ fontSize: 12 }} InputProps={{ style: { fontSize: 12 } }} InputLabelProps={{ style: { fontSize: 12 } }} FormHelperTextProps={{ style: { fontSize: 11 } }} />
                  <FormControlLabel control={<Checkbox checked={form.payAtPickup} onChange={handleChange} name="payAtPickup" size="small" sx={{ p: 0.2 }} />} label={<span style={{ fontSize: 11 }}>Pay at Pickup</span>} sx={{ ml: 0 }} />
                </Box>
                <Box display="flex" gap={0.5} mt={1}>
                  <Button type="submit" variant="contained" color="primary" disabled={loading} size="small" sx={{ minWidth: 70, fontSize: 12, py: 0.2, height: 28 }}>
                    {editId ? 'Update' : 'Add'}
                  </Button>
                  {editId && <Button onClick={() => { setEditId(null); setForm(initialForm); setImagePreview(''); }} size="small" sx={{ fontSize: 12, py: 0.2, height: 28 }}>Cancel</Button>}
                </Box>
              </form>
            </DialogContent>
          </Dialog>
          {/* Booking Status Dialog, Snackbar, Popover (unchanged) */}
          <Dialog open={bookingDialog.open} onClose={closeBookingDialog}>
            <DialogTitle>Update Booking Status</DialogTitle>
            <DialogContent>
              <Box display="flex" flexDirection="column" gap={2}>
                <Typography fontWeight={600}>{bookingDialog.bike?.name}</Typography>
                <DatePicker
                  label="From"
                  value={bookingFrom}
                  onChange={setBookingFrom}
                  sx={{ width: '100%' }}
                />
                <DatePicker
                  label="To"
                  value={bookingTo}
                  onChange={setBookingTo}
                  sx={{ width: '100%' }}
                />
                {bookingFrom && bookingTo && (
                  <Typography variant="body2">
                    Booking for {dayjs(bookingTo).diff(dayjs(bookingFrom), 'day') + 1} days
                  </Typography>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeBookingDialog}>Cancel</Button>
              <Button onClick={handleBookingUpdate} variant="contained" color="primary">
                {bookingFrom && bookingTo ? 'Book' : 'Mark as Available'}
              </Button>
            </DialogActions>
          </Dialog>
          <Popover
            open={deleteDialog.open}
            anchorEl={deleteDialog.anchorEl}
            onClose={cancelDelete}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{ sx: { p: 2, minWidth: 200 } }}
          >
            <Typography variant="subtitle1" mb={1}>Confirm Delete</Typography>
            <Typography variant="body2" mb={2}>Are you sure you want to delete this bike?</Typography>
            <Box display="flex" justifyContent="flex-end" gap={1}>
              <Button onClick={cancelDelete} size="small">Cancel</Button>
              <Button onClick={confirmDelete} color="error" variant="contained" size="small">Delete</Button>
            </Box>
          </Popover>
          <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>
            <Alert onClose={() => setSnackbar(s => ({ ...s, open: false }))} severity={snackbar.severity} sx={{ width: '100%' }}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Box>
  );
} 