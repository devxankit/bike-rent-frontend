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
  FormControlLabel
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DashboardNavbar from '../components/DashboardNabvar';
import RichTextEditor from '../components/RichTextEditor';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { generateCitySlug } from '../utils/slugUtils';

const initialCityForm = {
  name: '',
  description: '',
  content: '',
  image: null,
  seoTitle: '',
  seoDescription: '',
  metaKeywords: ''
};

export default function CityPages() {
  const [cityPages, setCityPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCity, setEditingCity] = useState(null);
  const [cityForm, setCityForm] = useState(initialCityForm);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, cityId: null });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCityPages();
  }, []);

  const fetchCityPages = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/admin/city-pages');
      setCityPages(response.data);
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to fetch city pages', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCityForm(prev => ({ ...prev, [name]: value }));
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
    
    // Check if description has meaningful content (not just HTML tags)
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
      formData.append('seoTitle', cityForm.seoTitle);
      formData.append('seoDescription', cityForm.seoDescription);
      formData.append('metaKeywords', cityForm.metaKeywords);

      if (cityForm.image) {
        formData.append('image', cityForm.image);
      }

      if (editingCity) {
        await api.put(`/api/admin/city-pages/${editingCity._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setSnackbar({ open: true, message: 'City page updated successfully!', severity: 'success' });
      } else {
        await api.post('/api/admin/city-pages', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setSnackbar({ open: true, message: 'City page created successfully!', severity: 'success' });
      }
      
      setDialogOpen(false);
      setCityForm(initialCityForm);
      setEditingCity(null);
      fetchCityPages();
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to save city page';
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
      seoTitle: city.seoTitle || '',
      seoDescription: city.seoDescription || '',
      metaKeywords: city.metaKeywords || ''
    });
    // Set existing image preview if available
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
      await api.delete(`/api/admin/city-pages/${cityId}`);
      setSnackbar({ open: true, message: 'City page deleted successfully!', severity: 'success' });
      fetchCityPages();
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to delete city page', severity: 'error' });
    } finally {
      setLoading(false);
      setDeleteConfirm({ open: false, cityId: null });
    }
  };

  const handleStatusToggle = async (cityId, currentStatus) => {
    try {
      await api.put(`/api/admin/city-pages/${cityId}`, { isActive: !currentStatus });
      setSnackbar({ open: true, message: 'Status updated successfully!', severity: 'success' });
      fetchCityPages();
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to update status', severity: 'error' });
    }
  };

  const openAddDialog = () => {
    setEditingCity(null);
    setCityForm(initialCityForm);
    setImagePreview(null);
    setDialogOpen(true);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f7f9fb' }}>
      <DashboardNavbar />
      
      <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" fontWeight={600}>
            City Pages Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openAddDialog}
            sx={{ bgcolor: '#FDB813', '&:hover': { bgcolor: '#E6A612' } }}
          >
            Add New City
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
              {cityPages.map((city) => (
                <TableRow key={city._id}>
                  <TableCell>{city.name}</TableCell>
                  <TableCell>
                    <Typography variant="body2" color="primary" sx={{ fontFamily: 'monospace', fontSize: '12px' }}>
                      /bikes/{generateCitySlug(city.name)}
                    </Typography>
                    <Typography variant="body2" color="primary" sx={{ fontFamily: 'monospace', fontSize: '12px' }}>
                      /bikes/{city.name}
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
          maxWidth="lg" 
          fullWidth
          PaperProps={{
            sx: { maxHeight: '90vh' }
          }}
        >
          <DialogTitle>
            {editingCity ? 'Edit City Page' : 'Add New City Page'}
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
                placeholder="Enter a detailed description about the city and bike rental services..."
                height={250}
                helperText="Use the toolbar to format your text. You can add headings, bold/italic text, lists, links, and more."
              />
              
              <RichTextEditor
                value={cityForm.content}
                onChange={(value) => setCityForm(prev => ({ ...prev, content: value }))}
                label="City Page Content"
                placeholder="Enter the main content that will be displayed on the city page below the bike listings..."
                height={400}
                helperText="This content will appear on the city page below the bike listings. You can add headings, images, videos, links, tables, and formatted text. Use the image button in the toolbar to upload images directly into the content."
              />
              
              {/* Enhanced Image Upload */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                  City Image
                </Typography>
                
                {imagePreview ? (
                  <Box sx={{ position: 'relative', display: 'inline-block' }}>
                    <Box
                      component="img"
                      src={imagePreview}
                      alt="Preview"
                      sx={{
                        width: 200,
                        height: 120,
                        objectFit: 'cover',
                        borderRadius: 2,
                        border: '2px solid #e0e0e0'
                      }}
                    />
                    <IconButton
                      onClick={removeImage}
                      sx={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        bgcolor: '#f44336',
                        color: 'white',
                        width: 24,
                        height: 24,
                        '&:hover': { bgcolor: '#d32f2f' }
                      }}
                      size="small"
                    >
                      ✕
                    </IconButton>
                  </Box>
                ) : (
                  <Box>
                    <input
                      accept="image/*"
                      type="file"
                      id="image-upload"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="image-upload">
                      <Box
                        sx={{
                          border: '2px dashed #ccc',
                          borderRadius: 2,
                          p: 3,
                          textAlign: 'center',
                          cursor: 'pointer',
                          bgcolor: '#fafafa',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: '#FDB813',
                            bgcolor: '#FEF9E7'
                          }
                        }}
                      >
                        <Box sx={{ mb: 1 }}>📁</Box>
                        <Typography variant="body2" color="text.secondary">
                          Click to upload image
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Supported formats: JPG, PNG, GIF (Max 5MB)
                        </Typography>
                      </Box>
                    </label>
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
              />
              
              <TextField
                fullWidth
                label="SEO Description"
                name="seoDescription"
                value={cityForm.seoDescription}
                onChange={handleFormChange}
                multiline
                rows={2}
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                label="Meta Keywords"
                name="metaKeywords"
                value={cityForm.metaKeywords}
                onChange={handleFormChange}
                helperText="Comma-separated keywords"
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
              {editingCity ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteConfirm.open} onClose={() => setDeleteConfirm({ open: false, cityId: null })}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this city page? This action cannot be undone and will also delete the corresponding React component file.
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
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar(s => ({ ...s, open: false }))}
        >
          <Alert onClose={() => setSnackbar(s => ({ ...s, open: false }))} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
