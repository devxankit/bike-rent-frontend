import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, IconButton, Tabs, Tab, Snackbar, Alert, Button, Avatar } from '@mui/material';
import Navbar from '../components/Navbar';
import api from '../utils/api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import dayjs from 'dayjs';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Checkbox, FormControlLabel, Popover, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import DashboardNavbar from '../components/DashboardNabvar';
import AdminSidebar from '../components/AdminSidebar';
import { generateCitySlug, generateTaxisSlug } from '../utils/slugUtils';

const initialForm = {
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
};

export default function AllTaxis({ cityOverride }) {
  const [taxis, setTaxis] = useState([]);
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
  const [taxiFormOpen, setTaxiFormOpen] = useState(false);
  const [bookingDialog, setBookingDialog] = useState({ open: false, taxi: null });
  const [bookingFrom, setBookingFrom] = useState(null);
  const [bookingTo, setBookingTo] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, taxiId: null, anchorEl: null });
  const [loading, setLoading] = useState(false);
  const [cityFilter, setCityFilter] = useState(cityOverride || '');
  const [nameFilter, setNameFilter] = useState('');
  const [ready, setReady] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);

  // Get unique city list from taxis (case-insensitive, display original casing)
  const cityMap = {};
  taxis.forEach(t => {
    if (t.location) {
      const key = t.location.trim().toLowerCase();
      if (!cityMap[key]) cityMap[key] = t.location.trim();
    }
  });

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

  const handleEdit = taxi => {
    setEditId(taxi._id);
    setForm({
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
    });
    setImagePreview(taxi.image || '');
    setTaxiFormOpen(true);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('type', form.type);
    formData.append('location', form.location);
    formData.append('seatingCapacity', form.seatingCapacity);
    formData.append('pricePerKm', form.pricePerKm);
    formData.append('pricePerTrip', form.pricePerTrip);
    formData.append('rentalPricePerDay', form.rentalPricePerDay);
    formData.append('acType', form.acType);
    formData.append('luggageCapacity', form.luggageCapacity);
    formData.append('fuelType', form.fuelType);
    formData.append('features', form.features);
    formData.append('ownerPhone', form.ownerPhone);
    formData.append('tripsCount', form.tripsCount);
    formData.append('payAtPickup', form.payAtPickup);
    if (form.image && form.image instanceof File) {
      formData.append('image', form.image);
    } else if (editId && typeof form.image === 'string') {
      formData.append('image', form.image);
    }
    try {
      if (editId) {
        await api.put(`/api/taxis/${editId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSnackbar({ open: true, message: 'Taxi updated!', severity: 'success' });
      } else {
        await api.post('/api/taxis', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSnackbar({ open: true, message: 'Taxi added!', severity: 'success' });
      }
      setForm(initialForm);
      setEditId(null);
      setImagePreview('');
      setTaxiFormOpen(false);
      fetchTaxis();
    } catch {
      setSnackbar({ open: true, message: 'Failed to save taxi', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id, event) => {
    setDeleteDialog({ open: true, taxiId: id, anchorEl: event.currentTarget });
  };

  const confirmDelete = async () => {
    setSnackbar({ open: true, message: 'Deleting taxi...', severity: 'info' });
    try {
      await api.delete(`/api/taxis/${deleteDialog.taxiId}`);
      setSnackbar({ open: true, message: 'Taxi deleted!', severity: 'success' });
      fetchTaxis();
    } catch {
      setSnackbar({ open: true, message: 'Failed to delete taxi', severity: 'error' });
    } finally {
      setDeleteDialog({ open: false, taxiId: null, anchorEl: null });
    }
  };

  const cancelDelete = () => {
    setDeleteDialog({ open: false, taxiId: null, anchorEl: null });
  };

  // Booking status dialog logic
  const openBookingDialog = (taxi) => {
    setBookingDialog({ open: true, taxi });
    setBookingFrom(taxi.bookingPeriod?.from ? dayjs(taxi.bookingPeriod.from) : null);
    setBookingTo(taxi.bookingPeriod?.to ? dayjs(taxi.bookingPeriod.to) : null);
  };
  const closeBookingDialog = () => {
    setBookingDialog({ open: false, taxi: null });
    setBookingFrom(null);
    setBookingTo(null);
  };
  const handleBookingUpdate = async () => {
    if (!bookingDialog.taxi) return;
    try {
      await api.patch(`/api/taxis/${bookingDialog.taxi._id}/booking`, {
        isBooked: !!(bookingFrom && bookingTo),
        bookingPeriod: bookingFrom && bookingTo
          ? { from: dayjs(bookingFrom).toISOString(), to: dayjs(bookingTo).toISOString() }
          : { from: null, to: null },
        bookedDays: bookingFrom && bookingTo ? dayjs(bookingTo).diff(dayjs(bookingFrom), 'day') + 1 : 0,
      });
      setSnackbar({ open: true, message: 'Booking status updated!', severity: 'success' });
      fetchTaxis();
      closeBookingDialog();
    } catch {
      setSnackbar({ open: true, message: 'Failed to update booking status', severity: 'error' });
    }
  };

  // Fetch taxis from backend, optionally by city
  const fetchTaxis = async (city) => {
    try {
      let url = '/api/taxis';
      const cityToUse = cityOverride || city;
      if (cityToUse) {
        url += `?location=${encodeURIComponent(cityToUse)}`;
      }
      const res = await api.get(url);
      setTaxis(res.data);
      setReady(true);
    } catch {
      setSnackbar({ open: true, message: 'Failed to fetch taxis', severity: 'error' });
    }
  };

  // On mount, fetch all taxis or by cityOverride
  useEffect(() => {
    fetchTaxis(cityOverride);
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
        const res = await api.get('/api/taxi-cities');
        const names = res.data.map(city => city.name);
        setCityOptions(names);
      } catch {
        // fallback: use unique locations from taxis if city API fails
        const unique = Array.from(new Set(taxis.map(t => t.location).filter(Boolean)));
        setCityOptions(unique);
      }
    };
    fetchCities();
  }, [taxis]);

  // Sort taxis so newest appear first (descending by createdAt)
  const sortedTaxis = [...taxis].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  // Pagination for all taxis
  const [visibleTaxisCount, setVisibleTaxisCount] = useState(10);
  // Apply tab and name filter only (city filter is handled by backend fetch)
  const filteredTaxis = sortedTaxis.filter(taxi => {
    if (tab === 1 && !taxi.isBooked) return false;
    if (tab === 2 && taxi.isBooked) return false;
    if (nameFilter && !taxi.name.toLowerCase().includes(nameFilter.toLowerCase())) return false;
    return true;
  });
  const paginatedTaxis = filteredTaxis.slice(0, visibleTaxisCount);


  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f7f9fb' }}>
      <DashboardNavbar/>
      <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
        {/* Sidebar below Navbar */}
        <AdminSidebar />
        {/* Main Content */}
        <Box sx={{ flex: 1, pl: { md: 0 }, pr: 0 }}>
          <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4, px: 2 }}>
            <Paper sx={{ p: 3, mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">All Taxis</Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => setTaxiFormOpen(true)}
                  sx={{ fontSize: 12, py: 0.5, px: 2 }}
                >
                  Add New Taxi
                </Button>
              </Box>
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
                      navigate(`/taxis/${slug}`);
                    } else if (city === "") {
                      const taxisSlug = generateTaxisSlug();
                      navigate(`/taxis/${taxisSlug}`);
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
                navigate({ pathname: '/admin/taxis', search: params.toString() });
              }} sx={{ mb: 2 }}>
                <Tab label="All" />
                <Tab label="Booked" />
                <Tab label="Unbooked" />
              </Tabs>
              {ready && (
                filteredTaxis.length === 0
                  ? <Typography>No taxis found.</Typography>
                  : <>
                      {paginatedTaxis.map(taxi => (
                        <Box key={taxi._id} sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 1, borderBottom: '1px solid #eee' }}>
                          <img src={taxi.image} alt={taxi.name} style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4, marginRight: 16 }} />
                          <Box sx={{ flex: 1 }}>
                            <Typography fontWeight={600}>{taxi.name || taxi.type}</Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: 12, display: 'block' }}>{dayjs(taxi.createdAt).format('DD MMM YYYY')}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              ₹{taxi.rentalPricePerDay || taxi.pricePerTrip || taxi.pricePerKm} | {taxi.location} | {taxi.seatingCapacity} seats | {taxi.acType}
                            </Typography>
                            {taxi.isBooked ? (
                              <Typography variant="body2" color="error">
                                Booked: {taxi.bookingPeriod?.from ? dayjs(taxi.bookingPeriod.from).format('DD/MM/YYYY') : ''} - {taxi.bookingPeriod?.to ? dayjs(taxi.bookingPeriod.to).format('DD/MM/YYYY') : ''} ({taxi.bookedDays} days)
                              </Typography>
                            ) : (
                              <Typography variant="body2" color="success.main">Available</Typography>
                            )}
                          </Box>
                          <IconButton onClick={() => handleEdit(taxi)}><EditIcon /></IconButton>
                          <IconButton color={taxi.isBooked ? 'error' : 'primary'} title={taxi.isBooked ? 'Mark as available' : 'Book this taxi'} onClick={() => openBookingDialog(taxi)}>
                            <EventAvailableIcon />
                          </IconButton>
                          <IconButton color="error" onClick={e => handleDelete(taxi._id, e)}><DeleteIcon /></IconButton>
                        </Box>
                      ))}
                      {filteredTaxis.length > visibleTaxisCount && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                          <Button variant="outlined" size="small" onClick={() => setVisibleTaxisCount(c => c + 10)}>
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
      {/* Add/Edit Taxi Modal */}
      <Dialog open={taxiFormOpen} onClose={() => setTaxiFormOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontSize: 15, py: 0.7, position: 'relative', pr: 4 }}>
          {editId ? 'Edit Taxi' : 'Add New Taxi'}
          {/* Cross/Close Button */}
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
          <form onSubmit={handleSubmit} style={{ width: '100%' }} encType="multipart/form-data">
            {/* Taxi Details Section */}
            <Typography variant="subtitle2" mt={0.2} mb={0.2} sx={{ fontWeight: 600, fontSize: 12 }}>Taxi Details</Typography>
            <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={0.5} mb={0.7}>
              <TextField label="Name" name="name" value={form.name} onChange={handleChange} required helperText="Enter taxi name" size="small" sx={{ fontSize: 12 }} InputProps={{ style: { fontSize: 12 } }} InputLabelProps={{ style: { fontSize: 12 } }} FormHelperTextProps={{ style: { fontSize: 11 } }} />
              <TextField label="Type" name="type" value={form.type} onChange={handleChange} required helperText="e.g. Maruti Suzuki Baleno" size="small" sx={{ fontSize: 12 }} InputProps={{ style: { fontSize: 12 } }} InputLabelProps={{ style: { fontSize: 12 } }} FormHelperTextProps={{ style: { fontSize: 11 } }} />
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
              <TextField label="Seating Capacity" name="seatingCapacity" value={form.seatingCapacity} onChange={handleChange} type="number" required helperText="Number of seats" size="small" sx={{ fontSize: 12 }} InputProps={{ style: { fontSize: 12 } }} InputLabelProps={{ style: { fontSize: 12 } }} FormHelperTextProps={{ style: { fontSize: 11 } }} />
              <TextField
                select
                label="AC Type"
                name="acType"
                value={form.acType}
                onChange={handleChange}
                required
                helperText="AC or Non-AC"
                size="small"
                sx={{ fontSize: 12 }}
                InputProps={{ style: { fontSize: 12 } }}
                InputLabelProps={{ style: { fontSize: 12 } }}
                FormHelperTextProps={{ style: { fontSize: 11 } }}
              >
                <MenuItem value="AC">AC</MenuItem>
                <MenuItem value="Non-AC">Non-AC</MenuItem>
              </TextField>
              <TextField label="Luggage Capacity" name="luggageCapacity" value={form.luggageCapacity} onChange={handleChange} required helperText="e.g. 2 Large Bags" size="small" sx={{ fontSize: 12 }} InputProps={{ style: { fontSize: 12 } }} InputLabelProps={{ style: { fontSize: 12 } }} FormHelperTextProps={{ style: { fontSize: 11 } }} />
              <TextField label="Fuel Type" name="fuelType" value={form.fuelType} onChange={handleChange} required helperText="e.g. Petrol, Diesel, CNG" size="small" sx={{ fontSize: 12 }} InputProps={{ style: { fontSize: 12 } }} InputLabelProps={{ style: { fontSize: 12 } }} FormHelperTextProps={{ style: { fontSize: 11 } }} />
              <TextField label="Features (comma separated)" name="features" value={form.features} onChange={handleChange} helperText="e.g. GPS, Music System" size="small" sx={{ fontSize: 12 }} InputProps={{ style: { fontSize: 12 } }} InputLabelProps={{ style: { fontSize: 12 } }} FormHelperTextProps={{ style: { fontSize: 11 } }} />
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
              <TextField label="Trips Count" name="tripsCount" value={form.tripsCount} onChange={handleChange} type="number" helperText="Number of completed trips" size="small" sx={{ fontSize: 12 }} InputProps={{ style: { fontSize: 12 } }} InputLabelProps={{ style: { fontSize: 12 } }} FormHelperTextProps={{ style: { fontSize: 11 } }} />
            </Box>
            {/* Pricing Details Section */}
            <Typography variant="subtitle2" mt={0.2} mb={0.2} sx={{ fontWeight: 600, fontSize: 12 }}>Pricing Details</Typography>
            <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={0.5} mb={0.7}>
              <TextField label="Price per KM" name="pricePerKm" value={form.pricePerKm} onChange={handleChange} type="number" helperText="Price per kilometer" size="small" sx={{ fontSize: 12 }} InputProps={{ style: { fontSize: 12 } }} InputLabelProps={{ style: { fontSize: 12 } }} FormHelperTextProps={{ style: { fontSize: 11 } }} />
              <TextField label="Price per Trip" name="pricePerTrip" value={form.pricePerTrip} onChange={handleChange} type="number" helperText="Fixed price per trip" size="small" sx={{ fontSize: 12 }} InputProps={{ style: { fontSize: 12 } }} InputLabelProps={{ style: { fontSize: 12 } }} FormHelperTextProps={{ style: { fontSize: 11 } }} />
              <TextField label="Rental Price per Day" name="rentalPricePerDay" value={form.rentalPricePerDay} onChange={handleChange} type="number" helperText="Daily rental price" size="small" sx={{ fontSize: 12 }} InputProps={{ style: { fontSize: 12 } }} InputLabelProps={{ style: { fontSize: 12 } }} FormHelperTextProps={{ style: { fontSize: 11 } }} />
              <FormControlLabel control={<Checkbox checked={form.payAtPickup} onChange={handleChange} name="payAtPickup" size="small" sx={{ p: 0.2 }} />} label={<span style={{ fontSize: 11 }}>Pay at Pickup</span>} sx={{ ml: 0 }} />
            </Box>
            <Box display="flex" gap={0.5} mt={1}>
              <Button type="submit" variant="contained" color="primary" disabled={loading} size="small" sx={{ minWidth: 70, fontSize: 12, py: 0.2, height: 28 }}>
                {editId ? 'Update' : 'Add'}
              </Button>
              {editId && <Button onClick={() => { setEditId(null); setForm(initialForm); setImagePreview(''); setTaxiFormOpen(false); }} size="small" sx={{ fontSize: 12, py: 0.2, height: 28 }}>Cancel</Button>}
            </Box>
          </form>
        </DialogContent>
      </Dialog>
      {/* Booking Status Dialog */}
      <Dialog open={bookingDialog.open} onClose={closeBookingDialog}>
        <DialogTitle>Update Booking Status</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography fontWeight={600}>{bookingDialog.taxi?.name || bookingDialog.taxi?.type}</Typography>
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
        <Typography variant="body2" mb={2}>Are you sure you want to delete this taxi?</Typography>
        <Box display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={cancelDelete} size="small">Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained" size="small">Delete</Button>
        </Box>
      </Popover>
    </Box>
  );
}
