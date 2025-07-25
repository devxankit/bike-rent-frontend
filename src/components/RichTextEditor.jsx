import React, { useMemo } from 'react';
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
  // Custom toolbar configuration
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'align': [] }],
        ['link', 'blockquote'],
        ['clean']
      ],
    },
    clipboard: {
      matchVisual: false,
    }
  }), []);

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'list', 'bullet', 'indent',
    'align', 'link', 'blockquote'
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
      
      <Box sx={customStyles}>
        <ReactQuill
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
