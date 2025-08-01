import React, { useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/quill-custom.css';
import { Box, Typography } from '@mui/material';

const RichTextEditor = ({ 
  value, 
  onChange, 
  placeholder = "Enter text...", 
  label,
  height = 200,
  error = false,
  helperText = "",
  disabled = false
}) => {
  const quillRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  // Enhanced toolbar configuration with image upload
  const modules = useMemo(() => ({
    toolbar: {
      container: [
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
      handlers: {
        image: imageHandler
      }
    },
    clipboard: {
      matchVisual: false,
    }
  }), []);

  // Image upload handler
  function imageHandler() {
    if (isUploading) return; // Prevent multiple uploads
    
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        try {
          setIsUploading(true);
          // Create FormData for image upload
          const formData = new FormData();
          formData.append('image', file);

          // Get auth token from localStorage
          const token = localStorage.getItem('token');
          
          // Upload to your server endpoint
          const response = await fetch('/api/admin/upload/image', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            const url = data.url;
            
            // Get the quill instance
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection();
            
            // Insert the image at cursor position
            quill.insertEmbed(range.index, 'image', url);
            quill.setSelection(range.index + 1);
          } else {
            const errorData = await response.json().catch(() => ({}));
            console.error('Image upload failed:', errorData);
            alert(`Image upload failed: ${errorData.message || 'Please try again.'}`);
          }
        } catch (error) {
          console.error('Error uploading image:', error);
          alert(`Error uploading image: ${error.message || 'Please try again.'}`);
        } finally {
          setIsUploading(false);
        }
      }
    };
  }

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'color', 'background',
    'align', 'script',
    'code-block'
  ];

  const customStyles = {
    '& .ql-toolbar': {
      borderRadius: '4px 4px 0 0',
      borderColor: error ? '#d32f2f' : '#c4c4c4',
      backgroundColor: '#fafafa',
    },
    '& .ql-container': {
      borderRadius: '0 0 4px 4px', 
      borderColor: error ? '#d32f2f' : '#c4c4c4',
      fontSize: '16px',
      minHeight: `${height}px`,
    },
    '& .ql-editor': {
      minHeight: `${height - 42}px`, // Subtract toolbar height
      fontSize: '16px',
      lineHeight: '1.5',
      padding: '12px 15px',
    },
    '& .ql-editor.ql-blank::before': {
      fontSize: '16px',
      color: '#999',
      fontStyle: 'normal',
    },
    '& .ql-toolbar.ql-snow': {
      borderTop: error ? '1px solid #d32f2f' : '1px solid #c4c4c4',
      borderLeft: error ? '1px solid #d32f2f' : '1px solid #c4c4c4',
      borderRight: error ? '1px solid #d32f2f' : '1px solid #c4c4c4',
    },
    '& .ql-container.ql-snow': {
      borderBottom: error ? '1px solid #d32f2f' : '1px solid #c4c4c4',
      borderLeft: error ? '1px solid #d32f2f' : '1px solid #c4c4c4',
      borderRight: error ? '1px solid #d32f2f' : '1px solid #c4c4c4',
    },
    // Focus styles
    '& .ql-container.ql-snow:focus-within': {
      borderColor: error ? '#d32f2f' : '#1976d2',
      borderWidth: '2px',
    },
    '& .ql-toolbar.ql-snow:focus-within': {
      borderColor: error ? '#d32f2f' : '#1976d2',
      borderWidth: '2px',
    },
    // Image styles
    '& .ql-editor img': {
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '4px',
      margin: '8px 0',
    },
    // Video styles
    '& .ql-editor iframe': {
      maxWidth: '100%',
      borderRadius: '4px',
      margin: '8px 0',
    },
  };

  return (
    <Box sx={{ mb: 2 }}>
      {label && (
        <Typography 
          variant="body2" 
          sx={{ 
            mb: 1, 
            fontWeight: 500,
            color: error ? '#d32f2f' : 'text.primary'
          }}
        >
          {label}
        </Typography>
      )}
      
      <Box sx={{ ...customStyles, position: 'relative' }}>
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          modules={modules}
          formats={formats}
          readOnly={disabled}
          style={{
            backgroundColor: disabled ? '#f5f5f5' : 'white',
          }}
        />
        {isUploading && (
          <Box sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            bgcolor: 'rgba(255,255,255,0.9)',
            p: 2,
            borderRadius: 2,
            boxShadow: 2
          }}>
            <Typography variant="body2" color="primary">
              Uploading image...
            </Typography>
          </Box>
        )}
      </Box>
      
      {helperText && (
        <Typography 
          variant="caption" 
          sx={{ 
            mt: 0.5, 
            color: error ? '#d32f2f' : 'text.secondary',
            fontSize: '0.75rem'
          }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default RichTextEditor;
