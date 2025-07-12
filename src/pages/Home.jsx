import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import Navbar from '../components/Navbar';
import BookingForm from '../components/BookingForm';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import WhyChooseUs from '../components/WhyChooseUs';
import dayjs from 'dayjs';
import { keyframes } from '@mui/system';
import HomePageInfo from "../components/HomePageInfo";


export default function Home() {
  const navigate = useNavigate();
  const [city, setCity] = useState('Indore');
  const [bookingType, setBookingType] = useState('Daily');
  const [pickDate, setPickDate] = useState(dayjs());
  const [pickTime, setPickTime] = useState(dayjs());
  const [dropDate, setDropDate] = useState(null);
  const [dropTime, setDropTime] = useState(null);
  const [footerInView, setFooterInView] = useState(false);
  const footerRef = useRef(null);
  const bookingFormRef = useRef(null);

  useEffect(() => {
    if (!footerRef.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setFooterInView(entry.isIntersecting),
      { root: null, threshold: 0 }
    );
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleFindBike = () => {
    // Navigate to bikes page with booking data
    console.log({
      city,
      bookingType,
      pickDate: pickDate ? pickDate.toString() : null,
      pickTime: pickTime ? pickTime.toString() : null,
      dropDate: dropDate ? dropDate.toString() : null,
      dropTime: dropTime ? dropTime.toString() : null,
    });
    navigate('/bikes');
  };

  return (
    <>
      {/* Main Content: Two Columns for the whole page, white background */}
      <Box sx={{ minHeight: '100vh', bgcolor: 'white', width: '100vw' }}>
        <Navbar />
        <Box sx={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'stretch', md: 'flex-start' },
          justifyContent: 'center',
          minHeight: { xs: 600, md: '80vh' },
          px: { xs: 0.5, md: 6 },
          pt: { xs: 2, md: 8 },
          gap: { xs: 2, md: 6 },
        }}>
          {/* Left: Sticky Booking Form */}
          <Box
            ref={bookingFormRef}
            sx={{
              flex: { xs: 'unset', md: '0 0 420px' },
              width: { xs: '100%', md: 420 },
              maxWidth: { xs: '100%', md: 420 },
              position: { xs: 'static', md: 'sticky' },
              top: { xs: 'auto', md: 40 },
              zIndex: 10,
              transition: 'transform 0.3s, margin-bottom 0.3s',
              transform: footerInView ? 'translateY(-120px)' : 'none',
              marginBottom: footerInView ? '120px' : 0,
              mx: { xs: 'auto', md: 0 },
              mb: { xs: 2, md: 0 },
              px: { xs: 1, md: 0 },
            }}
          >
            <BookingForm
              city={city}
              setCity={setCity}
              bookingType={bookingType}
              setBookingType={setBookingType}
              pickDate={pickDate}
              setPickDate={setPickDate}
              pickTime={pickTime}
              setPickTime={setPickTime}
              dropDate={dropDate}
              setDropDate={setDropDate}
              dropTime={dropTime}
              setDropTime={setDropTime}
              onFindBike={handleFindBike}
            />
          </Box>
          {/* Right: All other sections stacked vertically, max width for clean look */}
          <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: { xs: 4, md: 6 },
            width: '100%',
            maxWidth: { xs: '100%', md: 900 },
            minWidth: { xs: 'unset', md: 700 },
            ml: { md: 0 },
            overflowX: { xs: 'unset', md: 'auto' },
            px: { xs: 1, md: 0 },
          }}>
            {/* Hero/Slider at the top */}
            <Box sx={{
              width: '100%',
              maxWidth: { xs: '100%', md: 700 },
              alignSelf: 'center',
              mt: { xs: 2, md: 0 },
              boxShadow: 2,
              borderRadius: 3,
              overflow: 'hidden',
              bgcolor: 'white',
            }}>
              <Slider
                autoplay={true}
                autoplaySpeed={3500}
                infinite={true}
                arrows={false}
                dots={true}
                slidesToShow={1}
                slidesToScroll={1}
                pauseOnHover={false}
                style={{ width: '100%' }}
              >
                {/* Slide 1: Hero Content */}
                <div>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 400,
                    bgcolor: 'white',
                    p: 4,
                  }}>
                    <img src="/images/logo.png" alt="Bike Rent Logo" style={{ width: 120, marginBottom: 16 }} />
                    <Typography variant="h3" sx={{ color: '#222', fontWeight: 'bold', mb: 2, textAlign: 'center', fontSize: { xs: 22, md: 32 } }}>
                      RENT BIKE IN INDORE
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#444', mb: 4, textAlign: 'center', fontSize: { xs: 15, md: 20 } }}>
                      Rent from India's Largest Fleet of Motorcycles, Trusted by millions.
                    </Typography>
                    <Button startIcon={<DirectionsBikeIcon />} variant="contained" sx={{ bgcolor: '#03A9F4', color: 'white', fontWeight: 'bold', px: 4, borderRadius: 2, boxShadow: 2, fontSize: { xs: 15, md: 20 } }}>
                      Rent Bikes
                    </Button>
                  </Box>
                </div>
                {/* Slide 2: Banner Image */}
                <div>
                  <Box sx={{
                    width: '100%',
                    height: 400,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'white',
                    p: 0,
                    borderRadius: 0,
                    overflow: 'hidden',
                  }}>
                    <img
                      src="./images/bikePoster.png"
                      alt="Bike Banner"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 0, display: 'block', objectPosition: 'center' }}
                    />
                  </Box>
                </div>
              </Slider>
            </Box>
            {/* WhyChooseUs below slider, reduced width if needed */}
            <Box sx={{ width: '100%', maxWidth: { xs: '100%', md: 900 }, minWidth: { xs: 'unset', md: 700 }, alignSelf: 'center', bgcolor: 'white', p: { xs: 1, md: 4 }, overflowX: { xs: 'unset', md: 'auto' } }}>
              <WhyChooseUs />
            </Box>
            {/* New: Multiple Info Sections for Realistic Scroll */}
            <Box sx={{ width: '100%', maxWidth: 700, alignSelf: 'center', mt: 2, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <SectionBlock title="How Bike Rent Works" text={`1. Choose your city and dates.
2. Browse our wide range of bikes.
3. Book instantly with easy online payment or pay at pickup.
4. Pick up your sanitized bike from a nearby location.
5. Enjoy your ride and return hassle-free!`} />
              <SectionBlock title="Safety & Hygiene Promise" text={`Your safety is our top priority. All bikes are sanitized before every ride. Helmets are provided and regularly disinfected. Our support team is available 24/7 for any assistance on the road.`} />
              <SectionBlock title="Join Our Rider Community" text={`Over 10,000 riders trust us for their daily commute, weekend getaways, and epic road trips. Share your journey with #BikeRentIndore and get featured!`} />
              <SectionBlock title="Sustainability Matters" text={`We are committed to a greener future. Our fleet includes electric and low-emission bikes. Every ride helps reduce traffic and pollution in your city.`} />
              <SectionBlock title="Customer Stories" text={`“I booked a bike for my college trip—super easy and affordable!” — Rahul, Indore

“Excellent service and well-maintained bikes. Highly recommended!” — Sneha, Bhopal`} />
              <SectionBlock title="Pro Tips for Riders" text={`• Always wear a helmet and follow traffic rules.
• Inspect your bike before you ride.
• For long trips, plan your fuel stops in advance.
• Save more with our weekly and monthly plans!`} />
              <SectionBlock title="Need Help?" text={`Our support team is just a call or WhatsApp away. Check our FAQ or contact us for any queries. We’re here to make your ride smooth and memorable!`} />
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="h6" color="#0288d1" fontWeight={600}>
                  Ready to hit the road? <span style={{ color: '#00bfae' }}>Book your ride now!</span>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <HomePageInfo/>
    </>
    
  );
}

