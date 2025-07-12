import React, { forwardRef } from 'react';
import { Box, Typography, Link, Grid } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const SKY_BLUE = '#12B6FA';
const FOOTER_GRAY = '#222831';

const Footer = forwardRef(function Footer(props, ref) {
  return (
    <Box component="footer" ref={ref} sx={{ bgcolor: FOOTER_GRAY, color: 'white', pt: 6, pb: 2, px: 2 }}>
      <Grid container spacing={4} justifyContent="center" alignItems="flex-start" sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 0, sm: 2 } }}>
        <Grid item xs={12} md={6} sx={{ mb: { xs: 4, md: 0 }, textAlign: 'left' }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>About Bike Rent</Typography>
          <Typography variant="body2" sx={{ opacity: 0.85, maxWidth: 520, mx: 0 }}>
            Bike Rent is your trusted partner for convenient, affordable, and reliable bike rentals in Indore. Explore the city with ease, enjoy flexible booking, and experience top-notch customer service. Our mission is to make urban mobility simple and accessible for everyone.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ mb: { xs: 4, md: 0 }, textAlign: { xs: 'center', md: 'left' } }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>Contact Us</Typography>
          <Box display="flex" alignItems="center" justifyContent={{ xs: 'center', md: 'flex-start' }} mb={1}>
            <PhoneIcon sx={{ color: SKY_BLUE, mr: 1 }} />
            <Typography variant="body2">+91 979875 74681</Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent={{ xs: 'center', md: 'flex-start' }} mb={1}>
            <EmailIcon sx={{ color: SKY_BLUE, mr: 1 }} />
            <Typography variant="body2">support@bikerent.com</Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent={{ xs: 'center', md: 'flex-start' }}>
            <LocationOnIcon sx={{ color: SKY_BLUE, mr: 1 }} />
            <Typography variant="body2">Indore, Madhya Pradesh, India</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>Quick Links</Typography>
          <Box display="flex" flexDirection="column" gap={1} alignItems={{ xs: 'center', md: 'flex-start' }}>
            <Link href="/" color={SKY_BLUE} underline="hover">Home</Link>
            <Link href="/about" color={SKY_BLUE} underline="hover">About</Link>
            <Link href="/contact" color={SKY_BLUE} underline="hover">Contact</Link>
            <Link href="/login" color={SKY_BLUE} underline="hover">Login / Register</Link>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ height: 24 }} />
      <Typography variant="body2" align="center" sx={{ opacity: 0.7 }}>
        © {new Date().getFullYear()} Bike Rent. All rights reserved.
      </Typography>
    </Box>
  );
});

export default Footer; 