import api from './api';

/**
 * Blog API module
 * Provides methods for interacting with blog endpoints
 */
const blogAPI = {
  // Public blog endpoints
  
  /**
   * Get all published blogs with optional pagination and filtering
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number (default: 1)
   * @param {number} params.limit - Items per page (default: 10)
   * @param {string} params.search - Search query
   * @param {string} params.tag - Filter by tag
   * @param {string} params.sort - Sort order ('newest', 'oldest', 'popular')
   * @returns {Promise} API response with blogs data
   */
  getPublishedBlogs: (params = {}) => {
    const queryParams = new URLSearchParams();
    
    // Add parameters to query string
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });
    
    const queryString = queryParams.toString();
    const endpoint = `/api/blogs${queryString ? `?${queryString}` : ''}`;
    
    return api.get(endpoint);
  },

  /**
   * Get a single blog by slug
   * @param {string} slug - Blog slug
   * @returns {Promise} API response with blog data
   */
  getBlogBySlug: (slug) => {
    return api.get(`/api/blogs/${slug}`);
  },

  /**
   * Get related blogs for a specific blog
   * @param {string} blogId - Blog ID
   * @param {number} limit - Number of related blogs to fetch (default: 3)
   * @returns {Promise} API response with related blogs
   */
  getRelatedBlogs: (blogId, limit = 3) => {
    return api.get(`/api/blogs/${blogId}/related?limit=${limit}`);
  },

  /**
   * Get popular blogs
   * @param {number} limit - Number of popular blogs to fetch (default: 5)
   * @returns {Promise} API response with popular blogs
   */
  getPopularBlogs: (limit = 5) => {
    return api.get(`/api/blogs/popular?limit=${limit}`);
  },

  /**
   * Get all blog tags
   * @returns {Promise} API response with tags data
   */
  getBlogTags: () => {
    return api.get('/api/blogs/tags');
  },

  // Admin blog endpoints (require authentication)

  /**
   * Get all blogs (admin only) - includes drafts and published
   * @param {Object} params - Query parameters
   * @returns {Promise} API response with all blogs
   */
  getAllBlogs: (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });
    
    const queryString = queryParams.toString();
    const endpoint = `/api/blogs/admin/all${queryString ? `?${queryString}` : ''}`;
    
    return api.get(endpoint);
  },

  /**
   * Create a new blog (admin only)
   * @param {Object|FormData} blogData - Blog data (FormData if image included)
   * @returns {Promise} API response with created blog
   */
  createBlog: (blogData) => {
    const isFormData = blogData instanceof FormData;
    const config = isFormData ? {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    } : {};
    
    return api.post('/api/blogs/admin', blogData, config);
  },

  /**
   * Update a blog (admin only)
   * @param {string} id - Blog ID
   * @param {Object|FormData} blogData - Updated blog data (FormData if image included)
   * @returns {Promise} API response with updated blog
   */
  updateBlog: (id, blogData) => {
    const isFormData = blogData instanceof FormData;
    const config = isFormData ? {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    } : {};
    
    return api.put(`/api/blogs/admin/${id}`, blogData, config);
  },

  /**
   * Delete a blog (admin only)
   * @param {string} id - Blog ID
   * @returns {Promise} API response
   */
  deleteBlog: (id) => {
    return api.delete(`/api/blogs/admin/${id}`);
  },

  /**
   * Upload image for blog (admin only) - DEPRECATED
   * Use createBlog or updateBlog with FormData instead
   * @param {FormData} formData - Image file data
   * @returns {Promise} API response with image URL
   */
  uploadBlogImage: (formData) => {
    // This endpoint doesn't exist in backend - kept for backward compatibility
    console.warn('uploadBlogImage is deprecated. Use createBlog or updateBlog with FormData instead.');
    return api.post('/api/blogs/admin/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * Toggle blog publish status (admin only)
   * @param {string} id - Blog ID
   * @returns {Promise} API response with updated blog
   */
  togglePublishStatus: (id) => {
    return api.patch(`/api/blogs/admin/${id}/toggle-publish`);
  }
};

export default blogAPI;
