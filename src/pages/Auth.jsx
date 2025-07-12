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

// Enhanced logging utility for Auth page
const logAuthAction = (action, data = null, error = null) => {
  const timestamp = new Date().toISOString();
  console.group(`🔐 [${timestamp}] AUTH ${action}`);
  
  if (data) {
    console.log('📤 Data:', data);
  }
  
  if (error) {
    console.error('❌ Error:', error);
    console.error('🔍 Error Details:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
  }
  
  console.groupEnd();
};

export default function Auth() {
  const [tab, setTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [login, setLogin] = useState({ email: '', password: '' });
  const [signup, setSignup] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [auth, setAuth] = useState({ token: null, user: null });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // On mount, check for token
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      console.log('🔍 [Auth] Found existing token, setting auth state');
      setAuth({ token, user: JSON.parse(user) });
    } else {
      console.log('🔍 [Auth] No existing token found');
    }
  }, []);

  if (auth.token) {
    console.log('🔐 [Auth] User authenticated, redirecting to home');
    return <Navigate to="/" replace />;
  }

  const handleTabChange = (event, newValue) => {
    console.log(`📑 [Auth] Tab changed from ${tab} to ${newValue}`);
    setTab(newValue);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin(prev => ({ ...prev, [name]: value }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignup(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log('🔐 [Auth] Login attempt for:', login.email);
    
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      logAuthAction('LOGIN_ATTEMPT', { email: login.email });
      
      const res = await fetch(getApiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(login)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        logAuthAction('LOGIN_FAILED', { email: login.email }, { message: data.message, status: res.status });
        throw new Error(data.message || 'Login failed');
      }
      
      logAuthAction('LOGIN_SUCCESS', { email: login.email, user: data.user });
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setAuth({ token: data.token, user: data.user });
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      console.error('🔐 [Auth] Login error:', err);
      setError(err.message);
      setSuccess('');
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    console.log('📝 [Auth] Signup attempt for:', signup.email);
    
    setError('');
    setSuccess('');
    setLoading(true);
    
    if (signup.password !== signup.confirmPassword) {
      console.warn('🔐 [Auth] Password mismatch during signup');
      setError('Passwords do not match');
      setSuccess('');
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }
    
    try {
      logAuthAction('SIGNUP_ATTEMPT', { email: signup.email, name: signup.name });
      
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
      
      if (!res.ok) {
        logAuthAction('SIGNUP_FAILED', { email: signup.email }, { message: data.message, status: res.status });
        throw new Error(data.message || 'Signup failed');
      }
      
      logAuthAction('SIGNUP_SUCCESS', { email: signup.email });
      
      setTab(0); // Switch to login tab
      setSignup({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
      setSuccess('Signup successful! Please login.');
      setError('');
      toast.success('Signup successful! Please login.');
    } catch (err) {
      console.error('🔐 [Auth] Signup error:', err);
      setError(err.message);
      setSuccess('');
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    console.log('🔐 [Auth] User logout');
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