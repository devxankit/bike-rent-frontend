import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Checkbox, FormControlLabel, Snackbar, Alert, IconButton, Avatar, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions, Popover, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Navbar from '../components/Navbar';
import api, { getApiUrl } from '../utils/api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import PeopleIcon from '@mui/icons-material/People';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { FaTaxi } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardNavbar from '../components/DashboardNabvar';
import AdminSidebar from '../components/AdminSidebar';

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

const initialTaxiForm = {
  name: '',
  type: '',
  image: '',
  location: '',
  seatingCapacity: '',
  pricePerKm: '',
  pricePerTrip: '',
  rentalPricePerDay: '',
  acType: '',
  luggageCapacity: '',
  fuelType: '',
  features: '',
  ownerPhone: '',
  tripsCount: '',
  payAtPickup: false,
  additionalInformation: '',
};

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [bikes, setBikes] = useState([]);
  const [taxis, setTaxis] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [taxiForm, setTaxiForm] = useState(initialTaxiForm);
  const [cities, setCities] = useState([]);
  const [taxiCities, setTaxiCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [editId, setEditId] = useState(null);
  const [taxiEditId, setTaxiEditId] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [taxiImagePreview, setTaxiImagePreview] = useState('');
  const [tab, setTab] = useState(0);
  const [bookingDialog, setBookingDialog] = useState({ open: false, bike: null });
  const [bookingFrom, setBookingFrom] = useState(null);
  const [bookingTo, setBookingTo] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, bikeId: null, anchorEl: null });
  const [taxiDeleteDialog, setTaxiDeleteDialog] = useState({ open: false, taxiId: null, anchorEl: null });
  const [bikeFormOpen, setBikeFormOpen] = useState(false);
  const [taxiFormOpen, setTaxiFormOpen] = useState(false);

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
    fetchTaxis();
    fetchUsers();
    fetchCities();
    fetchTaxiCities();
  }, []);

  // Fetch dynamic cities from backend
  const fetchCities = async () => {
    try {
      const res = await api.get('/api/cities');
      setCities(res.data || []);
    } catch {
      setCities([]);
    }
  };

  const fetchTaxiCities = async () => {
    try {
      const res = await api.get('/api/taxi-cities');
      setTaxiCities(res.data || []);
    } catch {
      setTaxiCities([]);
    }
  };

  const fetchBikes = async () => {
    try {
      const res = await api.get('/api/bikes');
      setBikes(res.data);
    } catch {
      setSnackbar({ open: true, message: 'Failed to fetch bikes', severity: 'error' });
    }
  };

  const fetchTaxis = async () => {
    try {
      const res = await api.get('/api/taxis');
      setTaxis(res.data);
    } catch {
      setSnackbar({ open: true, message: 'Failed to fetch taxis', severity: 'error' });
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

  const handleTaxiChange = e => {
    const { name, value, type, checked, files } = e.target;
    if (name === 'image' && files && files[0]) {
      setTaxiForm(f => ({ ...f, image: files[0] }));
      setTaxiImagePreview(URL.createObjectURL(files[0]));
    } else if (type === 'checkbox') {
      setTaxiForm(f => ({ ...f, [name]: checked }));
    } else {
      setTaxiForm(f => ({ ...f, [name]: value }));
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

  const handleTaxiSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('name', taxiForm.name);
    formData.append('type', taxiForm.type);
    formData.append('location', taxiForm.location);
    formData.append('seatingCapacity', taxiForm.seatingCapacity);
    formData.append('pricePerKm', taxiForm.pricePerKm);
    formData.append('pricePerTrip', taxiForm.pricePerTrip);
    formData.append('rentalPricePerDay', taxiForm.rentalPricePerDay);
    formData.append('acType', taxiForm.acType);
    formData.append('luggageCapacity', taxiForm.luggageCapacity);
    formData.append('fuelType', taxiForm.fuelType);
    formData.append('features', taxiForm.features);
    formData.append('ownerPhone', taxiForm.ownerPhone);
    formData.append('tripsCount', taxiForm.tripsCount);
    formData.append('payAtPickup', taxiForm.payAtPickup);
    formData.append('additionalInformation', taxiForm.additionalInformation);
    if (taxiForm.image && taxiForm.image instanceof File) {
      formData.append('image', taxiForm.image);
    } else if (taxiEditId && typeof taxiForm.image === 'string') {
      formData.append('image', taxiForm.image);
    }
    try {
      if (taxiEditId) {
        await api.put(`/api/taxis/${taxiEditId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSnackbar({ open: true, message: 'Taxi updated!', severity: 'success' });
      } else {
        await api.post('/api/taxis', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSnackbar({ open: true, message: 'Taxi added!', severity: 'success' });
      }
      setTaxiForm(initialTaxiForm);
      setTaxiEditId(null);
      setTaxiImagePreview('');
      fetchTaxis();
    } catch {
      setSnackbar({ open: true, message: 'Failed to save taxi', severity: 'error' });
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

  const handleTaxiEdit = taxi => {
    setTaxiEditId(taxi._id);
    setTaxiForm({
      name: taxi.name || '',
      type: taxi.type || '',
      image: taxi.image || '',
      location: taxi.location || '',
      seatingCapacity: taxi.seatingCapacity || '',
      pricePerKm: taxi.pricePerKm || '',
      pricePerTrip: taxi.pricePerTrip || '',
      rentalPricePerDay: taxi.rentalPricePerDay || '',
      acType: taxi.acType || '',
      luggageCapacity: taxi.luggageCapacity || '',
      fuelType: taxi.fuelType || '',
      features: taxi.features ? taxi.features.join(', ') : '',
      ownerPhone: taxi.ownerPhone || '',
      tripsCount: taxi.tripsCount || '',
      payAtPickup: !!taxi.payAtPickup,
      additionalInformation: taxi.additionalInformation || '',
    });
    setTaxiImagePreview(taxi.image || '');
  };

  const handleDelete = (id, event) => {
    setDeleteDialog({ open: true, bikeId: id, anchorEl: event.currentTarget });
  };

  const handleTaxiDelete = (id, event) => {
    setTaxiDeleteDialog({ open: true, taxiId: id, anchorEl: event.currentTarget });
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

  const confirmTaxiDelete = async () => {
    setSnackbar({ open: true, message: 'Deleting taxi...', severity: 'info' });
    try {
      await api.delete(`/api/taxis/${taxiDeleteDialog.taxiId}`);
      setSnackbar({ open: true, message: 'Taxi deleted!', severity: 'success' });
      fetchTaxis();
    } catch {
      setSnackbar({ open: true, message: 'Failed to delete taxi', severity: 'error' });
    } finally {
      setTaxiDeleteDialog({ open: false, taxiId: null, anchorEl: null });
    }
  };

  const cancelTaxiDelete = () => {
    setTaxiDeleteDialog({ open: false, taxiId: null, anchorEl: null });
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

  // Pagination for recent bikes
  const sortedBikes = [...bikes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Newest bikes first
  // Show 3 bikes initially, then load 10 more each time
  const [recentBikesCount, setRecentBikesCount] = useState(3);
  const recentBikes = sortedBikes.slice(0, recentBikesCount);
  const navigate = useNavigate();
  const location = useLocation();

  // Filtering logic for All Bikes section
  const filteredBikes = sortedBikes.filter(bike => {
    if (tab === 1) return bike.isBooked;
    if (tab === 2) return !bike.isBooked;
    return true;
  });

  // Sidebar navigation items

  // Real stats
  const activeBookings = bikes.filter(b => b.isBooked).length;
  const totalBikes = bikes.length;
  const totalTaxis = taxis.length;
  const totalCustomers = users.length;
  const stats = [
    { label: 'Active Bookings', value: activeBookings, icon: <CalendarTodayIcon color="success" /> },
    { label: 'Total Bikes', value: totalBikes, icon: <DirectionsBikeIcon color="primary" /> },
    { label: 'Total Taxis', value: totalTaxis, icon: <FaTaxi color="info" /> },
    { label: 'Total Customers', value: totalCustomers, icon: <PeopleIcon color="warning" /> },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f7f9fb' }}>
      {/* Navbar at the very top, full width */}
      {/* <Navbar /> */}
      <DashboardNavbar/>
      <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 56px)' }}>
        {/* Sidebar below Navbar */}
        <AdminSidebar />
        {/* Main Content */}
        <Box sx={{ flex: 1, pl: { md: 0 }, pr: 0 }}>
          <Box sx={{ maxWidth: 950, mx: 'auto', mt: 2, px: 1 }}>
            {/* Welcome Section */}
                            <Box sx={{ bgcolor: '#FDB813', color: '#fff', borderRadius: 2, p: 2, mb: 2 }}>
              <Typography variant="h5" fontWeight={700} sx={{ fontSize: 26 }}>Welcome back, Admin!</Typography>
              <Typography variant="body2" mt={0.5} sx={{ fontSize: 15 }}>Here's what's happening with your bike rental business today.</Typography>
            </Box>
            {/* Quick Actions at top for mobile only */}
            <Box sx={{ display: { xs: 'block', md: 'none' }, bgcolor: '#fff', borderRadius: 1.5, p: 2, mb: 2, boxShadow: 1 }}>
              <Typography variant="subtitle1" fontWeight={700} mb={1} sx={{ fontSize: 16 }}>Quick Actions</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                <Button variant="contained" fullWidth sx={{ bgcolor: '#FDB813', color: '#fff', fontWeight: 600, mb: 0.5, fontSize: 14, py: 1 }} onClick={() => { setBikeFormOpen(true); setEditId(null); setForm(initialForm); setImagePreview(''); }}>
                  Add New Bike
                </Button>
                <Button variant="contained" fullWidth sx={{ bgcolor: '#3b82f6', color: '#fff', fontWeight: 600, mb: 0.5, fontSize: 14, py: 1 }} onClick={() => { setTaxiFormOpen(true); setTaxiEditId(null); setTaxiForm(initialTaxiForm); setTaxiImagePreview(''); }}>
                  Add New Taxi
                </Button>
                <Button variant="contained" fullWidth sx={{ bgcolor: '#22c55e', color: '#fff', fontWeight: 600, mb: 0.5, fontSize: 14, py: 1 }} onClick={() => navigate('/admin/bikes?tab=1')}>
                  View Bookings
                </Button>
                <Button variant="contained" fullWidth sx={{ bgcolor: '#a21caf', color: '#fff', fontWeight: 600, fontSize: 14, py: 1 }} onClick={async () => { await fetchBikes(); await fetchTaxis(); await fetchUsers(); await fetchTaxiCities(); setSnackbar({ open: true, message: 'Dashboard data refreshed!', severity: 'success' }); }}>
                  Refresh Dashboard Data
                </Button>
              </Box>
            </Box>
            {/* Stats Cards */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr 1fr' }, gap: 1.5, mb: 2 }}>
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
                  <>
                    {recentBikes.map(bike => (
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
                    ))}
                    {sortedBikes.length > recentBikesCount && (
                      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                        <Button variant="outlined" size="small" onClick={() => setRecentBikesCount(c => c + 10)}>
                          Load More
                        </Button>
                      </Box>
                    )}
                  </>
                )}
              </Box>
              {/* Quick Actions (desktop only) */}
              <Box sx={{ bgcolor: '#fff', borderRadius: 1.5, p: 2, display: { xs: 'none', md: 'flex' }, flexDirection: 'column', gap: 1.2 }}>
                <Typography variant="subtitle1" fontWeight={700} mb={1} sx={{ fontSize: 16 }}>Quick Actions</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                  <Button variant="contained" fullWidth sx={{ bgcolor: '#FDB813', color: '#fff', fontWeight: 600, mb: 0.5, fontSize: 14, py: 1 }} onClick={() => { setBikeFormOpen(true); setEditId(null); setForm(initialForm); setImagePreview(''); }}>
                    Add New Bike
                  </Button>
                  <Button variant="contained" fullWidth sx={{ bgcolor: '#3b82f6', color: '#fff', fontWeight: 600, mb: 0.5, fontSize: 14, py: 1 }} onClick={() => { setTaxiFormOpen(true); setTaxiEditId(null); setTaxiForm(initialTaxiForm); setTaxiImagePreview(''); }}>
                    Add New Taxi
                  </Button>
                  <Button variant="contained" fullWidth sx={{ bgcolor: '#22c55e', color: '#fff', fontWeight: 600, mb: 0.5, fontSize: 14, py: 1 }} onClick={() => navigate('/admin/bikes?tab=1')}>
                    View Bookings
                  </Button>
                  <Button variant="contained" fullWidth sx={{ bgcolor: '#a21caf', color: '#fff', fontWeight: 600, fontSize: 14, py: 1 }} onClick={async () => { await fetchBikes(); await fetchTaxis(); await fetchUsers(); await fetchTaxiCities(); setSnackbar({ open: true, message: 'Dashboard data refreshed!', severity: 'success' }); }}>
                    Refresh Dashboard Data
                  </Button>
                </Box>
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
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel id="location-label" style={{ fontSize: 12 }}>Location</InputLabel>
                    <Select
                      labelId="location-label"
                      name="location"
                      value={form.location}
                      label="Location"
                      onChange={handleChange}
                      style={{ fontSize: 12 }}
                    >
                      {cities.length === 0 && (
                        <MenuItem value="" disabled>No cities found</MenuItem>
                      )}
                      {cities.map(city => (
                        <MenuItem key={city._id || city.slug || city.name} value={city.name} style={{ fontSize: 12 }}>{city.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
          {/* Taxi Delete Popover */}
          <Popover
            open={taxiDeleteDialog.open}
            anchorEl={taxiDeleteDialog.anchorEl}
            onClose={cancelTaxiDelete}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{ sx: { p: 2, minWidth: 200 } }}
          >
            <Typography variant="subtitle1" mb={1}>Confirm Delete</Typography>
            <Typography variant="body2" mb={2}>Are you sure you want to delete this taxi?</Typography>
            <Box display="flex" justifyContent="flex-end" gap={1}>
              <Button onClick={cancelTaxiDelete} size="small">Cancel</Button>
              <Button onClick={confirmTaxiDelete} color="error" variant="contained" size="small">Delete</Button>
            </Box>
          </Popover>
          {/* Add Taxi Modal */}
          <Dialog open={taxiFormOpen} onClose={() => setTaxiFormOpen(false)} maxWidth="md" fullWidth>
            <DialogTitle sx={{ fontSize: 15, py: 0.7, position: 'relative', pr: 4 }}>
              {taxiEditId ? 'Edit Taxi' : 'Add New Taxi'}
              <IconButton
                aria-label="close"
                onClick={() => setTaxiFormOpen(false)}
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
              <form onSubmit={handleTaxiSubmit} style={{ width: '100%' }} encType="multipart/form-data">
                {/* Taxi Details Section */}
                <Typography variant="subtitle2" mt={0.2} mb={0.2} sx={{ fontWeight: 600, fontSize: 12 }}>Taxi Details</Typography>
                <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={0.5} mb={0.7}>
                  <TextField label="Name" name="name" value={taxiForm.name} onChange={handleTaxiChange} required helperText="Enter taxi name" size="small" sx={{ fontSize: 12 }} InputProps={{ style: { fontSize: 12 } }} InputLabelProps={{ style: { fontSize: 12 } }} FormHelperTextProps={{ style: { fontSize: 11 } }} />
                  <TextField label="Type" name="type" value={taxiForm.type} onChange={handleTaxiChange} required helperText="e.g. Maruti Suzuki Baleno" size="small" sx={{ fontSize: 12 }} InputProps={{ style: { fontSize: 12 } }} InputLabelProps={{ style: { fontSize: 12 } }} FormHelperTextProps={{ style: { fontSize: 11 } }} />
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel id="taxi-location-label" style={{ fontSize: 12 }}>Location</InputLabel>
                    <Select
                      labelId="taxi-location-label"
                      name="location"
                      value={taxiForm.location}
                      label="Location"
                      onChange={handleTaxiChange}
                      style={{ fontSize: 12 }}
                    >
                      {taxiCities.length === 0 && (
                        <MenuItem value="" disabled>No taxi cities found</MenuItem>
                      )}
                      {taxiCities.map(city => (
                        <MenuItem key={city._id || city.slug || city.name} value={city.name} style={{ fontSize: 12 }}>{city.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField label="Seating Capacity" name="seatingCapacity" value={taxiForm.seatingCapacity} onChange={handleTaxiChange} required type="number" helperText="Number of seats" size="small" sx={{ fontSize: 12 }} InputProps={{ style: { fontSize: 12 } }} InputLabelProps={{ style: { fontSize: 12 } }} FormHelperTextProps={{ style: { fontSize: 11 } }} />
                </Box>
                {/* Pricing Section */}
                <Typography variant="subtitle2" mt={0.2} mb={0.2} sx={{ fontWeight: 600, fontSize: 12 }}>Pricing</Typography>
                <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={0.5} mb={0.7}>
                  <TextField label="Price per km" name="pricePerKm" value={taxiForm.pricePerKm} onChange={handleTaxiChange} required type="number" helperText="Price per kilometer" size="small" sx={{ fontSize: 12 }} InputProps={{ style: { fontSize: 12 } }} InputLabelProps={{ style: { fontSize: 12 } }} FormHelperTextProps={{ style: { fontSize: 11 } }} />
                  <TextField label="Price per trip" name="pricePerTrip" value={taxiForm.pricePerTrip} onChange={handleTaxiChange} required type="number" helperText="Price per trip" size="small" sx={{ fontSize: 12 }} InputProps={{ style: { fontSize: 12 } }} InputLabelProps={{ style: { fontSize: 12 } }} FormHelperTextProps={{ style: { fontSize: 11 } }} />
                  <TextField label="Rental price per day" name="rentalPricePerDay" value={taxiForm.rentalPricePerDay} onChange={handleTaxiChange} required type="number" helperText="Daily rental price" size="small" sx={{ fontSize: 12 }} InputProps={{ style: { fontSize: 12 } }} InputLabelProps={{ style: { fontSize: 12 } }} FormHelperTextProps={{ style: { fontSize: 11 } }} />
                </Box>
                {/* Taxi Specifications */}
                <Typography variant="subtitle2" mt={0.2} mb={0.2} sx={{ fontWeight: 600, fontSize: 12 }}>Specifications</Typography>
                <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={0.5} mb={0.7}>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel id="acType-label" style={{ fontSize: 12 }}>AC Type</InputLabel>
                    <Select
                      labelId="acType-label"
                      name="acType"
                      value={taxiForm.acType}
                      label="AC Type"
                      onChange={handleTaxiChange}
                      style={{ fontSize: 12 }}
                    >
                      <MenuItem value="AC" style={{ fontSize: 12 }}>AC</MenuItem>
                      <MenuItem value="Non-AC" style={{ fontSize: 12 }}>Non-AC</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField label="Luggage Capacity" name="luggageCapacity" value={taxiForm.luggageCapacity} onChange={handleTaxiChange} required helperText="e.g. 2 large bags" size="small" sx={{ fontSize: 12 }} InputProps={{ style: { fontSize: 12 } }} InputLabelProps={{ style: { fontSize: 12 } }} FormHelperTextProps={{ style: { fontSize: 11 } }} />
                  <TextField label="Fuel Type" name="fuelType" value={taxiForm.fuelType} onChange={handleTaxiChange} required helperText="e.g. Petrol, Diesel, CNG" size="small" sx={{ fontSize: 12 }} InputProps={{ style: { fontSize: 12 } }} InputLabelProps={{ style: { fontSize: 12 } }} FormHelperTextProps={{ style: { fontSize: 11 } }} />
                  <TextField label="Features (comma separated)" name="features" value={taxiForm.features} onChange={handleTaxiChange} helperText="e.g. GPS, Music System" size="small" sx={{ fontSize: 12 }} InputProps={{ style: { fontSize: 12 } }} InputLabelProps={{ style: { fontSize: 12 } }} FormHelperTextProps={{ style: { fontSize: 11 } }} />
                </Box>
                {/* Owner Details Section */}
                <Typography variant="subtitle2" mt={0.2} mb={0.2} sx={{ fontWeight: 600, fontSize: 12 }}>Owner Details</Typography>
                <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={0.5} mb={0.7}>
                  <TextField label="Owner Phone Number" name="ownerPhone" value={taxiForm.ownerPhone} onChange={handleTaxiChange} required helperText="Enter valid phone number" size="small" sx={{ fontSize: 12 }} InputProps={{ style: { fontSize: 12 } }} InputLabelProps={{ style: { fontSize: 12 } }} FormHelperTextProps={{ style: { fontSize: 11 } }} />
                  <TextField label="Trips Count" name="tripsCount" value={taxiForm.tripsCount} onChange={handleTaxiChange} type="number" helperText="Number of trips completed" size="small" sx={{ fontSize: 12 }} InputProps={{ style: { fontSize: 12 } }} InputLabelProps={{ style: { fontSize: 12 } }} FormHelperTextProps={{ style: { fontSize: 11 } }} />
                </Box>
                {/* Image Upload */}
                <Typography variant="subtitle2" mt={0.2} mb={0.2} sx={{ fontWeight: 600, fontSize: 12 }}>Image</Typography>
                <Box display="flex" alignItems="center" gap={0.5} mb={0.7}>
                  <Button variant="outlined" component="label" size="small" sx={{ fontSize: 11, py: 0.1, px: 0.7, minWidth: 0, height: 26 }}>
                    {taxiForm.image && taxiForm.image instanceof File ? 'Change Image' : 'Upload Image'}
                    <input type="file" name="image" accept="image/*" hidden onChange={handleTaxiChange} />
                  </Button>
                  {taxiImagePreview && (
                    <Avatar src={taxiImagePreview} alt="Preview" sx={{ width: 26, height: 26 }} />
                  )}
                </Box>
                {/* Rental Details Section */}
                <Typography variant="subtitle2" mt={0.2} mb={0.2} sx={{ fontWeight: 600, fontSize: 12 }}>Rental Details</Typography>
                <Box display="flex" alignItems="center" gap={0.5} mb={0.7}>
                  <FormControlLabel control={<Checkbox checked={taxiForm.payAtPickup} onChange={handleTaxiChange} name="payAtPickup" size="small" sx={{ p: 0.2 }} />} label={<span style={{ fontSize: 11 }}>Pay at Pickup</span>} sx={{ ml: 0 }} />
                </Box>
                {/* Additional Information Section */}
                <Typography variant="subtitle2" mt={0.2} mb={0.2} sx={{ fontWeight: 600, fontSize: 12 }}>Additional Information</Typography>
                <Box mb={0.7}>
                  <TextField 
                    label="Additional Information" 
                    name="additionalInformation" 
                    value={taxiForm.additionalInformation} 
                    onChange={handleTaxiChange} 
                    multiline 
                    rows={4}
                    helperText="Enter pricing terms, exclusions, or any additional information (e.g., Extra KM charges, Night allowance, Tolls, etc.)" 
                    size="small" 
                    sx={{ fontSize: 12, width: '100%' }} 
                    InputProps={{ style: { fontSize: 12 } }} 
                    InputLabelProps={{ style: { fontSize: 12 } }} 
                    FormHelperTextProps={{ style: { fontSize: 11 } }} 
                  />
                </Box>
                <Box display="flex" gap={0.5} mt={1}>
                  <Button type="submit" variant="contained" color="primary" disabled={loading} size="small" sx={{ minWidth: 70, fontSize: 12, py: 0.2, height: 28 }}>
                    {taxiEditId ? 'Update' : 'Add'}
                  </Button>
                  {taxiEditId && <Button onClick={() => { setTaxiEditId(null); setTaxiForm(initialTaxiForm); setTaxiImagePreview(''); }} size="small" sx={{ fontSize: 12, py: 0.2, height: 28 }}>Cancel</Button>}
                </Box>
              </form>
            </DialogContent>
          </Dialog>
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