import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Checkbox, 
  FormControlLabel, 
  Snackbar, 
  Alert, 
  IconButton, 
  Avatar, 
  Tabs, 
  Tab, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Popover, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl,
  Chip,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Switch,
  FormGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Tooltip,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Collapse
} from '@mui/material';
import DashboardNavbar from '../components/DashboardNabvar';
import AdminSidebar from '../components/AdminSidebar';
import api from '../utils/api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AddIcon from '@mui/icons-material/Add';
import ExploreIcon from '@mui/icons-material/Explore';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RemoveIcon from '@mui/icons-material/Remove';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupIcon from '@mui/icons-material/Group';
import LanguageIcon from '@mui/icons-material/Language';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';

const initialForm = {
  name: '',
  description: '',
  price: '',
  originalPrice: '',
  duration: '',
  location: '',
  difficulty: '',
  groupSize: '',
  languages: '',
  features: '',
  highlights: '',
  inclusions: '',
  exclusions: '',
  whatToBring: '',
  cancellationPolicy: '',
  bestTimeToVisit: '',
  ageRestriction: '',
  fitnessLevel: '',
  category: '',
  tags: '',
  ownerPhone: '',
  payAtPickup: false,
  isFeatured: false,
  isActive: true,
  itinerary: JSON.stringify([
    { day: 1, title: '', activities: [] }
  ])
};

const initialItinerary = [
  { day: 1, title: '', activities: [''] }
];

