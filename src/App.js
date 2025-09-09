import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'quill/dist/quill.snow.css'; // Ensure Quill CSS is loaded for editor
import { HelmetProvider } from 'react-helmet-async';
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AdminDashboard from './pages/AdminDashboard';
import Bikes from './pages/Bikes';
import AllBikes from './pages/AllBikes';
import AllTaxis from './pages/AllTaxis';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Customers from './pages/Customers';
import Analytics from './pages/Analytics';
import CityPages from './pages/CityPages';
import DynamicCityPage from './pages/DynamicCityPage';
import TaxiCityPages from './pages/TaxiCityPages';
import DynamicTaxiCityPage from './pages/DynamicTaxiCityPage';
import ScrollToTop from './components/ScrollToTop';
import Locations from "./pages/locations";
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import AdminBlogs from './pages/AdminBlogs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import MainHome from "./pages/MainHome";
import TaxiHome from "./pages/taxi-pages/TaxiHome";
import TaxiLocations from "./pages/taxi-pages/TaxiLocations";
import TaxiAbout from "./pages/taxi-pages/TaxiAbout";
import TaxiContact from "./pages/taxi-pages/TaxiContact";
import TaxiPrivacyPolicy from "./pages/taxi-pages/TaxiPrivacyPolicy";
import TaxiTermsAndConditions from "./pages/taxi-pages/TaxiTermsAndConditions";
import Tours from "./pages/Tours";


function ProtectedRoute({ children, adminOnly }) {
  const token = localStorage.getItem('token');
  let user = {};
  try {
    user = JSON.parse(localStorage.getItem('user')) || {};
  } catch (e) {
    user = {};
  }
  if (!token) return <Auth />;
  if (adminOnly && !user.isAdmin) return <NotFound />;
  return children;
}

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <HelmetProvider>
        <Router>
          <ScrollToTop />
          <CssBaseline />
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover style={{ zIndex: 999999 }} />
          <div style={{ background: '#fff', minHeight: 'calc(100vh - 64px)' }}>
            <Routes>
              <Route path="/" element={<MainHome />} />
              <Route path="/main-home" element={<MainHome />} />
              <Route path="/taxi-home" element={<TaxiHome/>} />
              <Route path="/taxi" element={<TaxiHome/>} />
              <Route path="/taxi/locations" element={<TaxiLocations />} />
              <Route path="/taxi/about" element={<TaxiAbout />} />
              <Route path="/taxi/contact" element={<TaxiContact />} />
              <Route path="/taxi/privacy-policy" element={<TaxiPrivacyPolicy />} />
              <Route path="/taxi/terms-and-conditions" element={<TaxiTermsAndConditions />} />
              <Route path="/tours" element={<Tours />} />

              <Route path="/home" element={<Home />} />

              {/* Main bikes page with slug */}
              <Route path="/bikes" element={<Bikes />} />
              <Route path="/bikes/rent-bike-in-all-cities" element={<Bikes />} />
              
              {/* Dynamic city pages route - handles all city slugs */}
              <Route path="/bikes/:citySlug" element={<DynamicCityPage />} />
              
              {/* Dynamic taxi city pages route - handles all taxi city slugs */}
              <Route path="/taxi/:citySlug" element={<DynamicTaxiCityPage />} />
              
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/signup" element={<Auth />} />
              <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
              <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
              <Route path="/admin/dashboard" element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/bikes" element={
                <ProtectedRoute adminOnly={true}>
                  <AllBikes />
                </ProtectedRoute>
              } />
              <Route path="/admin/taxis" element={
                <ProtectedRoute adminOnly={true}>
                  <AllTaxis />
                </ProtectedRoute>
              } />
              <Route path="/admin/customers" element={
                <ProtectedRoute adminOnly={true}>
                  <Customers />
                </ProtectedRoute>
              } />
              <Route path="/admin/analytics" element={
                <ProtectedRoute adminOnly={true}>
                  <Analytics />
                </ProtectedRoute>
              } />
              <Route path="/admin/city-pages" element={
                <ProtectedRoute adminOnly={true}>
                  <CityPages />
                </ProtectedRoute>
              } />
              <Route path="/admin/taxi-cities" element={
                <ProtectedRoute adminOnly={true}>
                  <TaxiCityPages />
                </ProtectedRoute>
              } />
              <Route path="/admin/blogs" element={
                <ProtectedRoute adminOnly={true}>
                  <AdminBlogs />
                </ProtectedRoute>
              } />
              <Route path="/locations" element={<Locations />} />
              {/* Blog routes */}
              <Route path="/blogs" element={<BlogList />} />
              <Route path="/blogs/:slug" element={<BlogDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </HelmetProvider>
    </LocalizationProvider>
  );
}
export default App; 