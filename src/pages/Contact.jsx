import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import Navbar from '../components/Navbar';

const SKY_BLUE = '#12B6FA';
const NAVY_BLUE = '#1B314D';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the form data to your backend or email service
  };

  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: '100vh', bgcolor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 6 }}>
        <Paper elevation={6} sx={{ p: 4, maxWidth: 420, width: '100%', borderRadius: 3, boxShadow: 6 }}>
          <Typography variant="h4" fontWeight={700} color={SKY_BLUE} mb={2} align="center">
            Contact Us
          </Typography>
          <Typography variant="body1" color={NAVY_BLUE} mb={3} align="center">
            We'd love to hear from you! Fill out the form below and we'll get back to you soon.
          </Typography>
          {submitted ? (
            <Typography variant="h6" color="success.main" align="center" mt={2}>
              Thank you for contacting us! We'll be in touch soon.
            </Typography>
          ) : (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Message"
                name="message"
                value={form.message}
                onChange={handleChange}
                fullWidth
                required
                multiline
                minRows={4}
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ bgcolor: SKY_BLUE, color: 'white', fontWeight: 700, py: 1.2, fontSize: 16, borderRadius: 2, '&:hover': { bgcolor: '#0eaee6' } }}
              >
                Send Message
              </Button>
            </form>
          )}
        </Paper>
      </Box>
    </>
  );
} 