function AnimatedText({ text }) {
  const blink = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0.4; }
    100% { opacity: 1; }
  `;
  return (
    <Typography
      variant="subtitle1"
      sx={{
        color: '#00796b',
        fontWeight: 500,
        fontSize: { xs: 15, md: 18 },
        animation: `${blink} 2.5s linear infinite`,
        mb: 1,
      }}
    >
      {text}
    </Typography>
  );
}

function InfoCard({ title, content, icon }) {
  return (
    <Box sx={{
      flex: '1 1 220px',
      minWidth: 180,
      bgcolor: 'white',
      borderRadius: 2,
      boxShadow: 1,
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      border: '1px solid #e0f7fa',
      gap: 1,
    }}>
      <Typography variant="h6" fontWeight={700} color="#039be5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <span style={{ fontSize: 22 }}>{icon}</span> {title}
      </Typography>
      <Typography variant="body2" color="#555">
        {content}
      </Typography>
    </Box>
  );
}

function SectionBlock({ title, text }) {
  return (
    <Box sx={{ bgcolor: 'white', p: { xs: 2, md: 3 }, borderRadius: 2, mb: 0 }}>
      <Typography variant="h5" fontWeight={700} color="#0288d1" mb={1} sx={{ fontSize: { xs: 18, md: 24 } }}>{title}</Typography>
      <Typography variant="body1" color="#444" sx={{ whiteSpace: 'pre-line', fontSize: { xs: 15, md: 18 } }}>{text}</Typography>
    </Box>
  );
} 