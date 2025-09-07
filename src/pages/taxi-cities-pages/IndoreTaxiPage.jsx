import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Typography, Container, Grid, Card, CardContent, Button, Chip, Alert } from '@mui/material';
import { FaTaxi, FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaStar } from 'react-icons/fa';
import TaxiNavBar from '../../components/taxi-components/TaxiNavBar';
import api from '../../utils/api';

const IndoreTaxiPage = () => {
  const [taxiServices, setTaxiServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTaxiServices();
  }, []);

  const fetchTaxiServices = async () => {
    try {
      setLoading(true);
      // This would fetch actual taxi services for the city
      // For now, we'll use mock data
      const mockServices = [
        {
          id: 1,
          type: 'Economy',
          description: 'Affordable taxi service for everyday travel',
          basePrice: 50,
          pricePerKm: 12,
          features: ['AC', 'GPS', 'Professional Driver'],
          rating: 4.5
        },
        {
          id: 2,
          type: 'Premium',
          description: 'Luxury taxi service with premium vehicles',
          basePrice: 100,
          pricePerKm: 20,
          features: ['AC', 'GPS', 'Professional Driver', 'WiFi', 'Water Bottle'],
          rating: 4.8
        }
      ];
      setTaxiServices(mockServices);
    } catch (err) {
      setError('Failed to fetch taxi services');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Taxi Service in Indore | BookYourRide - Best Taxi Service</title>
        <meta name="description" content="Book reliable taxi services in Indore. Professional drivers, comfortable vehicles, and transparent pricing. Book your ride now!" />
        <meta name="keywords" content="taxi service Indore, cab booking Indore, taxi rental Indore, Indore taxi service" />
      </Helmet>
      
      <TaxiNavBar />
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#FDB813', fontWeight: 'bold' }}>
          Taxi Service in Indore
        </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Professional taxi services with comfortable vehicles and experienced drivers
          </Typography>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <Typography>Loading taxi services...</Typography>
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {taxiServices.map((service) => (
              <Grid item xs={12} md={6} key={service.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <FaTaxi style={{ marginRight: 8, color: '#FDB813' }} />
                      <Typography variant="h6" component="h2">
                        {service.type} Taxi
                      </Typography>
                      <Box display="flex" alignItems="center" ml="auto">
                        <FaStar style={{ color: '#ffc107', marginRight: 4 }} />
                        <Typography variant="body2">{service.rating}</Typography>
                      </Box>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {service.description}
                    </Typography>
                    
                    <Box mb={2}>
                      <Typography variant="h6" color="primary">
                        ₹{service.basePrice} + ₹{service.pricePerKm}/km
                      </Typography>
                    </Box>
                    
                    <Box mb={2}>
                      {service.features.map((feature, index) => (
                        <Chip
                          key={index}
                          label={feature}
                          size="small"
                          sx={{ mr: 1, mb: 1 }}
                        />
                      ))}
                    </Box>
                    
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<FaTaxi />}
                      sx={{ mt: 'auto' }}
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default IndoreTaxiPage;
