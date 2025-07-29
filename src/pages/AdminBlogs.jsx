import React, { useState, useEffect, useRef } from 'react';
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
  Alert,
  Snackbar,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  FormControlLabel,
  Switch,
  CircularProgress,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Visibility as ViewIcon,
  CloudUpload as UploadIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import blogAPI from '../utils/blogAPI';
import DashboardNavbar from '../components/DashboardNabvar';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [imageUploading, setImageUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);
  const [error, setError] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, blogId: null });

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    tags: '',
    thumbnailUrl: '', // for URL string
    seoTitle: '',
    seoDescription: '',
    metaKeywords: '',
    status: 'published',
  });
  const [thumbnailFile, setThumbnailFile] = useState(null); // for File object

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await blogAPI.getAllBlogs();
      setBlogs(Array.isArray(response.data.blogs) ? response.data.blogs : []);
      setError('');
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to fetch blogs', severity: 'error' });
      setError(error.response?.data?.message || error.message || 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title || '',
        slug: blog.slug || '',
        excerpt: blog.excerpt || '',
        content: blog.content || '',
        tags: blog.tags ? blog.tags.join(', ') : '',
        thumbnailUrl: blog.thumbnail || '',
        seoTitle: blog.seoTitle || '',
        seoDescription: blog.seoDescription || '',
        metaKeywords: blog.metaKeywords || '',
        status: blog.status || 'draft', // Pre-fill status when editing
      });
      setThumbnailFile(null); // Clear file state when editing
      setImagePreview(''); // Clear preview when editing
    } else {
      setEditingBlog(null);
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        tags: '',
        thumbnailUrl: '',
        seoTitle: '',
        seoDescription: '',
        metaKeywords: '',
        status: 'published', // Default to published for new blogs
      });
      setThumbnailFile(null); // Clear file state for new blog
      setImagePreview(''); // Clear preview for new blog
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingBlog(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      tags: '',
      thumbnailUrl: '',
      seoTitle: '',
      seoDescription: '',
      metaKeywords: '',
      status: 'published', // Reset status to published on close
    });
    setThumbnailFile(null); // Clear file state on close
    setImagePreview(''); // Clear preview on close
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Auto-generate slug from title if it's the title field and we're creating a new blog
      ...(name === 'title' && !editingBlog ? {
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      } : {})
    }));
    if (name === 'thumbnailUrl') {
      setThumbnailFile(null); // clear file if URL is entered
      setImagePreview(value);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.content) {
      setSnackbar({ open: true, message: 'Title and content are required', severity: 'error' });
      return;
    }

    setLoading(true);
    try {
      // Always generate a slug if missing
      let slug = formData.slug;
      if (!slug && formData.title) {
        slug = formData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      }

      let blogData;
      if (thumbnailFile) {
        blogData = new FormData();
        blogData.append('title', formData.title);
        blogData.append('slug', slug); // Always append slug
        blogData.append('excerpt', formData.excerpt);
        blogData.append('content', formData.content);
        blogData.append('status', formData.status || 'draft');
        blogData.append('tags', formData.tags);
        blogData.append('seoTitle', formData.seoTitle);
        blogData.append('seoDescription', formData.seoDescription);
        blogData.append('metaKeywords', formData.metaKeywords);
        blogData.append('thumbnail', thumbnailFile); // File object
      } else {
        blogData = {
          title: formData.title,
          slug, // Always include slug
          excerpt: formData.excerpt,
          content: formData.content,
          status: formData.status || 'draft',
          tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
          seoTitle: formData.seoTitle,
          seoDescription: formData.seoDescription,
          metaKeywords: formData.metaKeywords,
          // Only include thumbnail if it's a non-empty string
          ...(formData.thumbnailUrl && formData.thumbnailUrl.trim() && { thumbnail: formData.thumbnailUrl.trim() }),
        };
      }
      if (editingBlog) {
        await blogAPI.updateBlog(editingBlog._id, blogData);
        setSnackbar({ open: true, message: 'Blog updated successfully!', severity: 'success' });
      } else {
        await blogAPI.createBlog(blogData);
        setSnackbar({ open: true, message: 'Blog created successfully!', severity: 'success' });
      }
      handleCloseDialog();
      fetchBlogs();
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Failed to ${editingBlog ? 'update' : 'create'} blog`,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRequest = (blogId) => {
    setDeleteDialog({ open: true, blogId });
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    try {
      await blogAPI.deleteBlog(deleteDialog.blogId);
      setSnackbar({ open: true, message: 'Blog deleted successfully!', severity: 'success' });
      fetchBlogs();
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to delete blog', severity: 'error' });
    } finally {
      setLoading(false);
      setDeleteDialog({ open: false, blogId: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, blogId: null });
  };

  // Image upload handler
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setSnackbar({ open: true, message: 'Please select an image file', severity: 'error' });
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setSnackbar({ open: true, message: 'Image size should be less than 5MB', severity: 'error' });
      return;
    }

    // Store the file object for submission
    setThumbnailFile(file);
    setFormData(prev => ({ ...prev, thumbnailUrl: '' })); // clear URL if file is selected

    // Create local preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle content change for ReactQuill
  const handleContentChange = (content) => {
    setFormData(prev => ({ ...prev, content }));
  };

  // ReactQuill configuration
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'color', 'background',
    'align', 'script',
    'code-block'
  ];

  const filteredBlogs = blogs.filter(blog =>
    blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <DashboardNavbar />
      
      <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Blog Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{ bgcolor: '#facc15', '&:hover': { bgcolor: '#eab308' } }}
          >
            Create Blog
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Blogs
                </Typography>
                <Typography variant="h4" component="div">
                  {blogs.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Published Blogs
              </Typography>
              <Typography variant="h4" component="div">
                {blogs.filter(blog => blog.status === 'published').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        </Grid>

        {/* Search */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search blogs by title, content, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Blogs Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Slug</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Loading blogs...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Alert severity="error">{error}</Alert>
                  </TableCell>
                </TableRow>
              ) : filteredBlogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No blogs found
                  </TableCell>
                </TableRow>
              ) : (
                filteredBlogs.map((blog) => (
                  <TableRow key={blog._id}>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight="medium">
                        {blog.title}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {blog.excerpt?.substring(0, 80)}...
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace">
                        {blog.slug}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {blog.tags?.slice(0, 2).map((tag, index) => (
                          <Chip
                            key={index}
                            label={tag}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                        {blog.tags?.length > 2 && (
                          <Chip
                            label={`+${blog.tags.length - 2}`}
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>{formatDate(blog.createdAt)}</TableCell>
                    <TableCell>
                      <Chip
                        label={blog.status === 'published' ? 'Published' : 'Draft'}
                        color={blog.status === 'published' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => window.open(`/blogs/${blog.slug}`, '_blank')}
                        title="View Blog"
                      >
                        <ViewIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(blog)}
                        title="Edit Blog"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteRequest(blog._id)}
                        title="Delete Blog"
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Create/Edit Blog Dialog */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>
            {editingBlog ? 'Edit Blog' : 'Create New Blog'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <TextField
                name="title"
                label="Title"
                value={formData.title}
                onChange={handleInputChange}
                fullWidth
                required
              />
              <TextField
                name="slug"
                label="Slug"
                value={formData.slug}
                onChange={handleInputChange}
                fullWidth
                helperText="URL-friendly version of the title"
              />
              <TextField
                name="excerpt"
                label="Excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={2}
                helperText="Short description shown in blog listings"
              />
              {/* Content Editor */}
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Content *
                </Typography>
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={handleContentChange}
                  modules={quillModules}
                  formats={quillFormats}
                  style={{ minHeight: '200px' }}
                  placeholder="Write your blog content here..."
                />
              </Box>
              <TextField
                name="tags"
                label="Tags"
                value={formData.tags}
                onChange={handleInputChange}
                fullWidth
                helperText="Comma-separated tags (e.g., travel, bikes, tips)"
              />
              {/* Image Upload Section */}
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Featured Image
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {/* Image Preview */}
                  {(formData.thumbnailUrl || imagePreview) && (
                    <Box sx={{ textAlign: 'center' }}>
                      <img
                        src={formData.thumbnailUrl || imagePreview}
                        alt="Preview"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '200px',
                          borderRadius: '8px',
                          border: '1px solid #ddd'
                        }}
                      />
                    </Box>
                  )}
                  
                  {/* File Upload Button */}
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                      ref={fileInputRef}
                    />
                    <Button
                      variant="outlined"
                      startIcon={imageUploading ? <CircularProgress size={20} /> : <UploadIcon />}
                      onClick={() => fileInputRef.current?.click()}
                      disabled={imageUploading}
                    >
                      {imageUploading ? 'Uploading...' : 'Upload Image'}
                    </Button>
                    
                    {/* OR separator */}
                    <Typography variant="body2" color="textSecondary">
                      OR
                    </Typography>
                  </Box>
                  
                  {/* Manual URL Input */}
                  <TextField
                    name="thumbnailUrl"
                    label="Image URL"
                    value={formData.thumbnailUrl}
                    onChange={handleInputChange}
                    fullWidth
                    size="small"
                    helperText="Enter image URL directly or upload a file above"
                  />
                </Box>
              </Box>
              <TextField
                name="seoTitle"
                label="SEO Title"
                value={formData.seoTitle}
                onChange={handleInputChange}
                fullWidth
                helperText="SEO meta title"
              />
              <TextField
                name="seoDescription"
                label="SEO Description"
                value={formData.seoDescription}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={2}
                helperText="SEO meta description"
              />
              <TextField
                name="metaKeywords"
                label="Meta Keywords"
                value={formData.metaKeywords}
                onChange={handleInputChange}
                fullWidth
                helperText="Comma-separated keywords for SEO"
              />
              <TextField
                select
                name="status"
                label="Status"
                value={formData.status}
                onChange={handleInputChange}
                fullWidth
                SelectProps={{ native: true }}
                sx={{ mb: 2 }}
                helperText="Set blog as draft or published"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={loading}
              sx={{ bgcolor: '#facc15', '&:hover': { bgcolor: '#eab308' } }}
            >
              {loading ? 'Saving...' : (editingBlog ? 'Update' : 'Create')}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialog.open} onClose={handleDeleteCancel}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this blog?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="error" variant="contained" disabled={loading}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default AdminBlogs;
