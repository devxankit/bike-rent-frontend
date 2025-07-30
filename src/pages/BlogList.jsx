import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  InputAdornment,
  Pagination,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';
import { Search, AccessTime, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import blogAPI from '../utils/blogAPI';
import Navbar from '../components/Navbar';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [popularBlogs, setPopularBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const fetchBlogs = async (currentPage = 1, search = '') => {
    try {
      setLoading(true);
      const response = await blogAPI.getPublishedBlogs({
        page: currentPage,
        limit: 6,
        search
      });
      setBlogs(response.data.blogs);
      setTotalPages(response.data.totalPages);
      setError('');
    } catch (err) {
      setError('Failed to load blogs. Please try again later.');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPopularBlogs = async () => {
    try {
      const response = await blogAPI.getPopularBlogs();
      setPopularBlogs(response.data.slice(0, 3));
    } catch (err) {
      console.error('Error fetching popular blogs:', err);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await blogAPI.getBlogTags();
      setTags(response.data.slice(0, 10));
    } catch (err) {
      console.error('Error fetching tags:', err);
    }
  };

  useEffect(() => {
    fetchBlogs(page, searchTerm);
  }, [page]);

  useEffect(() => {
    fetchPopularBlogs();
    fetchTags();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchBlogs(1, searchTerm);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBlogClick = (slug) => {
    navigate(`/blogs/${slug}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + '...';
  };

  if (loading && blogs.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading blogs...
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            Our Blog
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={3}>
            Discover the latest insights about bike rentals, travel tips, and city guides
          </Typography>

          {/* Search Bar */}
          <Box component="form" onSubmit={handleSearch} maxWidth="md" mx="auto">
            <TextField
              fullWidth
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ minWidth: 120 }}
            >
              Search
            </Button>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {blogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog._id}>
              <Box
                component="div"
                onClick={() => handleBlogClick(blog.slug)}
                sx={{
                  cursor: 'pointer',
                  height: '100%',
                  width: 280,
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover .MuiCard-root': {
                    boxShadow: 6,
                    transform: 'translateY(-2px) scale(1.01)'
                  }
                }}
              >
                <Card sx={{ borderRadius: 2, boxShadow: 2, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'visible', transition: 'box-shadow 0.2s, transform 0.2s' }}>
                  <Box sx={{ position: 'relative' }}>
                    {blog.thumbnail && (
                      <CardMedia
                        component="img"
                        image={blog.thumbnail}
                        alt={blog.title}
                        sx={{
                          width: 280,
                          height: 160,
                          objectFit: 'cover',
                          borderRadius: '8px 8px 0 0',
                          background: '#f3f3f3',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                        }}
                      />
                    )}
                    {/* Author/Category Badge */}
                    <Box sx={{ position: 'absolute', top: 12, left: 12, bgcolor: '#FFDF00', color: '#000', px: 1.5, py: 0.5, borderRadius: 1, fontSize: 12, fontWeight: 600, zIndex: 2 }}>
                      {blog.author?.name || 'Author'}
                    </Box>
                  </Box>
                  <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', p: 2 }}>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 1, fontSize: 17, cursor: 'pointer', '&:hover': { color: '#FFDF00' } }}>
                      {blog.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: 14 }}>
                      {blog.excerpt || truncateContent(blog.content, 100)}
                    </Typography>
                    {/* Category/Tags */}
                    <Box sx={{ mb: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {blog.tags && blog.tags.slice(0, 2).map((tag) => (
                        <Chip key={tag} label={tag} size="small" sx={{ bgcolor: '#facc15', color: '#111', fontWeight: 600 }} />
                      ))}
                      {blog.tags && blog.tags.length > 2 && (
                        <Chip label={`+${blog.tags.length - 2}`} size="small" sx={{ bgcolor: '#facc15', color: '#111', fontWeight: 600 }} />
                      )}
                    </Box>
                    {/* Meta Info */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(blog.publishedAt || blog.createdAt)}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <AccessTime fontSize="small" color="action" />
                        <Typography variant="caption" color="text.secondary">
                          {blog.readTime || 5} min read
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <Visibility fontSize="small" color="action" />
                        <Typography variant="caption" color="text.secondary">
                          {blog.views || 0} views
                        </Typography>
                      </Box>
                    </Box>
                    {/* Social Icons */}
                    <Box sx={{ mt: 'auto', display: 'flex', gap: 1 }}>
                      <Button size="small" sx={{ minWidth: 0, p: 0.5, color: '#1877F2' }} onClick={e => { e.stopPropagation(); window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/blogs/${blog.slug}`, '_blank'); }}>
                        <i className="fab fa-facebook-f" style={{ fontSize: 16 }}></i>
                      </Button>
                      <Button size="small" sx={{ minWidth: 0, p: 0.5, color: '#1DA1F2' }} onClick={e => { e.stopPropagation(); window.open(`https://twitter.com/intent/tweet?url=${window.location.origin}/blogs/${blog.slug}&text=${encodeURIComponent(blog.title)}`, '_blank'); }}>
                        <i className="fab fa-twitter" style={{ fontSize: 16 }}></i>
                      </Button>
                      <Button size="small" sx={{ minWidth: 0, p: 0.5, color: '#0A66C2' }} onClick={e => { e.stopPropagation(); window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.origin}/blogs/${blog.slug}`, '_blank'); }}>
                        <i className="fab fa-linkedin-in" style={{ fontSize: 16 }}></i>
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
        {/* Pagination */}
        {totalPages > 1 && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        )}
      </Container>
    </>
  );
};

export default BlogList;
