import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Tabs,
  Tab,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import { useNavigate, Navigate } from 'react-router-dom';
import api, { getApiUrl } from '../utils/api';

const SKY_BLUE = '#12B6FA';
const NAVY_BLUE = '#1B314D';

export default function Auth() {
  const [tab, setTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [login, setLogin] = useState({ email: '', password: '' });
  const [signup, setSignup] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [auth, setAuth] = useState({ token: null, user: null });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // On mount, check for token
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setAuth({ token, user: JSON.parse(user) });
    }
  }, []);

  if (auth.token) {
    return <Navigate to="/" replace />;
  }

  const handleTabChange = (event, newValue) => setTab(newValue);

  const handleLoginChange = (e) => setLogin({ ...login, [e.target.name]: e.target.value });
  const handleSignupChange = (e) => setSignup({ ...signup, [e.target.name]: e.target.value });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch(getApiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(login)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setAuth({ token: data.token, user: data.user });
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      setError(err.message);
      setSuccess('');
      toast.error(err.message);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (signup.password !== signup.confirmPassword) {
      setError('Passwords do not match');
      setSuccess('');
      toast.error('Passwords do not match');
      return;
    }
    try {
      const res = await fetch(getApiUrl('/api/auth/signup'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: signup.name,
          email: signup.email,
          phone: signup.phone,
          password: signup.password
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Signup failed');
      setTab(0); // Switch to login tab
      setSignup({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
      setSuccess('Signup successful! Please login.');
      setError('');
      toast.success('Signup successful! Please login.');
    } catch (err) {
      setError(err.message);
      setSuccess('');
      toast.error(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({ token: null, user: null });
    toast.info('Logged out successfully.');
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#fff' }}>
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Paper elevation={6} sx={{ p: 3, maxWidth: 340, minWidth: 300, width: '100%', borderRadius: 3 }}>
            {auth.token ? (
              <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <Typography variant="h6" color={NAVY_BLUE} fontWeight={700} align="center">
                  Welcome, {auth.user?.name || 'User'}!
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleLogout}
                  sx={{ bgcolor: '#f44336', color: 'white', fontWeight: 700, '&:hover': { bgcolor: '#d32f2f' } }}
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <>
                <Tabs
                  value={tab}
                  onChange={handleTabChange}
                  variant="fullWidth"
                  sx={{ mb: 3, '& .MuiTabs-indicator': { backgroundColor: SKY_BLUE } }}
                >
                  <Tab label="Login" sx={{ color: tab === 0 ? SKY_BLUE : NAVY_BLUE, fontWeight: 700 }} />
                  <Tab label="Sign Up" sx={{ color: tab === 1 ? SKY_BLUE : NAVY_BLUE, fontWeight: 700 }} />
                </Tabs>
                {success && (
                  <Typography align="center" mb={1} style={{ color: 'green' }}>{success}</Typography>
                )}
                {error && (
                  <Typography color="error" align="center" mb={1}>{error}</Typography>
                )}
                {tab === 0 ? (
                  <form onSubmit={handleLoginSubmit}>
                    <Typography variant="h5" fontWeight={700} color={NAVY_BLUE} mb={2} align="center">Login</Typography>
                    <Box display="flex" flexDirection="column" gap={2} pt={1} pb={1}>
                      <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={login.email}
                        onChange={handleLoginChange}
                        fullWidth
                        required
                      />
                      <TextField
                        label="Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={login.password}
                        onChange={handleLoginChange}
                        fullWidth
                        required
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword((s) => !s)} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </Box>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{ mt: 2, bgcolor: SKY_BLUE, color: 'white', fontWeight: 700, '&:hover': { bgcolor: '#0eaee6' } }}
                    >
                      Login
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleSignupSubmit}>
                    <Typography variant="h5" fontWeight={700} color={NAVY_BLUE} mb={2} align="center">Sign Up</Typography>
                    <Box display="flex" flexDirection="column" gap={2} pt={1} pb={1}>
                      <TextField
                        label="Name"
                        name="name"
                        value={signup.name}
                        onChange={handleSignupChange}
                        fullWidth
                        required
                      />
                      <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={signup.email}
                        onChange={handleSignupChange}
                        fullWidth
                        required
                      />
                      <TextField
                        label="Phone"
                        name="phone"
                        type="tel"
                        value={signup.phone}
                        onChange={handleSignupChange}
                        fullWidth
                        required
                      />
                      <TextField
                        label="Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={signup.password}
                        onChange={handleSignupChange}
                        fullWidth
                        required
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword((s) => !s)} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                      <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={signup.confirmPassword}
                        onChange={handleSignupChange}
                        fullWidth
                        required
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowConfirmPassword((s) => !s)} edge="end">
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </Box>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{ mt: 2, bgcolor: SKY_BLUE, color: 'white', fontWeight: 700, '&:hover': { bgcolor: '#0eaee6' } }}
                    >
                      Sign Up
                    </Button>
                  </form>
                )}
              </>
            )}
          </Paper>
        </Box>
      </Box>
    </>
  );
} 