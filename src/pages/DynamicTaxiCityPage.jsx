import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Typography, Container, Grid, Card, CardContent, Button, Chip, Alert, CircularProgress } from '@mui/material';
import { FaTaxi, FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaStar, FaPhone, FaEnvelope } from 'react-icons/fa';
import TaxiNavBar from '../components/taxi-components/TaxiNavBar';
import api from '../utils/api';
import { parseTaxiCityFromSlug } from '../utils/slugUtils';

const DynamicTaxiCityPage = () => {
  const { citySlug } = useParams();
  const [taxiCity, setTaxiCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTaxiCity();
  }, [citySlug]);

  const fetchTaxiCity = async () => {
    try {
      setLoading(true);
      console.log('Fetching taxi city with slug:', citySlug);
      
      // Parse the city name from the slug (handles both short and full formats)
      const cityName = parseTaxiCityFromSlug(citySlug);
      console.log('Parsed city name:', cityName);
      
      // Try to fetch by the original slug first (for full slugs like "taxi-service-in-indore")
      let response;
      try {
        response = await api.get(`/api/taxi-cities/${citySlug}`);
      } catch (slugError) {
        // If that fails, try with just the city name (for short slugs like "indore")
        console.log('Trying with city name:', cityName);
        response = await api.get(`/api/taxi-cities/${cityName}`);
      }
      
      console.log('Taxi city data received:', response.data);
      setTaxiCity(response.data);
    } catch (err) {
      console.error('Error fetching taxi city:', err);
      setError('Taxi city not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !taxiCity) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <>
      <Helmet>
        <title>{taxiCity.seoTitle || `Taxi Service in ${taxiCity.name} | BookYourRide`}</title>
        <meta name="description" content={taxiCity.seoDescription || `Book reliable taxi services in ${taxiCity.name}. Professional drivers, comfortable vehicles, and transparent pricing.`} />
        <meta name="keywords" content={taxiCity.metaKeywords || `taxi service ${taxiCity.name}, cab booking ${taxiCity.name}, taxi rental ${taxiCity.name}`} />
        <meta property="og:title" content={taxiCity.seoTitle || `Taxi Service in ${taxiCity.name}`} />
        <meta property="og:description" content={taxiCity.seoDescription || `Book reliable taxi services in ${taxiCity.name}. Professional drivers, comfortable vehicles, and transparent pricing.`} />
        <meta property="og:image" content={taxiCity.image || '/images/taxi-bg-1.png'} />
      </Helmet>
      
      <TaxiNavBar />
      
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: taxiCity.image ? `url(${taxiCity.image})` : "url('/images/taxi-bg-1.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ color: 'white', textAlign: 'center' }}>
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
              Taxi Service in {taxiCity.name}
            </Typography>
            <Typography variant="h5" sx={{ mb: 3, opacity: 0.9 }}>
              Professional taxi services with comfortable vehicles and experienced drivers
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<FaTaxi />}
              sx={{ 
                bgcolor: '#FDB813', 
                '&:hover': { bgcolor: '#E6A612' },
                px: 4,
                py: 1.5
              }}
            >
              Book Your Taxi Now
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* City Description */}
        {taxiCity.description && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#FDB813', fontWeight: 'bold', mb: 3 }}>
              About {taxiCity.name} Taxi Services
            </Typography>
            <Box 
              sx={{ 
                '& p': { mb: 2 },
                '& h1, & h2, & h3, & h4, & h5, & h6': { color: '#FDB813', fontWeight: 'bold', mb: 1, mt: 2 },
                '& ul, & ol': { pl: 3, mb: 2 },
                '& li': { mb: 0.5 }
              }}
              dangerouslySetInnerHTML={{ __html: taxiCity.description }}
            />
          </Box>
        )}

        {/* Taxi Types Section */}
        {taxiCity.taxiTypes && taxiCity.taxiTypes.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#FDB813', fontWeight: 'bold', mb: 3 }}>
              Available Taxi Types
            </Typography>
            <Grid container spacing={3}>
              {taxiCity.taxiTypes.map((taxiType, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box display="flex" alignItems="center" mb={2}>
                        <FaTaxi style={{ marginRight: 8, color: '#FDB813', fontSize: '1.5rem' }} />
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                          {taxiType.type || taxiType}
                        </Typography>
                      </Box>
                      
                      {taxiType.description && (
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {taxiType.description}
                        </Typography>
                      )}
                      
                      <Box mb={2}>
                        {taxiType.basePrice && (
                          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                            ₹{taxiType.basePrice}
                            {taxiType.pricePerKm && ` + ₹${taxiType.pricePerKm}/km`}
                          </Typography>
                        )}
                      </Box>
                      
                      <Box mb={2}>
                        <Chip
                          label={taxiType.isAvailable ? 'Available' : 'Not Available'}
                          color={taxiType.isAvailable ? 'success' : 'error'}
                          size="small"
                        />
                      </Box>
                      
                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<FaTaxi />}
                        disabled={!taxiType.isAvailable}
                        sx={{ mt: 'auto' }}
                      >
                        Book {taxiType.type || taxiType}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Service Areas */}
        {taxiCity.serviceAreas && taxiCity.serviceAreas.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#FDB813', fontWeight: 'bold', mb: 3 }}>
              Service Areas
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {taxiCity.serviceAreas.map((area, index) => (
                <Chip
                  key={index}
                  label={area}
                  icon={<FaMapMarkerAlt />}
                  color="primary"
                  variant="outlined"
                  sx={{ mb: 1 }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* City Content */}
        {taxiCity.content && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#FDB813', fontWeight: 'bold', mb: 3 }}>
              More About {taxiCity.name}
            </Typography>
            <Box 
              sx={{ 
                '& p': { mb: 2 },
                '& h1, & h2, & h3, & h4, & h5, & h6': { color: '#FDB813', fontWeight: 'bold', mb: 1, mt: 2 },
                '& ul, & ol': { pl: 3, mb: 2 },
                '& li': { mb: 0.5 },
                '& img': { maxWidth: '100%', height: 'auto', borderRadius: 1 }
              }}
              dangerouslySetInnerHTML={{ __html: taxiCity.content }}
            />
          </Box>
        )}

        {/* Contact Section */}
        <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#FDB813', fontWeight: 'bold', mb: 3 }}>
              Book Your Taxi
            </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, textAlign: 'center' }}>
                <FaPhone style={{ fontSize: '2rem', color: '#FDB813', marginBottom: '1rem' }} />
                <Typography variant="h6" gutterBottom>
                  Call Now
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Speak to our customer service team
                </Typography>
                <Button variant="contained" startIcon={<FaPhone />}>
                  +91 9876543210
                </Button>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, textAlign: 'center' }}>
                <FaEnvelope style={{ fontSize: '2rem', color: '#FDB813', marginBottom: '1rem' }} />
                <Typography variant="h6" gutterBottom>
                  Email Us
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Send us your requirements
                </Typography>
                <Button variant="outlined" startIcon={<FaEnvelope />}>
                  info@bookyourride.in
                </Button>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default DynamicTaxiCityPage;
