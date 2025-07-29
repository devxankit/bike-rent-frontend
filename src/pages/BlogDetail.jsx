import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Divider,
  CircularProgress,
  Alert,
  IconButton,
  Breadcrumbs,
  Link as MuiLink
} from '@mui/material';
import {
  AccessTime,
  Visibility,
  Share,
  Facebook,
  Twitter,
  LinkedIn,
  ArrowBack
} from '@mui/icons-material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import blogAPI from '../utils/blogAPI';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await blogAPI.getBlogBySlug(slug);
        setBlog(response.data);
        
        // Fetch related blogs if current blog has tags
        if (response.data.tags && response.data.tags.length > 0) {
          try {
            const relatedResponse = await blogAPI.getRelatedBlogs(response.data._id, {
              tags: response.data.tags,
              limit: 3
            });
            setRelatedBlogs(relatedResponse.data);
          } catch (err) {
            console.error('Error fetching related blogs:', err);
          }
        }
        
        setError('');
      } catch (err) {
        setError('Blog not found or failed to load.');
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blog.title;
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        if (navigator.share) {
          navigator.share({
            title: title,
            url: url
          });
          return;
        }
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const handleRelatedBlogClick = (relatedSlug) => {
    navigate(`/blogs/${relatedSlug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading blog...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Box textAlign="center">
          <IconButton onClick={() => navigate('/blogs')} size="large">
            <ArrowBack />
          </IconButton>
          <Typography variant="body1">
            Go back to blog list
          </Typography>
        </Box>
      </Container>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <MuiLink component={Link} to="/" underline="hover">
          Home
        </MuiLink>
        <MuiLink component={Link} to="/blogs" underline="hover">
          Blog
        </MuiLink>
        <Typography color="text.primary">{blog.title}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <article>
            {/* Blog Header */}
            <Box mb={4}>
              <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                {blog.title}
              </Typography>
              
              {blog.excerpt && (
                <Typography variant="h6" color="text.secondary" paragraph>
                  {blog.excerpt}
                </Typography>
              )}

              {/* Meta Information */}
              <Box display="flex" alignItems="center" flexWrap="wrap" gap={3} mb={3}>
                <Box display="flex" alignItems="center" gap={1}>
                  <AccessTime fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {blog.readTime || 5} min read
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Visibility fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {blog.views || 0} views
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Published on {formatDate(blog.publishedAt || blog.createdAt)}
                </Typography>
                {blog.author && (
                  <Typography variant="body2" color="text.secondary">
                    By {typeof blog.author === 'object' ? (blog.author.name || blog.author.email || 'Unknown Author') : blog.author}
                  </Typography>
                )}
              </Box>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <Box mb={3}>
                  {blog.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
              )}

              {/* Share Buttons */}
              <Box display="flex" alignItems="center" gap={1} mb={3}>
                <Typography variant="body2" color="text.secondary" mr={1}>
                  Share:
                </Typography>
                <IconButton 
                  size="small" 
                  onClick={() => handleShare('facebook')}
                  sx={{ color: '#1877F2' }}
                >
                  <Facebook />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => handleShare('twitter')}
                  sx={{ color: '#1DA1F2' }}
                >
                  <Twitter />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => handleShare('linkedin')}
                  sx={{ color: '#0A66C2' }}
                >
                  <LinkedIn />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => handleShare('share')}
                >
                  <Share />
                </IconButton>
              </Box>
            </Box>

            {/* Blog Content */}
            <Box
              sx={{
                '& p': { mb: 2, lineHeight: 1.7 },
                '& h1, & h2, & h3, & h4, & h5, & h6': { 
                  mt: 3, 
                  mb: 2, 
                  fontWeight: 'bold' 
                },
                '& img': { 
                  maxWidth: '100%', 
                  height: 'auto',
                  borderRadius: '4px',
                  my: 2
                },
                '& ul, & ol': { mb: 2, pl: 3 },
                '& blockquote': {
                  borderLeft: '4px solid',
                  borderColor: 'primary.main',
                  pl: 2,
                  ml: 0,
                  fontStyle: 'italic',
                  bgcolor: 'grey.50',
                  py: 1,
                  px: 2,
                  borderRadius: '0 4px 4px 0'
                },
                '& code': {
                  bgcolor: 'grey.100',
                  px: 1,
                  py: 0.5,
                  borderRadius: '4px',
                  fontFamily: 'monospace'
                },
                '& pre': {
                  bgcolor: 'grey.100',
                  p: 2,
                  borderRadius: '4px',
                  overflow: 'auto'
                }
              }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* SEO Tags at bottom */}
            {blog.seo && (blog.seo.keywords || blog.seo.description) && (
              <Box mt={4} p={3} bgcolor="grey.50" borderRadius={2}>
                <Typography variant="h6" gutterBottom>
                  About this article
                </Typography>
                {blog.seo.description && (
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {blog.seo.description}
                  </Typography>
                )}
                {blog.seo.keywords && (
                  <Typography variant="body2" color="text.secondary">
                    <strong>Keywords:</strong> {blog.seo.keywords}
                  </Typography>
                )}
              </Box>
            )}
          </article>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Back to Blog Button */}
          <Box mb={3}>
            <Card>
              <CardContent>
                <Box 
                  display="flex" 
                  alignItems="center" 
                  gap={1}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate('/blogs')}
                >
                  <ArrowBack />
                  <Typography variant="body1">
                    Back to all blogs
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Related Blogs */}
          {relatedBlogs.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Related Articles
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {relatedBlogs.map((relatedBlog, index) => (
                  <Box key={relatedBlog._id}>
                    <Box
                      sx={{
                        py: 2,
                        cursor: 'pointer',
                        '&:hover': { bgcolor: 'action.hover' }
                      }}
                      onClick={() => handleRelatedBlogClick(relatedBlog.slug)}
                    >
                      {relatedBlog.thumbnail && (
                        <CardMedia
                          component="img"
                          height="120"
                          image={relatedBlog.thumbnail}
                          alt={relatedBlog.title}
                          sx={{ 
                            objectFit: 'cover',
                            borderRadius: 1,
                            mb: 1
                          }}
                        />
                      )}
                      <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                        {relatedBlog.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {relatedBlog.excerpt || 
                         (relatedBlog.content.length > 100 
                           ? relatedBlog.content.substring(0, 100) + '...' 
                           : relatedBlog.content)
                        }
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1}>
                        <AccessTime fontSize="small" color="action" />
                        <Typography variant="caption" color="text.secondary">
                          {relatedBlog.readTime || 5} min read
                        </Typography>
                      </Box>
                    </Box>
                    {index < relatedBlogs.length - 1 && <Divider />}
                  </Box>
                ))}
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlogDetail;
