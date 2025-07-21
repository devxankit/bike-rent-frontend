import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';
import Bikes from './pages/Bikes';
import AllBikes from './pages/AllBikes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Customers from './pages/Customers';
import Analytics from './pages/Analytics';
import IndoreBikesPage from './pages/cities-pages/Indore';
import BhopalBikesPage from './pages/cities-pages/Bhopal';
import MumbaiBikesPage from './pages/cities-pages/Mumbai';
import GoaBikesPage from './pages/cities-pages/Goa';
import HaldwaniBikesPage from './pages/cities-pages/Haldwani';
import KathgodamBikesPage from './pages/cities-pages/Kathgodam';
import PithoragarhBikesPage from './pages/cities-pages/Pithoragarh';
import DehradunBikesPage from './pages/cities-pages/Dehradun';
import ScrollToTop from './components/ScrollToTop';
import Locations from "./pages/locations";


function ProtectedRoute({ children, adminOnly }) {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!token) return <Auth />;
  if (adminOnly && !user.isAdmin) return <NotFound />;
  return children;
}

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <ScrollToTop />
        <CssBaseline />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        <div style={{ background: '#fff', minHeight: 'calc(100vh - 64px)' }}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/home" element={<Home />} />

            {/* Main bikes page with slug */}
            <Route path="/bikes" element={<Bikes />} />
            <Route path="/bikes/rent-bike-in-all-cities" element={<Bikes />} />
            
            {/* City pages with both old and new slug routes for backward compatibility */}
            <Route path="/bikes/indore" element={<IndoreBikesPage />} />
            <Route path="/bikes/indore-rent-bike-in-indore" element={<IndoreBikesPage />} />
            
            <Route path="/bikes/bhopal" element={<BhopalBikesPage />} />
            <Route path="/bikes/bhopal-rent-bike-in-bhopal" element={<BhopalBikesPage />} />
            
            <Route path="/bikes/mumbai" element={<MumbaiBikesPage />} />
            <Route path="/bikes/mumbai-rent-bike-in-mumbai" element={<MumbaiBikesPage />} />
            
            <Route path="/bikes/goa" element={<GoaBikesPage />} />
            <Route path="/bikes/goa-rent-bike-in-goa" element={<GoaBikesPage />} />
            
            <Route path="/bikes/haldwani" element={<HaldwaniBikesPage />} />
            <Route path="/bikes/haldwani-rent-bike-in-haldwani" element={<HaldwaniBikesPage />} />
            
            <Route path="/bikes/kathgodam" element={<KathgodamBikesPage />} />
            <Route path="/bikes/kathgodam-rent-bike-in-kathgodam" element={<KathgodamBikesPage />} />
            
            <Route path="/bikes/pithoragarh" element={<PithoragarhBikesPage />} />
            <Route path="/bikes/pithoragarh-rent-bike-in-pithoragarh" element={<PithoragarhBikesPage />} />
            
            <Route path="/bikes/dehradun" element={<DehradunBikesPage />} />
            <Route path="/bikes/dehradun-rent-bike-in-dehradun" element={<DehradunBikesPage />} />
            
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />
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
            <Route path="/locations" element={<Locations />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </LocalizationProvider>
  );
}
export default App; 