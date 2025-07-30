import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, IconButton, Tabs, Tab, Snackbar, Alert, Button, Avatar } from '@mui/material';
import Navbar from '../components/Navbar';
import api from '../utils/api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import dayjs from 'dayjs';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Checkbox, FormControlLabel, Popover, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import DashboardNavbar from '../components/DashboardNabvar';
import { generateCitySlug, generateBikesSlug } from '../utils/slugUtils';

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

export default function AllBikes({ cityOverride }) {
  const [bikes, setBikes] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  // Read tab from query param
  const getTabFromQuery = () => {
    const params = new URLSearchParams(location.search);
    const t = parseInt(params.get('tab'), 10);
    return [0, 1, 2].includes(t) ? t : 0;
  };
  const [tab, setTab] = useState(getTabFromQuery());
  // Sync tab with URL
  useEffect(() => {
    setTab(getTabFromQuery());
  }, [location.search]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [bikeFormOpen, setBikeFormOpen] = useState(false);
  const [bookingDialog, setBookingDialog] = useState({ open: false, bike: null });
  const [bookingFrom, setBookingFrom] = useState(null);
  const [bookingTo, setBookingTo] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, bikeId: null, anchorEl: null });
  const [loading, setLoading] = useState(false);
  const [cityFilter, setCityFilter] = useState(cityOverride || '');
  const [nameFilter, setNameFilter] = useState('');
  const [ready, setReady] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);

  // Get unique city list from bikes (case-insensitive, display original casing)
  const cityMap = {};
  bikes.forEach(b => {
    if (b.location) {
      const key = b.location.trim().toLowerCase();
      if (!cityMap[key]) cityMap[key] = b.location.trim();
    }
  });
  // const cityOptions = Object.values(cityMap); // This line is no longer needed

  // Handlers for edit, booking, delete
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
    setBikeFormOpen(true);
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
      setBikeFormOpen(false);
      fetchBikes();
    } catch {
      setSnackbar({ open: true, message: 'Failed to save bike', severity: 'error' });
    } finally {
      setLoading(false);
    }
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
        bookingPeriod: bookingFrom && bookingTo
          ? { from: dayjs(bookingFrom).toISOString(), to: dayjs(bookingTo).toISOString() }
          : { from: null, to: null },
        bookedDays: bookingFrom && bookingTo ? dayjs(bookingTo).diff(dayjs(bookingFrom), 'day') + 1 : 0,
      });
      setSnackbar({ open: true, message: 'Booking status updated!', severity: 'success' });
      fetchBikes();
      closeBookingDialog();
    } catch {
      setSnackbar({ open: true, message: 'Failed to update booking status', severity: 'error' });
    }
  };

  // Fetch bikes from backend, optionally by city
  const fetchBikes = async (city) => {
    try {
      let url = '/api/bikes';
      const cityToUse = cityOverride || city;
      if (cityToUse) {
        url += `?location=${encodeURIComponent(cityToUse)}`;
      }
      const res = await api.get(url);
      setBikes(res.data);
      setReady(true);
    } catch {
      setSnackbar({ open: true, message: 'Failed to fetch bikes', severity: 'error' });
    }
  };

  // On mount, fetch all bikes or by cityOverride
  useEffect(() => {
    fetchBikes(cityOverride);
    // Set cityFilter to '' (All Cities) by default, and reset on mount if not cityOverride
    if (!cityOverride) {
      setCityFilter('');
    } else {
      setCityFilter(cityOverride);
    }
  }, [cityOverride]);

  useEffect(() => {
    // Fetch all cities for dropdowns
    const fetchCities = async () => {
      try {
        const res = await api.get('/api/cities');
        const names = res.data.map(city => city.name);
        setCityOptions(names);
      } catch {
        // fallback: use unique locations from bikes if city API fails
        const unique = Array.from(new Set(bikes.map(b => b.location).filter(Boolean)));
        setCityOptions(unique);
      }
    };
    fetchCities();
  }, [bikes]);

  // Sort bikes so newest appear first (descending by createdAt)
  const sortedBikes = [...bikes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  // Pagination for all bikes
  const [visibleBikesCount, setVisibleBikesCount] = useState(10);
  // Apply tab and name filter only (city filter is handled by backend fetch)
  const filteredBikes = sortedBikes.filter(bike => {
    if (tab === 1 && !bike.isBooked) return false;
    if (tab === 2 && bike.isBooked) return false;
    if (nameFilter && !bike.name.toLowerCase().includes(nameFilter.toLowerCase())) return false;
    return true;
  });
  const paginatedBikes = filteredBikes.slice(0, visibleBikesCount);

  // Sidebar navigation items
  const navItems = [
    { label: 'Dashboard', icon: <MenuIcon />, path: '/admin/dashboard' },
    { label: 'Bikes', icon: <DirectionsBikeIcon />, path: '/admin/bikes' },
    { label: 'Bookings', icon: <CalendarTodayIcon /> },
    { label: 'Customers', icon: <PeopleIcon /> },
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
      <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
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
                    borderLeft: isActive ? '3px solid #facc15' : '3px solid transparent',
                    bgcolor: 'transparent',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#facc15' : '#fff',
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
                  <span style={{ fontSize: 18, display: 'flex', alignItems: 'center', color: isActive ? '#facc15' : '#fff' }}>{item.icon}</span>
                  <Typography sx={{ ml: 1, fontWeight: isActive ? 700 : 500, fontSize: 13 }}>{item.label}</Typography>
                </Box>
              );
            })}
          </Box>
          <Box>
            {bottomNavItems.map(item => (
              <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', px: 1.5, py: 0.7, cursor: 'pointer', color: '#bdbdbd', borderRadius: 2, mb: 0.5 }}>
                <span style={{ fontSize: 16, display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                <Typography sx={{ ml: 1, fontSize: 12 }}>{item.label}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        {/* Main Content */}
        <Box sx={{ flex: 1, pl: { md: 0 }, pr: 0 }}>
          <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4, px: 2 }}>
            <Paper sx={{ p: 3, mt: 2 }}>
              <Typography variant="h6" mb={2}>All Bikes</Typography>
              {/* Filters Row */}
              <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                <TextField
                  select
                  label="Filter by City"
                  value={cityFilter}
                  onChange={e => {
                    const selected = e.target.value;
                    setCityFilter(selected);
                    setNameFilter('');
                    const city = selected.trim().toLowerCase();
                    if (cityOptions.map(c => c.toLowerCase()).includes(city)) {
                      const slug = generateCitySlug(city);
                      navigate(`/bikes/${slug}`);
                    } else if (city === "") {
                      const bikesSlug = generateBikesSlug();
                      navigate(`/bikes/${bikesSlug}`);
                    }
                  }}
                  size="small"
                  sx={{ minWidth: 180 }}
                >
                  <MenuItem value="">All Cities</MenuItem>
                  {cityOptions.map(city => (
                    <MenuItem key={city} value={city}>{city}</MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Search by Name"
                  value={nameFilter}
                  onChange={e => setNameFilter(e.target.value)}
                  size="small"
                  sx={{ minWidth: 220 }}
                />
              </Box>
              {/* Tabs */}
              <Tabs value={tab} onChange={(_, v) => {
                setTab(v);
                const params = new URLSearchParams(location.search);
                params.set('tab', v);
                navigate({ pathname: '/admin/bikes', search: params.toString() });
              }} sx={{ mb: 2 }}>
                <Tab label="All" />
                <Tab label="Booked" />
                <Tab label="Unbooked" />
              </Tabs>
              {ready && (
                filteredBikes.length === 0
                  ? <Typography>No bikes found.</Typography>
                  : <>
                      {paginatedBikes.map(bike => (
                        <Box key={bike._id} sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 1, borderBottom: '1px solid #eee' }}>
                          <img src={bike.image} alt={bike.name} style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4, marginRight: 16 }} />
                          <Box sx={{ flex: 1 }}>
                            <Typography fontWeight={600}>{bike.name}</Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: 12, display: 'block' }}>{dayjs(bike.createdAt).format('DD MMM YYYY')}</Typography>
                            <Typography variant="body2" color="text.secondary">₹{bike.price} | {bike.location}</Typography>
                            {bike.isBooked ? (
                              <Typography variant="body2" color="error">
                                Booked: {bike.bookingPeriod?.from ? dayjs(bike.bookingPeriod.from).format('DD/MM/YYYY') : ''} - {bike.bookingPeriod?.to ? dayjs(bike.bookingPeriod.to).format('DD/MM/YYYY') : ''} ({bike.bookedDays} days)
                              </Typography>
                            ) : (
                              <Typography variant="body2" color="success.main">Available</Typography>
                            )}
                          </Box>
                          <IconButton onClick={() => handleEdit(bike)}><EditIcon /></IconButton>
                          <IconButton color={bike.isBooked ? 'error' : 'primary'} title={bike.isBooked ? 'Mark as available' : 'Book this bike'} onClick={() => openBookingDialog(bike)}>
                            <EventAvailableIcon />
                          </IconButton>
                          <IconButton color="error" onClick={e => handleDelete(bike._id, e)}><DeleteIcon /></IconButton>
                        </Box>
                      ))}
                      {filteredBikes.length > visibleBikesCount && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                          <Button variant="outlined" size="small" onClick={() => setVisibleBikesCount(c => c + 10)}>
                            Load More
                          </Button>
                        </Box>
                      )}
                    </>
              )}
            </Paper>
          </Box>
          <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>
            <Alert onClose={() => setSnackbar(s => ({ ...s, open: false }))} severity={snackbar.severity} sx={{ width: '100%' }}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
      {/* Add/Edit Bike Modal */}
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
              <TextField
                select
                label="Location"
                name="location"
                value={form.location}
                onChange={handleChange}
                helperText="Select city"
                size="small"
                sx={{ fontSize: 12 }}
                InputProps={{ style: { fontSize: 12 } }}
                InputLabelProps={{ style: { fontSize: 12 } }}
                FormHelperTextProps={{ style: { fontSize: 11 } }}
                required
              >
                {cityOptions.map(city => (
                  <MenuItem key={city} value={city}>{city}</MenuItem>
                ))}
              </TextField>
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
              {editId && <Button onClick={() => { setEditId(null); setForm(initialForm); setImagePreview(''); setBikeFormOpen(false); }} size="small" sx={{ fontSize: 12, py: 0.2, height: 28 }}>Cancel</Button>}
            </Box>
          </form>
        </DialogContent>
      </Dialog>
      {/* Booking Status Dialog */}
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
      {/* Delete Popover */}
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
    </Box>
  );
} 