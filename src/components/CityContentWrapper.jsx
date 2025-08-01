import React from 'react';
import { Box, Typography } from '@mui/material';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const CityContentWrapper = ({ children, cityData }) => {
  const scrollRef = useScrollAnimation();

  return (
    <>
      {children}
      
      {/* City Page Content - Displayed below bike listings in main content area only */}
      {cityData && cityData.content && (
        <div ref={scrollRef} className="animate-fade-in-up" style={{ marginLeft: '320px' }}>
          <Box 
            sx={{ 
              mt: 8,
              mb: 6,
              p: 4,
              bgcolor: 'white',
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid #e5e7eb',
              position: 'relative',
              overflow: 'hidden',
              maxWidth: 'calc(100vw - 320px - 48px)', // Account for sidebar width and padding
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #facc15 0%, #f59e0b 100%)',
                borderRadius: '12px 12px 0 0'
              }
            }}
          >
           
            
            <Box 
              dangerouslySetInnerHTML={{ __html: cityData.content }}
              sx={{
                '& h1, & h2, & h3, & h4, & h5, & h6': {
                  color: '#1f2937',
                  fontWeight: 600,
                  mb: 2,
                  mt: 3,
                  lineHeight: 1.3
                },
                '& h1': { fontSize: { xs: '1.75rem', md: '2rem' } },
                '& h2': { fontSize: { xs: '1.5rem', md: '1.75rem' } },
                '& h3': { fontSize: { xs: '1.25rem', md: '1.5rem' } },
                '& h4': { fontSize: { xs: '1.125rem', md: '1.25rem' } },
                '& h5': { fontSize: { xs: '1rem', md: '1.125rem' } },
                '& h6': { fontSize: '1rem' },
                '& p': {
                  color: '#4b5563',
                  lineHeight: 1.8,
                  mb: 3,
                  fontSize: '1rem',
                  textAlign: 'justify'
                },
                '& ul, & ol': {
                  color: '#4b5563',
                  lineHeight: 1.8,
                  mb: 3,
                  pl: 4
                },
                '& li': {
                  mb: 1.5,
                  position: 'relative'
                },
                '& ul li::before': {
                  content: '"•"',
                  color: '#facc15',
                  fontWeight: 'bold',
                  position: 'absolute',
                  left: '-1.5rem'
                },
                '& a': {
                  color: '#facc15',
                  textDecoration: 'none',
                  fontWeight: 500,
                  borderBottom: '1px solid transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderBottomColor: '#facc15',
                    color: '#f59e0b'
                  }
                },
                '& img': {
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  my: 3,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                },
                '& blockquote': {
                  borderLeft: '4px solid #facc15',
                  pl: 3,
                  ml: 0,
                  fontStyle: 'italic',
                  color: '#6b7280',
                  bgcolor: '#f9fafb',
                  p: 3,
                  borderRadius: 2,
                  my: 3,
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%)',
                    borderRadius: 2,
                    zIndex: -1
                  }
                },
                '& strong, & b': {
                  fontWeight: 700,
                  color: '#1f2937'
                },
                '& em, & i': {
                  fontStyle: 'italic',
                  color: '#6b7280'
                },
                '& table': {
                  width: '100%',
                  borderCollapse: 'collapse',
                  my: 3,
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                },
                '& th, & td': {
                  border: '1px solid #e5e7eb',
                  padding: '12px',
                  textAlign: 'left'
                },
                '& th': {
                  bgcolor: '#facc15',
                  color: '#1f2937',
                  fontWeight: 600
                },
                '& tr:nth-of-type(even)': {
                  bgcolor: '#f9fafb'
                }
              }}
            />
          </Box>
        </div>
      )}
    </>
  );
};

export default CityContentWrapper; 