export default function AdminTours() {
  const [tours, setTours] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [editId, setEditId] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [tab, setTab] = useState(0);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, tourId: null, anchorEl: null });
  const [tourFormOpen, setTourFormOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [itinerary, setItinerary] = useState(initialItinerary);
  const [activeStep, setActiveStep] = useState(0);
  const [expandedAccordion, setExpandedAccordion] = useState('basic');

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // First check authentication status
      try {
        const authRes = await api.get('/api/tours/admin/auth-status');
      } catch (authError) {
        console.error('Auth check failed:', authError.response?.data);
        setSnackbar({ open: true, message: 'Authentication failed. Please log in as admin.', severity: 'error' });
        return;
      }
      
      const res = await api.get('/api/tours/admin/all');
      setTours(res.data);
    } catch (error) {
      console.error('Failed to fetch tours:', error);
      console.error('Error response:', error.response?.data);
      setSnackbar({ open: true, message: 'Failed to fetch tours', severity: 'error' });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (name === 'images' && files) {
      const fileArray = Array.from(files);
      
      // Validate file types
      const allowedTypes = [
        'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 
        'image/gif', 'image/bmp', 'image/tiff', 'image/svg+xml'
      ];
      
      const validFiles = fileArray.filter(file => {
        if (!allowedTypes.includes(file.type)) {
          setSnackbar({ 
            open: true, 
            message: `Invalid file type: ${file.name}. Only JPEG, PNG, WebP, GIF, BMP, TIFF, and SVG files are allowed.`, 
            severity: 'error' 
          });
          return false;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          setSnackbar({ 
            open: true, 
            message: `File too large: ${file.name}. Maximum size is 5MB.`, 
            severity: 'error' 
          });
          return false;
        }
        return true;
      });
      
      // Limit to 5 images
      if (validFiles.length > 5) {
        setSnackbar({ 
          open: true, 
          message: 'Maximum 5 images allowed. Only first 5 will be selected.', 
          severity: 'warning' 
        });
        validFiles.splice(5);
      }
      
      setSelectedImages(validFiles);
      
      // Create previews for all valid images
      const previews = validFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(previews);
    } else if (type === 'checkbox') {
      setForm(f => ({ ...f, [name]: checked }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  // Itinerary management functions
  const addItineraryDay = () => {
    const newDay = itinerary.length + 1;
    setItinerary([...itinerary, { day: newDay, title: '', activities: [''] }]);
  };

  const removeItineraryDay = (index) => {
    if (itinerary.length > 1) {
      const updatedItinerary = itinerary.filter((_, i) => i !== index);
      // Re-number the days
      const renumberedItinerary = updatedItinerary.map((day, i) => ({
        ...day,
        day: i + 1
      }));
      setItinerary(renumberedItinerary);
    }
  };

  const updateItineraryDay = (index, field, value) => {
    const updatedItinerary = [...itinerary];
    updatedItinerary[index] = { ...updatedItinerary[index], [field]: value };
    setItinerary(updatedItinerary);
  };

  const addActivity = (dayIndex) => {
    const updatedItinerary = [...itinerary];
    updatedItinerary[dayIndex].activities.push('');
    setItinerary(updatedItinerary);
  };

  const removeActivity = (dayIndex, activityIndex) => {
    const updatedItinerary = [...itinerary];
    if (updatedItinerary[dayIndex].activities.length > 1) {
      updatedItinerary[dayIndex].activities.splice(activityIndex, 1);
      setItinerary(updatedItinerary);
    }
  };

  const updateActivity = (dayIndex, activityIndex, value) => {
    const updatedItinerary = [...itinerary];
    updatedItinerary[dayIndex].activities[activityIndex] = value;
    setItinerary(updatedItinerary);
  };

  // Image management functions
  const removeImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    
    setSelectedImages(updatedImages);
    setImagePreviews(updatedPreviews);
  };

  const clearAllImages = () => {
    setSelectedImages([]);
    setImagePreviews([]);
  };

  const handleItineraryChange = (e) => {
    const { name, value } = e.target;
    try {
      const itinerary = JSON.parse(value);
      setForm(f => ({ ...f, [name]: value }));
    } catch (error) {
      // If JSON is invalid, just store the string value
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Prevent form submission on Enter key press in input fields
    // Only allow submission via the submit button
  };

  const handleNext = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Only submit if we're on the final step (step 3 - Images & Settings)
    if (activeStep !== 3) {
      return;
    }
    
    setLoading(true);
    
    // Validate required fields before submission
    const requiredFields = ['name', 'description', 'price', 'duration', 'location', 'difficulty', 'groupSize', 'ownerPhone', 'category'];
    const missingFields = requiredFields.filter(field => !form[field] || form[field].toString().trim() === '');
    
    if (missingFields.length > 0) {
      setSnackbar({ 
        open: true, 
        message: `Please fill in all required fields: ${missingFields.join(', ')}`, 
        severity: 'error' 
      });
      setLoading(false);
      
      // Focus on the first missing field
      const firstMissingField = missingFields[0];
      const fieldElement = document.querySelector(`[name="${firstMissingField}"]`);
      if (fieldElement) {
        fieldElement.focus();
        fieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    const formData = new FormData();
    
    // Add all form fields
    Object.keys(form).forEach(key => {
      if (key !== 'images' && key !== 'itinerary') {
        formData.append(key, form[key]);
      }
    });
    
    
    // Add itinerary as JSON string
    const validItinerary = itinerary.filter(day => 
      day.title.trim() !== '' && 
      day.activities.some(activity => activity.trim() !== '')
    );
    formData.append('itinerary', JSON.stringify(validItinerary));
    
    // Add images (only if selected)
    if (selectedImages && selectedImages.length > 0) {
      selectedImages.forEach((image, index) => {
        formData.append('images', image);
      });
    }

    try {
      if (editId) {
        await api.put(`/api/tours/${editId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSnackbar({ open: true, message: 'Tour updated successfully!', severity: 'success' });
      } else {
        await api.post('/api/tours', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSnackbar({ open: true, message: 'Tour added successfully!', severity: 'success' });
      }
      
      resetForm();
      setTourFormOpen(false);
      fetchTours();
    } catch (error) {
      console.error('Tour save error:', error);
      let errorMessage = 'Failed to save tour';
      
      if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
        errorMessage = 'Request timed out. Please try again with smaller images (max 5MB each).';
      } else if (error.code === 'ERR_CONNECTION_RESET' || error.message?.includes('ERR_CONNECTION_RESET')) {
        errorMessage = 'Connection lost. Please check your internet connection and try again.';
      } else if (error.response?.status === 408) {
        errorMessage = 'Image upload timeout. Please try with smaller images.';
      } else if (error.response?.status === 400 && error.response?.data?.message?.includes('Invalid image file')) {
        errorMessage = 'Invalid image file. Please upload valid image files (JPEG, PNG, WebP, GIF, BMP, TIFF, SVG).';
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.details) {
        errorMessage = `Validation failed: ${error.response.data.details.join(', ')}`;
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. Please check your connection and try again.';
      } else if (error.response?.status === 413) {
        errorMessage = 'File too large. Please select images smaller than 5MB each.';
      }
      
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditId(null);
    setForm(initialForm);
    setItinerary(initialItinerary);
    setImagePreviews([]);
    setSelectedImages([]);
    setActiveStep(0);
    setExpandedAccordion('basic');
  };

  const handleEdit = (tour) => {
    setEditId(tour._id);
    setForm({
      name: tour.name || '',
      description: tour.description || '',
      price: tour.price || '',
      originalPrice: tour.originalPrice || '',
      duration: tour.duration || '',
      location: tour.location || '',
      difficulty: tour.difficulty || '',
      groupSize: tour.groupSize || '',
      languages: tour.languages ? tour.languages.join(', ') : '',
      features: tour.features ? tour.features.join(', ') : '',
      highlights: tour.highlights ? tour.highlights.join(', ') : '',
      inclusions: tour.inclusions ? tour.inclusions.join(', ') : '',
      exclusions: tour.exclusions ? tour.exclusions.join(', ') : '',
      whatToBring: tour.whatToBring ? tour.whatToBring.join(', ') : '',
      cancellationPolicy: tour.cancellationPolicy || '',
      bestTimeToVisit: tour.bestTimeToVisit || '',
      ageRestriction: tour.ageRestriction || '',
      fitnessLevel: tour.fitnessLevel || '',
      category: tour.category || '',
      tags: tour.tags ? tour.tags.join(', ') : '',
      ownerPhone: tour.ownerPhone || '',
      payAtPickup: !!tour.payAtPickup,
      isFeatured: !!tour.isFeatured,
      isActive: !!tour.isActive,
      itinerary: JSON.stringify(tour.itinerary || [{ day: 1, title: '', activities: [] }])
    });
    
    // Load itinerary data
    if (tour.itinerary && Array.isArray(tour.itinerary) && tour.itinerary.length > 0) {
      setItinerary(tour.itinerary);
    } else {
      setItinerary(initialItinerary);
    }
    
    setImagePreviews(tour.images || []);
    setSelectedImages([]);
    setActiveStep(0);
    setExpandedAccordion('basic');
    setTourFormOpen(true);
  };

  const handleDelete = (id, event) => {
    setDeleteDialog({ open: true, tourId: id, anchorEl: event.currentTarget });
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/api/tours/${deleteDialog.tourId}`);
      setSnackbar({ open: true, message: 'Tour deleted successfully!', severity: 'success' });
      fetchTours();
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to delete tour', severity: 'error' });
    } finally {
      setDeleteDialog({ open: false, tourId: null, anchorEl: null });
    }
  };

  const toggleFeatured = async (tour) => {
    try {
      await api.patch(`/api/tours/${tour._id}/featured`, {
        isFeatured: !tour.isFeatured
      });
      setSnackbar({ open: true, message: `Tour ${!tour.isFeatured ? 'featured' : 'unfeatured'} successfully!`, severity: 'success' });
      fetchTours();
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to update featured status', severity: 'error' });
    }
  };

  const toggleActive = async (tour) => {
    try {
      await api.patch(`/api/tours/${tour._id}/active`, {
        isActive: !tour.isActive
      });
      setSnackbar({ open: true, message: `Tour ${!tour.isActive ? 'activated' : 'deactivated'} successfully!`, severity: 'success' });
      fetchTours();
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to update active status', severity: 'error' });
    }
  };

  // Filter tours based on tab
  const filteredTours = tours.filter(tour => {
    if (tab === 0) return true; // All tours
    if (tab === 1) return tour.isActive; // Active tours
    if (tab === 2) return tour.isFeatured; // Featured tours
    if (tab === 3) return !tour.isActive; // Deactivated tours
    return true;
  });

  const stats = [
    { label: 'Total Tours', value: tours.length, color: '#3b82f6' },
    { label: 'Featured Tours', value: tours.filter(t => t.isFeatured).length, color: '#f59e0b' },
    { label: 'Active Tours', value: tours.filter(t => t.isActive).length, color: '#10b981' },
    { label: 'Inactive Tours', value: tours.filter(t => !t.isActive).length, color: '#ef4444' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f7f9fb' }}>
      <DashboardNavbar />
      <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 56px)' }}>
        <AdminSidebar />
        <Box sx={{ flex: 1, pl: { md: 0 }, pr: 0 }}>
          <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 2, px: 1 }}>
            {/* Header */}
            <Box sx={{ bgcolor: '#FDB813', color: '#fff', borderRadius: 2, p: 2, mb: 2 }}>
              <Typography variant="h5" fontWeight={700} sx={{ fontSize: 26 }}>
                Tour Management
              </Typography>
              <Typography variant="body2" mt={0.5} sx={{ fontSize: 15 }}>
                Manage your tour packages and featured selections
              </Typography>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
              {stats.map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <Card sx={{ bgcolor: '#fff', borderRadius: 1.5, p: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <Box sx={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: '50%', 
                        bgcolor: stat.color, 
                        mr: 1 
                      }} />
                      <Typography variant="h6" fontWeight={700} sx={{ fontSize: 18 }}>
                        {stat.value}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: 13 }}>
                      {stat.label}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Action Bar */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
                <Tab label="All Tours" />
                <Tab label="Active" />
                <Tab label="Featured" />
                <Tab label="Deactivated" />
              </Tabs>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  resetForm();
                  setTourFormOpen(true);
                }}
                sx={{ bgcolor: '#FDB813', color: '#fff', fontWeight: 600 }}
              >
                Add New Tour
              </Button>
            </Box>

            {/* Tours Grid */}
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
              gap: 2,
              '@media (min-width: 600px)': { gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' },
              '@media (min-width: 900px)': { gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' },
              '@media (min-width: 1200px)': { gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }
            }}>
              {filteredTours.map((tour) => (
                <Card key={tour._id} sx={{ 
                  bgcolor: '#fff', 
                  borderRadius: 2, 
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s ease',
                  '&:hover': { transform: 'translateY(-2px)' },
                  height: '100%'
                }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={tour.images?.[0] || '/images/bg.png'}
                      alt={tour.name}
                      sx={{
                        objectFit: 'cover',
                        width: '100%',
                        aspectRatio: '16/9'
                      }}
                    />
                    <CardContent sx={{ p: 1.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                        <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: 14, flex: 1, lineHeight: 1.2 }}>
                          {tour.name}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.25 }}>
                          <IconButton
                            size="small"
                            onClick={() => toggleFeatured(tour)}
                            sx={{ color: tour.isFeatured ? '#f59e0b' : '#9ca3af', p: 0.5, minWidth: 28, height: 28 }}
                          >
                            {tour.isFeatured ? <StarIcon sx={{ fontSize: 16 }} /> : <StarBorderIcon sx={{ fontSize: 16 }} />}
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => toggleActive(tour)}
                            sx={{ color: tour.isActive ? '#10b981' : '#ef4444', p: 0.5, minWidth: 28, height: 28 }}
                          >
                            {tour.isActive ? <VisibilityIcon sx={{ fontSize: 16 }} /> : <VisibilityOffIcon sx={{ fontSize: 16 }} />}
                          </IconButton>
                        </Box>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontSize: 11, lineHeight: 1.3, display: 'block' }}>
                        {tour.description?.substring(0, 50)}...
                      </Typography>
                      
                      <Box sx={{ display: 'flex', gap: 0.5, mb: 0.5, flexWrap: 'wrap' }}>
                        <Chip label={tour.category} size="small" sx={{ fontSize: 9, height: 18 }} color="primary" />
                        <Chip label={tour.difficulty} size="small" sx={{ fontSize: 9, height: 18 }} color="secondary" />
                        {tour.isFeatured && <Chip label="Featured" size="small" sx={{ fontSize: 9, height: 18 }} color="warning" />}
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle2" color="primary" fontWeight={600} sx={{ fontSize: 13 }}>
                          ₹{tour.price}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.25 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(tour)}
                            sx={{ color: '#3b82f6', p: 0.5, minWidth: 28, height: 28 }}
                          >
                            <EditIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={(e) => handleDelete(tour._id, e)}
                            sx={{ color: '#ef4444', p: 0.5, minWidth: 28, height: 28 }}
                          >
                            <DeleteIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
              ))}
            </Box>

            {filteredTours.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <ExploreIcon sx={{ fontSize: 64, color: '#9ca3af', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No tours found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {tab === 0 ? 'Add your first tour package' : 
                   tab === 1 ? 'No active tours' : 
                   tab === 2 ? 'No featured tours yet' : 
                   'No deactivated tours'}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Add/Edit Tour Dialog */}
          <Dialog open={tourFormOpen} onClose={() => {
            resetForm();
            setTourFormOpen(false);
          }} maxWidth="lg" fullWidth>
            <DialogTitle sx={{ fontSize: 18, py: 1.5, position: 'relative', pr: 4, bgcolor: '#FDB813', color: '#fff' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ExploreIcon />
                {editId ? 'Edit Tour Package' : 'Add New Tour Package'}
              </Box>
              <IconButton
                aria-label="close"
                onClick={() => {
                  resetForm();
                  setTourFormOpen(false);
                }}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: '#fff',
                }}
                size="small"
              >
                <span style={{ fontSize: 22, fontWeight: 'bold', lineHeight: 1 }}>&times;</span>
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 0, maxHeight: '85vh', overflow: 'auto' }}>
              <form onSubmit={handleFormSubmit} style={{ width: '100%' }} encType="multipart/form-data">
                <Box sx={{ p: 3 }}>
                  {/* Stepper for form sections */}
                  <Stepper activeStep={activeStep} orientation="horizontal" sx={{ mb: 3 }}>
                    <Step>
                      <StepLabel>Basic Info</StepLabel>
                    </Step>
                    <Step>
                      <StepLabel>Tour Details</StepLabel>
                    </Step>
                    <Step>
                      <StepLabel>Itinerary</StepLabel>
                    </Step>
                    <Step>
                      <StepLabel>Images & Settings</StepLabel>
                    </Step>
                  </Stepper>

                  {/* Step 1: Basic Information */}
                  <Collapse in={activeStep === 0}>
                    <Accordion expanded={expandedAccordion === 'basic'} onChange={() => setExpandedAccordion(expandedAccordion === 'basic' ? false : 'basic')}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <InfoIcon color="primary" />
                          <Typography variant="h6">Basic Information</Typography>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Tour Name"
                              name="name"
                              value={form.name}
                              onChange={handleChange}
                              required
                              fullWidth
                              variant="outlined"
                              helperText="Enter a catchy name for your tour"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Category"
                              name="category"
                              value={form.category}
                              onChange={handleChange}
                              required
                              fullWidth
                              variant="outlined"
                              helperText="e.g., Adventure, Cultural, Nature"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              label="Description"
                              name="description"
                              value={form.description}
                              onChange={handleChange}
                              required
                              multiline
                              rows={4}
                              fullWidth
                              variant="outlined"
                              helperText="Provide a detailed description of your tour"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Price (₹)"
                              name="price"
                              value={form.price}
                              onChange={handleChange}
                              required
                              type="number"
                              fullWidth
                              variant="outlined"
                              helperText="Current selling price"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Original Price (₹)"
                              name="originalPrice"
                              value={form.originalPrice}
                              onChange={handleChange}
                              type="number"
                              fullWidth
                              variant="outlined"
                              helperText="Original price before discount (optional)"
                            />
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </Collapse>

                  {/* Step 2: Tour Details */}
                  <Collapse in={activeStep === 1}>
                    <Accordion expanded={expandedAccordion === 'details'} onChange={() => setExpandedAccordion(expandedAccordion === 'details' ? false : 'details')}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <ScheduleIcon color="primary" />
                          <Typography variant="h6">Tour Details</Typography>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Duration"
                              name="duration"
                              value={form.duration}
                              onChange={handleChange}
                              required
                              fullWidth
                              variant="outlined"
                              helperText="e.g., 3 days, 1 week, 2 hours"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Location"
                              name="location"
                              value={form.location}
                              onChange={handleChange}
                              required
                              fullWidth
                              variant="outlined"
                              helperText="Main location or starting point"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="outlined">
                              <InputLabel>Difficulty Level</InputLabel>
                              <Select
                                name="difficulty"
                                value={form.difficulty}
                                label="Difficulty Level"
                                onChange={handleChange}
                              >
                                <MenuItem value="Easy">Easy</MenuItem>
                                <MenuItem value="Moderate">Moderate</MenuItem>
                                <MenuItem value="Hard">Hard</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Group Size"
                              name="groupSize"
                              value={form.groupSize}
                              onChange={handleChange}
                              required
                              fullWidth
                              variant="outlined"
                              helperText="Maximum number of participants"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Languages"
                              name="languages"
                              value={form.languages}
                              onChange={handleChange}
                              fullWidth
                              variant="outlined"
                              helperText="Comma separated: English, Hindi, Spanish"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Best Time to Visit"
                              name="bestTimeToVisit"
                              value={form.bestTimeToVisit}
                              onChange={handleChange}
                              fullWidth
                              variant="outlined"
                              helperText="e.g., October to March"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Age Restriction"
                              name="ageRestriction"
                              value={form.ageRestriction}
                              onChange={handleChange}
                              fullWidth
                              variant="outlined"
                              helperText="e.g., 12+ years, No restriction"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Fitness Level"
                              name="fitnessLevel"
                              value={form.fitnessLevel}
                              onChange={handleChange}
                              fullWidth
                              variant="outlined"
                              helperText="e.g., Basic, Intermediate, Advanced"
                            />
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </Collapse>

                  {/* Step 3: Itinerary Builder */}
                  <Collapse in={activeStep === 2}>
                    <Accordion expanded={expandedAccordion === 'itinerary'} onChange={() => setExpandedAccordion(expandedAccordion === 'itinerary' ? false : 'itinerary')}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <ScheduleIcon color="primary" />
                          <Typography variant="h6">Tour Itinerary</Typography>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle1" gutterBottom>
                            Plan your tour day by day
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Add detailed itinerary for each day of your tour
                          </Typography>
                        </Box>

                        {itinerary.map((day, dayIndex) => (
                          <Card key={dayIndex} sx={{ mb: 2, border: '1px solid #e0e0e0' }}>
                            <CardContent>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" color="primary">
                                  Day {day.day}
                                </Typography>
                                {itinerary.length > 1 && (
                                  <IconButton
                                    onClick={() => removeItineraryDay(dayIndex)}
                                    color="error"
                                    size="small"
                                  >
                                    <RemoveIcon />
                                  </IconButton>
                                )}
                              </Box>

                              <TextField
                                label="Day Title"
                                value={day.title}
                                onChange={(e) => updateItineraryDay(dayIndex, 'title', e.target.value)}
                                fullWidth
                                variant="outlined"
                                sx={{ mb: 2 }}
                                placeholder="e.g., Arrival and City Tour"
                              />

                              <Typography variant="subtitle2" gutterBottom>
                                Activities
                              </Typography>
                              {day.activities.map((activity, activityIndex) => (
                                <Box key={activityIndex} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                  <TextField
                                    label={`Activity ${activityIndex + 1}`}
                                    value={activity}
                                    onChange={(e) => updateActivity(dayIndex, activityIndex, e.target.value)}
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    placeholder="e.g., Visit local market, Lunch at restaurant"
                                  />
                                  {day.activities.length > 1 && (
                                    <IconButton
                                      onClick={() => removeActivity(dayIndex, activityIndex)}
                                      color="error"
                                      size="small"
                                    >
                                      <RemoveIcon />
                                    </IconButton>
                                  )}
                                </Box>
                              ))}

                              <Button
                                startIcon={<AddIcon />}
                                onClick={() => addActivity(dayIndex)}
                                variant="outlined"
                                size="small"
                                sx={{ mt: 1 }}
                              >
                                Add Activity
                              </Button>
                            </CardContent>
                          </Card>
                        ))}

                        <Button
                          startIcon={<AddIcon />}
                          onClick={addItineraryDay}
                          variant="contained"
                          sx={{ mt: 2 }}
                        >
                          Add Another Day
                        </Button>
                      </AccordionDetails>
                    </Accordion>
                  </Collapse>

                  {/* Step 4: Images and Settings */}
                  <Collapse in={activeStep === 3}>
                    <Accordion expanded={expandedAccordion === 'images'} onChange={() => setExpandedAccordion(expandedAccordion === 'images' ? false : 'images')}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PhotoCameraIcon color="primary" />
                          <Typography variant="h6">Images & Settings</Typography>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={2}>
                          {/* Images Section */}
                          <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom>
                              Tour Images (Upload up to 5 images)
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                              <Button
                                variant="outlined"
                                component="label"
                                startIcon={<PhotoCameraIcon />}
                                disabled={selectedImages.length >= 5}
                              >
                                Upload Images ({selectedImages.length}/5)
                                 <input
                                   type="file"
                                   name="images"
                                   accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/bmp,image/tiff,image/svg+xml"
                                   multiple
                                   hidden
                                   onChange={handleChange}
                                 />
                              </Button>
                              {selectedImages.length > 0 && (
                                <Button
                                  variant="outlined"
                                  color="error"
                                  onClick={clearAllImages}
                                  startIcon={<ClearIcon />}
                                >
                                  Clear All
                                </Button>
                              )}
                            </Box>
                            
                            {imagePreviews.length > 0 && (
                              <Box sx={{ mt: 2 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                  Selected Images ({imagePreviews.length}/5):
                                </Typography>
                                <Box sx={{ 
                                  display: 'grid', 
                                  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', 
                                  gap: 2,
                                  mt: 1
                                }}>
                                  {imagePreviews.map((preview, index) => (
                                    <Card key={index} sx={{ 
                                      position: 'relative',
                                      width: 120, 
                                      height: 120,
                                      '&:hover .remove-btn': {
                                        opacity: 1
                                      }
                                    }}>
                                      <CardMedia
                                        component="img"
                                        height="120"
                                        image={preview}
                                        alt={`Preview ${index + 1}`}
                                        sx={{ 
                                          objectFit: 'cover',
                                          width: '100%',
                                          aspectRatio: '16/9'
                                        }}
                                      />
                                      <IconButton
                                        className="remove-btn"
                                        onClick={() => removeImage(index)}
                                        sx={{
                                          position: 'absolute',
                                          top: 4,
                                          right: 4,
                                          bgcolor: 'rgba(0,0,0,0.5)',
                                          color: 'white',
                                          opacity: 0,
                                          transition: 'opacity 0.2s',
                                          '&:hover': {
                                            bgcolor: 'rgba(0,0,0,0.7)',
                                          }
                                        }}
                                        size="small"
                                      >
                                        <RemoveIcon fontSize="small" />
                                      </IconButton>
                                      <Box sx={{
                                        position: 'absolute',
                                        bottom: 4,
                                        left: 4,
                                        bgcolor: 'rgba(0,0,0,0.7)',
                                        color: 'white',
                                        px: 1,
                                        py: 0.5,
                                        borderRadius: 1,
                                        fontSize: '0.75rem'
                                      }}>
                                        {index + 1}
                                      </Box>
                                    </Card>
                                  ))}
                                </Box>
                              </Box>
                            )}
                          </Grid>

                          {/* Features and Highlights */}
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Features"
                              name="features"
                              value={form.features}
                              onChange={handleChange}
                              multiline
                              rows={3}
                              fullWidth
                              variant="outlined"
                              helperText="Comma separated features"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Highlights"
                              name="highlights"
                              value={form.highlights}
                              onChange={handleChange}
                              multiline
                              rows={3}
                              fullWidth
                              variant="outlined"
                              helperText="Comma separated highlights"
                            />
                          </Grid>

                          {/* Inclusions and Exclusions */}
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Inclusions"
                              name="inclusions"
                              value={form.inclusions}
                              onChange={handleChange}
                              multiline
                              rows={3}
                              fullWidth
                              variant="outlined"
                              helperText="What's included in the tour"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Exclusions"
                              name="exclusions"
                              value={form.exclusions}
                              onChange={handleChange}
                              multiline
                              rows={3}
                              fullWidth
                              variant="outlined"
                              helperText="What's not included in the tour"
                            />
                          </Grid>

                          {/* Additional Information */}
                          <Grid item xs={12}>
                            <TextField
                              label="What to Bring"
                              name="whatToBring"
                              value={form.whatToBring}
                              onChange={handleChange}
                              fullWidth
                              variant="outlined"
                              helperText="Comma separated list of items to bring"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              label="Cancellation Policy"
                              name="cancellationPolicy"
                              value={form.cancellationPolicy}
                              onChange={handleChange}
                              multiline
                              rows={3}
                              fullWidth
                              variant="outlined"
                              helperText="Describe your cancellation policy"
                            />
                          </Grid>

                          {/* Owner Information */}
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Owner Phone"
                              name="ownerPhone"
                              value={form.ownerPhone}
                              onChange={handleChange}
                              required
                              fullWidth
                              variant="outlined"
                              helperText="Contact number for tour inquiries"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Tags"
                              name="tags"
                              value={form.tags}
                              onChange={handleChange}
                              fullWidth
                              variant="outlined"
                              helperText="Comma separated tags for search"
                            />
                          </Grid>

                          {/* Settings */}
                          <Grid item xs={12}>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="subtitle1" gutterBottom>
                              Tour Settings
                            </Typography>
                            <FormGroup row>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={form.payAtPickup}
                                    onChange={handleChange}
                                    name="payAtPickup"
                                  />
                                }
                                label="Pay at Pickup"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={form.isFeatured}
                                    onChange={handleChange}
                                    name="isFeatured"
                                  />
                                }
                                label="Featured Tour"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={form.isActive}
                                    onChange={handleChange}
                                    name="isActive"
                                  />
                                }
                                label="Active Tour"
                              />
                            </FormGroup>
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </Collapse>

                  {/* Navigation Buttons */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handlePrevious}
                      startIcon={<ClearIcon />}
                    >
                      Previous
                    </Button>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {activeStep < 3 ? (
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          endIcon={<AddIcon />}
                        >
                          Next
                        </Button>
                      ) : (
                        <>
                          <Button
                            type="button"
                            variant="contained"
                            disabled={loading}
                            onClick={handleSubmit}
                            startIcon={<SaveIcon />}
                            sx={{ bgcolor: '#FDB813', '&:hover': { bgcolor: '#e6a611' } }}
                          >
                            {editId ? 'Update Tour' : 'Create Tour'}
                          </Button>
                        </>
                      )}
                    </Box>
                  </Box>
                </Box>
              </form>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Popover */}
          <Popover
            open={deleteDialog.open}
            anchorEl={deleteDialog.anchorEl}
            onClose={() => setDeleteDialog({ open: false, tourId: null, anchorEl: null })}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{ sx: { p: 2, minWidth: 200 } }}
          >
            <Typography variant="subtitle1" mb={1}>Confirm Delete</Typography>
            <Typography variant="body2" mb={2}>Are you sure you want to delete this tour?</Typography>
            <Box display="flex" justifyContent="flex-end" gap={1}>
              <Button
                onClick={() => setDeleteDialog({ open: false, tourId: null, anchorEl: null })}
                size="small"
              >
                Cancel
              </Button>
              <Button onClick={confirmDelete} color="error" variant="contained" size="small">
                Delete
              </Button>
            </Box>
          </Popover>

          {/* Snackbar */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={() => setSnackbar(s => ({ ...s, open: false }))}
          >
            <Alert
              onClose={() => setSnackbar(s => ({ ...s, open: false }))}
              severity={snackbar.severity}
              sx={{ width: '100%' }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Box>
  );
}
