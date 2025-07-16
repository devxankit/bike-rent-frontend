import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import { useNavigate, Navigate, Link, useLocation } from 'react-router-dom';
import api, { getApiUrl } from '../utils/api';



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
  const location = useLocation();

  // Sync tab and route together to avoid double navigation and remounts
  useEffect(() => {
    if (location.pathname === '/signup' && tab !== 1) setTab(1);
    else if (location.pathname === '/login' && tab !== 0) setTab(0);
    else if (tab === 0 && location.pathname !== '/login') navigate('/login', { replace: true });
    else if (tab === 1 && location.pathname !== '/signup') navigate('/signup', { replace: true });
    // Only update tab or route if needed
  }, [location.pathname, tab, navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setAuth({ token, user: JSON.parse(user) });
    }
  }, []);

  if (auth.token) {
    const pending = localStorage.getItem('pendingBikeBooking');
    if (pending) {
      localStorage.removeItem('pendingBikeBooking');
      return <Navigate to="/bikes" replace />;
    }
    return <Navigate to="/" replace />;
  }

  const handleTabChange = (newValue) => setTab(newValue);
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
      setTab(0);
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

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="flex flex-1 items-center justify-center py-8 px-2">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {/* Heading and subtext */}
            {tab === 0 ? (
              <>
                <h2 className="text-3xl font-bold text-center mb-1">Welcome back</h2>
                <p className="text-center text-gray-500 mb-6 text-sm">
                  Don't have an account?{' '}
                  <Link
                    to="/signup"
                    className="text-blue-600 hover:underline font-medium"
                    onClick={() => setTab(1)}
                  >
                    Sign up here
                  </Link>
                </p>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-center mb-1">Create your account</h2>
                <p className="text-center text-gray-500 mb-6 text-sm">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-blue-600 hover:underline font-medium"
                    onClick={() => setTab(0)}
                  >
                    Sign in here
                  </Link>
                </p>
              </>
            )}
            {success && (
              <div className="text-green-600 text-center mb-2 text-sm font-medium">{success}</div>
            )}
            {error && (
              <div className="text-red-500 text-center mb-2 text-sm font-medium">{error}</div>
            )}
            {tab === 0 ? (
              <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Email address</label>
                  <input
                    type="email"
                    name="email"
                    value={login.email}
                    onChange={handleLoginChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition bg-white text-gray-900 shadow-sm text-base"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Password</label>
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={login.password}
                      onChange={handleLoginChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition bg-white text-gray-900 shadow-sm text-base pr-11"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center p-0 m-0 text-gray-400 hover:text-blue-600 focus:outline-none"
                      onClick={() => setShowPassword((s) => !s)}
                      tabIndex={-1}
                      style={{height: '24px', width: '24px'}}
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <ellipse cx="12" cy="12" rx="8" ry="5" />
                          <circle cx="12" cy="12" r="2" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <ellipse cx="12" cy="12" rx="8" ry="5" />
                          <circle cx="12" cy="12" r="2" />
                          <line x1="4" y1="20" x2="20" y2="4" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <label className="flex items-center gap-2 text-gray-600 text-sm">
                    <input type="checkbox" className="rounded border-gray-300" />
                    Remember me
                  </label>
                  <button type="button" className="text-blue-600 text-sm hover:underline font-medium">Forgot your password?</button>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 mt-2 rounded-md font-bold text-white bg-blue-600 hover:bg-blue-700 transition text-base shadow"
                >
                  Sign in
                </button>
                <div className="flex items-center my-4">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="mx-3 text-gray-400 text-sm">Or continue with</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <div className="flex gap-3">
                  <button type="button" className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 text-gray-700 font-semibold bg-white hover:bg-gray-50 transition">
                    <svg className="w-5 h-5" viewBox="0 0 48 48"><g><circle fill="#fff" cx="24" cy="24" r="24"/><path fill="#4285F4" d="M35.6 24.2c0-.7-.1-1.4-.2-2H24v4.1h6.5c-.3 1.4-1.3 2.6-2.7 3.4v2.8h4.4c2.6-2.4 4.1-5.9 4.1-10.3z"/><path fill="#34A853" d="M24 36c3.3 0 6-1.1 8-3l-4.4-2.8c-1.2.8-2.7 1.3-4.4 1.3-3.4 0-6.2-2.3-7.2-5.3h-4.5v3.1C13.8 33.7 18.5 36 24 36z"/><path fill="#FBBC05" d="M16.8 26.2c-.2-.7-.3-1.4-.3-2.2s.1-1.5.3-2.2v-3.1h-4.5C11.5 21.1 12 23.4 12 24c0 .6.1 1.2.2 1.8l4.6-2.8z"/><path fill="#EA4335" d="M24 18.7c1.8 0 3.4.6 4.6 1.7l3.4-3.4C31.9 15.1 28.9 14 24 14c-5.5 0-10.2 2.3-12.5 5.7l4.6 3.1c1-3 3.8-5.1 7.9-5.1z"/></g></svg>
                    Google
                  </button>
                
                </div>
              </form>
            ) : (
              <form onSubmit={handleSignupSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={signup.name}
                      onChange={handleSignupChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition bg-white text-gray-900 shadow-sm text-base"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={signup.phone}
                      onChange={handleSignupChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition bg-white text-gray-900 shadow-sm text-base"
                      placeholder="Phone number"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Email address</label>
                  <input
                    type="email"
                    name="email"
                    value={signup.email}
                    onChange={handleSignupChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition bg-white text-gray-900 shadow-sm text-base"
                    placeholder="Email address"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Password</label>
                    <div className="relative flex items-center">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={signup.password}
                        onChange={handleSignupChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition bg-white text-gray-900 shadow-sm text-base pr-11"
                        placeholder="Password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center p-0 m-0 text-gray-400 hover:text-blue-600 focus:outline-none"
                        onClick={() => setShowPassword((s) => !s)}
                        tabIndex={-1}
                        style={{height: '24px', width: '24px'}}
                      >
                        {showPassword ? (
                          <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <ellipse cx="12" cy="12" rx="8" ry="5" />
                            <circle cx="12" cy="12" r="2" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <ellipse cx="12" cy="12" rx="8" ry="5" />
                            <circle cx="12" cy="12" r="2" />
                            <line x1="4" y1="20" x2="20" y2="4" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
                    <div className="relative flex items-center">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={signup.confirmPassword}
                        onChange={handleSignupChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition bg-white text-gray-900 shadow-sm text-base pr-11"
                        placeholder="Confirm password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center p-0 m-0 text-gray-400 hover:text-blue-600 focus:outline-none"
                        onClick={() => setShowConfirmPassword((s) => !s)}
                        tabIndex={-1}
                        style={{height: '24px', width: '24px'}}
                      >
                        {showConfirmPassword ? (
                          <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <ellipse cx="12" cy="12" rx="8" ry="5" />
                            <circle cx="12" cy="12" r="2" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <ellipse cx="12" cy="12" rx="8" ry="5" />
                            <circle cx="12" cy="12" r="2" />
                            <line x1="4" y1="20" x2="20" y2="4" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 mt-2 rounded-md font-bold text-white bg-blue-600 hover:bg-blue-700 transition text-base shadow"
                >
                  Sign up
                </button>
                <div className="flex items-center my-4">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="mx-3 text-gray-400 text-sm">Or continue with</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <div className="flex gap-3">
                  <button type="button" className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 text-gray-700 font-semibold bg-white hover:bg-gray-50 transition">
                    <svg className="w-5 h-5" viewBox="0 0 48 48"><g><circle fill="#fff" cx="24" cy="24" r="24"/><path fill="#4285F4" d="M35.6 24.2c0-.7-.1-1.4-.2-2H24v4.1h6.5c-.3 1.4-1.3 2.6-2.7 3.4v2.8h4.4c2.6-2.4 4.1-5.9 4.1-10.3z"/><path fill="#34A853" d="M24 36c3.3 0 6-1.1 8-3l-4.4-2.8c-1.2.8-2.7 1.3-4.4 1.3-3.4 0-6.2-2.3-7.2-5.3h-4.5v3.1C13.8 33.7 18.5 36 24 36z"/><path fill="#FBBC05" d="M16.8 26.2c-.2-.7-.3-1.4-.3-2.2s.1-1.5.3-2.2v-3.1h-4.5C11.5 21.1 12 23.4 12 24c0 .6.1 1.2.2 1.8l4.6-2.8z"/><path fill="#EA4335" d="M24 18.7c1.8 0 3.4.6 4.6 1.7l3.4-3.4C31.9 15.1 28.9 14 24 14c-5.5 0-10.2 2.3-12.5 5.7l4.6 3.1c1-3 3.8-5.1 7.9-5.1z"/></g></svg>
                    Google
                  </button>
                 
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 