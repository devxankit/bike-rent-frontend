import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  TextField, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Snackbar,
  Alert,
  Switch,
  FormControlLabel,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DashboardNavbar from '../components/DashboardNabvar';
import RichTextEditor from '../components/RichTextEditor';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const initialTaxiCityForm = {
  name: '',
  description: '',
  content: '',
  image: null,
  taxiTypes: [],
  serviceAreas: [],
  seoTitle: '',
  seoDescription: '',
  metaKeywords: ''
};

const taxiTypeOptions = [
  'Economy',
  'Premium',
  'Luxury',
  'SUV',
  'Sedan',
  'Hatchback',
  'Minivan',
  'Executive'
];

export default function TaxiCityPages() {
  const [taxiCities, setTaxiCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCity, setEditingCity] = useState(null);
  const [cityForm, setCityForm] = useState(initialTaxiCityForm);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, cityId: null });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTaxiCities();
  }, []);

  const fetchTaxiCities = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/admin/taxi-cities');
      setTaxiCities(response.data);
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to fetch taxi cities', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCityForm(prev => ({ ...prev, [name]: value }));
  };

  const handleTaxiTypesChange = (event) => {
    const value = event.target.value;
    setCityForm(prev => ({ ...prev, taxiTypes: typeof value === 'string' ? value.split(',') : value }));
  };

  const handleServiceAreasChange = (event) => {
    const value = event.target.value;
    setCityForm(prev => ({ ...prev, serviceAreas: typeof value === 'string' ? value.split(',') : value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCityForm(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setCityForm(prev => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityForm.name.trim()) {
      setSnackbar({ open: true, message: 'City name is required', severity: 'error' });
      return;
    }
    
    const plainTextDescription = cityForm.description.replace(/<[^>]*>/g, '').trim();
    if (!plainTextDescription) {
      setSnackbar({ open: true, message: 'City description is required', severity: 'error' });
      return;
    }

    try {
      setLoading(true);
      let formData = new FormData();
      formData.append('name', cityForm.name);
      formData.append('description', cityForm.description);
      formData.append('content', cityForm.content);
      formData.append('taxiTypes', JSON.stringify(cityForm.taxiTypes));
      formData.append('serviceAreas', JSON.stringify(cityForm.serviceAreas));
      formData.append('seoTitle', cityForm.seoTitle);
      formData.append('seoDescription', cityForm.seoDescription);
      formData.append('metaKeywords', cityForm.metaKeywords);

      if (cityForm.image) {
        formData.append('image', cityForm.image);
      }

      if (editingCity) {
        await api.put(`/api/admin/taxi-cities/${editingCity._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setSnackbar({ open: true, message: 'Taxi city updated successfully!', severity: 'success' });
      } else {
        await api.post('/api/admin/taxi-cities', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setSnackbar({ open: true, message: 'Taxi city created successfully!', severity: 'success' });
      }
      
      setDialogOpen(false);
      setCityForm(initialTaxiCityForm);
      setEditingCity(null);
      fetchTaxiCities();
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to save taxi city';
      setSnackbar({ open: true, message, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (city) => {
    setEditingCity(city);
    setCityForm({
      name: city.name,
      description: city.description || '',
      content: city.content || '',
      image: null,
      taxiTypes: city.taxiTypes || [],
      serviceAreas: city.serviceAreas || [],
      seoTitle: city.seoTitle || '',
      seoDescription: city.seoDescription || '',
      metaKeywords: city.metaKeywords || ''
    });
    if (city.image) {
      setImagePreview(city.image);
    } else {
      setImagePreview(null);
    }
    setDialogOpen(true);
  };

  const handleDelete = async (cityId) => {
    try {
      setLoading(true);
      await api.delete(`/api/admin/taxi-cities/${cityId}`);
      setSnackbar({ open: true, message: 'Taxi city deleted successfully!', severity: 'success' });
      fetchTaxiCities();
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to delete taxi city', severity: 'error' });
    } finally {
      setLoading(false);
      setDeleteConfirm({ open: false, cityId: null });
    }
  };

  const handleStatusToggle = async (cityId, currentStatus) => {
    try {
      await api.put(`/api/admin/taxi-cities/${cityId}`, { isActive: !currentStatus });
      setSnackbar({ open: true, message: 'Status updated successfully!', severity: 'success' });
      fetchTaxiCities();
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to update status', severity: 'error' });
    }
  };

  const openAddDialog = () => {
    setEditingCity(null);
    setCityForm(initialTaxiCityForm);
    setImagePreview(null);
    setDialogOpen(true);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f7f9fb' }}>
      <DashboardNavbar />
      
      <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" fontWeight={600}>
            Taxi City Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openAddDialog}
            sx={{ bgcolor: '#FDB813', '&:hover': { bgcolor: '#E6A612' } }}
          >
            Add New Taxi City
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>City Name</strong></TableCell>
                <TableCell><strong>Available URLs</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Created</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taxiCities.map((city) => (
                <TableRow key={city._id}>
                  <TableCell>{city.name}</TableCell>
                  <TableCell>
                    <Typography variant="body2" color="primary" sx={{ fontFamily: 'monospace', fontSize: '12px' }}>
                      /taxi/{city.slug}
                    </Typography>
                    <Typography variant="body2" color="primary" sx={{ fontFamily: 'monospace', fontSize: '12px' }}>
                      /taxi/{city.name.toLowerCase().replace(/\s+/g, '-')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={city.isActive}
                          onChange={() => handleStatusToggle(city._id, city.isActive)}
                          size="small"
                        />
                      }
                      label={
                        <Chip
                          label={city.isActive ? 'Active' : 'Inactive'}
                          color={city.isActive ? 'success' : 'default'}
                          size="small"
                        />
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(city.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEdit(city)}
                      color="primary"
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => setDeleteConfirm({ open: true, cityId: city._id })}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add/Edit Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: { maxHeight: '90vh' }
          }}
        >
          <DialogTitle>
            {editingCity ? 'Edit Taxi City' : 'Add New Taxi City'}
          </DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleSubmit} sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="City Name"
                name="name"
                value={cityForm.name}
                onChange={handleFormChange}
                required
                sx={{ mb: 2 }}
              />
              
              <RichTextEditor
                value={cityForm.description}
                onChange={(value) => setCityForm(prev => ({ ...prev, description: value }))}
                label="Description *"
                placeholder="Enter a detailed description about the city and taxi services..."
                height={250}
                helperText="Use the toolbar to format your text. You can add headings, bold/italic text, lists, links, and more."
              />
              
              <RichTextEditor
                value={cityForm.content}
                onChange={(value) => setCityForm(prev => ({ ...prev, content: value }))}
                label="City Page Content"
                placeholder="Enter the main content that will be displayed on the taxi city page..."
                height={400}
                helperText="This content will appear on the taxi city page. You can add headings, images, videos, links, tables, and formatted text."
              />

              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Taxi Types</InputLabel>
                    <Select
                      multiple
                      value={cityForm.taxiTypes}
                      onChange={handleTaxiTypesChange}
                      input={<OutlinedInput label="Taxi Types" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} size="small" />
                          ))}
                        </Box>
                      )}
                    >
                      {taxiTypeOptions.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Service Areas"
                    name="serviceAreas"
                    value={cityForm.serviceAreas.join(', ')}
                    onChange={(e) => setCityForm(prev => ({ 
                      ...prev, 
                      serviceAreas: e.target.value.split(',').map(area => area.trim()).filter(area => area)
                    }))}
                    placeholder="Enter service areas separated by commas"
                    helperText="e.g., Airport, Railway Station, City Center"
                  />
                </Grid>
              </Grid>
              
              {/* Image Upload */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  City Image
                </Typography>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ marginBottom: 8 }}
                />
                {imagePreview && (
                  <Box sx={{ mt: 2 }}>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
                    />
                    <Button
                      size="small"
                      color="error"
                      onClick={removeImage}
                      sx={{ ml: 1 }}
                    >
                      Remove
                    </Button>
                  </Box>
                )}
              </Box>

              <TextField
                fullWidth
                label="SEO Title"
                name="seoTitle"
                value={cityForm.seoTitle}
                onChange={handleFormChange}
                sx={{ mb: 2 }}
                helperText="This will be the page title in search results"
              />
              
              <TextField
                fullWidth
                label="SEO Description"
                name="seoDescription"
                value={cityForm.seoDescription}
                onChange={handleFormChange}
                multiline
                rows={3}
                sx={{ mb: 2 }}
                helperText="This will be the description in search results"
              />
              
              <TextField
                fullWidth
                label="Meta Keywords"
                name="metaKeywords"
                value={cityForm.metaKeywords}
                onChange={handleFormChange}
                sx={{ mb: 2 }}
                helperText="Comma-separated keywords for SEO"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleSubmit} 
              variant="contained" 
              disabled={loading}
              sx={{ bgcolor: '#FDB813', '&:hover': { bgcolor: '#E6A612' } }}
            >
              {loading ? 'Saving...' : (editingCity ? 'Update' : 'Create')}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteConfirm.open}
          onClose={() => setDeleteConfirm({ open: false, cityId: null })}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this taxi city? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteConfirm({ open: false, cityId: null })}>
              Cancel
            </Button>
            <Button 
              onClick={() => handleDelete(deleteConfirm.cityId)} 
              color="error" 
              variant="contained"
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert 
            onClose={() => setSnackbar({ ...snackbar, open: false })} 
            severity={snackbar.severity}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
