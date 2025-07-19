import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, Menu, X, MapPin, Calendar, Clock, Users, DollarSign, Shield,ArrowRight, Play, Bike, Star,
  ChevronDown, ChevronUp, Facebook, Twitter, Instagram, Youtube, Smartphone
} from 'lucide-react';

import { FaMoneyBillWave, FaMotorcycle, FaRegClock, FaHandHoldingUsd, FaCity, FaLandmark, FaMonument, FaBuilding, FaUniversity, FaRegBuilding, FaMapMarkerAlt, FaRegHospital, FaRegSmile, FaRegSun, FaRegStar, FaRegFlag } from 'react-icons/fa';
import { MdOutlineMiscellaneousServices } from 'react-icons/md';
import { BiRupee } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import CustomDatePicker from '../components/CustomDatePicker';
import CustomTimePicker from '../components/CustomTimePicker';
import Navbar from '../components/Navbar';
import PromoToast from '../components/PromoToast';
import api from '../utils/api';
import RunningBanner from '../components/RunningBanner';
import FeatureBar from '../components/FeatureBar';
import { generateCitySlug, generateBikesSlug } from '../utils/slugUtils';

// Custom styles for yellow highlight (add to global CSS if needed)
const customDatepickerStyles = `
.custom-calendar .react-datepicker__day--selected,
.custom-calendar .react-datepicker__time-list-item--selected {
  background-color: #FACC15 !important;
  color: #fff !important;
}
.custom-calendar .react-datepicker__day--keyboard-selected {
  background-color: #fef08a !important;
  color: #222 !important;
}
.custom-calendar .react-datepicker__time-list-item--selected {
  background-color: #FACC15 !important;
  color: #fff !important;
}
`;
if (typeof document !== 'undefined' && !document.getElementById('custom-datepicker-style')) {
  const style = document.createElement('style');
  style.id = 'custom-datepicker-style';
  style.innerHTML = customDatepickerStyles;
  document.head.appendChild(style);
}

// Calendar and clock icons for Home2 booking form



// Add city image mapping
const cityImageMap = {
  Indore: '/images/indore.jpeg',
  Bhopal: '/images/bhopal.jpeg',
  Mumbai: '/images/mumbai.jpg',
  Goa: '/images/goa.jpeg',
  Haldwani: '/images/haldwani.jpeg',
  Kathgodam: '/images/kathgodam.jpeg',
  Pithoragarh: '/images/pithoragarh.jpeg',
  Dehradun: '/images/dehradun.jpeg',
  // Add more as needed
};

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    pickup: '',
    dropoff: '',
    startDate: '',
    endDate: '',
    time: '',
    passengers: '1'
  });

  // State for BookingForm
  const [city, setCity] = useState('');
  const [cityPopupOpen, setCityPopupOpen] = useState(false);
  const [cityPopupVisible, setCityPopupVisible] = useState(false);
  const cityPopupRef = useRef(null);
  const [allCities, setAllCities] = useState([]);
  const [citySearch, setCitySearch] = useState('');
  const [bookingType, setBookingType] = useState('');
  // State for separate date and time pickers
  function getNextAvailableTime() {
    const now = new Date();
    const minutes = now.getMinutes();
    if (minutes < 30) {
      now.setMinutes(30, 0, 0);
    } else {
      now.setHours(now.getHours() + 1, 0, 0, 0);
    }
    return now;
  }
  const [pickDate, setPickDate] = useState(null);
  const [pickTime, setPickTime] = useState(null);
  const [dropDate, setDropDate] = useState(null);
  const [dropTime, setDropTime] = useState(null);

  // Calculate total duration between pickup and dropoff
  function getDurationString(pickDate, pickTime, dropDate, dropTime) {
    if (!pickDate || !pickTime || !dropDate || !dropTime) return "-";
    const start = new Date(pickDate);
    start.setHours(pickTime.getHours(), pickTime.getMinutes(), 0, 0);
    const end = new Date(dropDate);
    end.setHours(dropTime.getHours(), dropTime.getMinutes(), 0, 0);
    if (end <= start) return "-";
    const ms = end - start;
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    let str = "";
    if (days > 0) str += `${days} day${days > 1 ? "s" : ""} `;
    if (hours > 0) str += `${hours} hour${hours > 1 ? "s" : ""} `;
    if (minutes > 0) str += `${minutes} min${minutes > 1 ? "s" : ""}`;
    return str.trim() || "0 min";
  }
  const navigate = useNavigate();
  const handleFindBike = (e) => {
    e.preventDefault();
    // Check if all fields are filled
    if (!city || !pickDate || !pickTime || !dropDate || !dropTime) {
      toast.info("Please fill all fields to find your bike!", {
        position: "top-right",
        autoClose: 2500,
        style: { fontSize: '0.95rem', minWidth: 0, maxWidth: '260px', padding: '8px 16px' },
        icon: '🚲',
      });
      return;
    }
    // Combine date and time for pick and drop
    const pickDateTime = new Date(pickDate);
    pickDateTime.setHours(pickTime.getHours(), pickTime.getMinutes(), 0, 0);
    const dropDateTime = new Date(dropDate);
    dropDateTime.setHours(dropTime.getHours(), dropTime.getMinutes(), 0, 0);
    // Save form data to localStorage
    const formData = {
      city,
      pickDateTime,
      dropDateTime
    };
    localStorage.setItem('bikeRentFormData', JSON.stringify(formData));
    const cityLower = city.trim().toLowerCase();
    if (["indore", "bhopal", "mumbai", "goa", "haldwani", "kathgodam", "pithoragarh", "dehradun"].includes(cityLower)) {
      // Use new slug format for navigation
      const slug = generateCitySlug(cityLower);
      navigate(`/bikes/${slug}`);
    } else {
      // Use slug for main bikes page
      const bikesSlug = generateBikesSlug();
      navigate(`/bikes/${bikesSlug}`);
    }
  };

  const handleInputChange = (e) => {
    setBookingForm({ ...bookingForm, [e.target.name]: e.target.value });
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Animate popup open/close
  useEffect(() => {
    if (cityPopupOpen) {
      setCityPopupVisible(true);
    } else if (cityPopupVisible) {
      // Delay unmount for animation
      const timeout = setTimeout(() => setCityPopupVisible(false), 180);
      return () => clearTimeout(timeout);
    }
  }, [cityPopupOpen]);

  // Close popup on outside click
  useEffect(() => {
    if (!cityPopupOpen) return;
    function handleClick(e) {
      if (cityPopupRef.current && !cityPopupRef.current.contains(e.target)) {
        setCityPopupOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [cityPopupOpen]);

  // Fetch unique cities from bikes
  useEffect(() => {
    api.get('/api/bikes').then(res => {
      const bikes = res.data || [];
      const cityMap = {};
      bikes.forEach(b => {
        if (b.location) {
          const key = b.location.trim().toLowerCase();
          if (!cityMap[key]) cityMap[key] = b.location.trim();
        }
      });
      setAllCities(Object.values(cityMap));
    });
  }, []);

  const features = [
    {
      icon: DollarSign,
      title: "Lowest Rental Prices",
      description: "We offer the most competitive pricing in the market without compromising on quality."
    },
    {
      icon: Calendar,
      title: "Flexible Rental Plans",
      description: "Choose from hourly, daily, weekly, or monthly plans that suit your needs perfectly."
    },
    {
      icon: Shield,
      title: "No Ownership Worries",
        description: "Skip the maintenance, insurance, and registration hassles. Just ride and enjoy."
      },
    {
      icon: MapPin,
      title: "15+ Rental Hubs",
      description: "Conveniently located pickup points across the city for easy accessibility."
    }
  ];

  const clients = [
    { name: "ChaiPoint", logo: "CP" },
    { name: "OLA", logo: "OLA" },
    { name: "Uber", logo: "UBER" },
    { name: "Swiggy", logo: "SW" },
    { name: "Zomato", logo: "ZM" },
    { name: "Flipkart", logo: "FK" }
  ];

  const featuredOn = [
    { name: "TechCrunch", logo: "TC" },
    { name: "Forbes", logo: "FB" },
    { name: "Business Standard", logo: "BS" },
    { name: "Economic Times", logo: "ET" },
    { name: "StartupStory", logo: "SS" }
  ];

  const faqs = [
    {
      question: "What is BikeRent's pricing?",
      answer: "Our pricing varies based on the type of bike and rental duration. We offer competitive hourly, daily, and monthly rates with special discounts for long-term rentals."
    },
    {
      question: "What are the benefits of using BikeRent?",
      answer: "BikeRent offers convenience, affordability, and flexibility. No maintenance costs, insurance worries, or parking hassles. Just pick up and ride!"
    },
    {
      question: "What bike options are available?",
      answer: "We have a diverse fleet including city bikes, mountain bikes, electric bikes, and scooters to suit different needs and preferences."
    },
    {
      question: "Where is BikeRent currently operational?",
      answer: "We currently operate in major cities with 15+ rental hubs. Check our locations page for the nearest hub to you."
    }
  ];

  const cities = [
    "Bike rental in Bangalore", "Bike rental in Hyderabad", "Bike rental in Mumbai",
    "Bike rental in Delhi", "Bike rental in Chennai", "Bike rental in Pune",
    "Bike rental in Kolkata", "Bike rental in Ahmedabad", "Bike rental in Jaipur",
    "Bike rental in Surat", "Bike rental in Lucknow", "Bike rental in Kanpur"
  ];

  // Carousel state
  const carouselImages = [
    './images/bike-banner-1.png',
    './images/bike-banner-2.png',
    './images/bike-banner-3.png'
   
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);
  const goToPrev = () => setActiveIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  const goToNext = () => setActiveIndex((prev) => (prev + 1) % carouselImages.length);

  // Add refs and direction state for pickers
  const pickDateRef = useRef();
  const pickTimeRef = useRef();
  const dropDateRef = useRef();
  const dropTimeRef = useRef();
  const [pickDateDirection, setPickDateDirection] = useState('down');
  const [pickTimeDirection, setPickTimeDirection] = useState('down');
  const [dropDateDirection, setDropDateDirection] = useState('down');
  const [dropTimeDirection, setDropTimeDirection] = useState('down');
  // Add open state for each picker
  const [pickDateOpen, setPickDateOpen] = useState(false);
  const [pickTimeOpen, setPickTimeOpen] = useState(false);
  const [dropDateOpen, setDropDateOpen] = useState(false);
  const [dropTimeOpen, setDropTimeOpen] = useState(false);

  function getPopupDirection(inputRef) {
    if (!inputRef.current) return 'down';
    const rect = inputRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    // Assume popup height ~350px, adjust as needed
    return spaceBelow < 350 && spaceAbove > spaceBelow ? 'up' : 'down';
  }

  const handlePickDateFocus = () => setPickDateDirection(getPopupDirection(pickDateRef));
  const handlePickTimeFocus = () => setPickTimeDirection(getPopupDirection(pickTimeRef));
  const handleDropDateFocus = () => setDropDateDirection(getPopupDirection(dropDateRef));
  const handleDropTimeFocus = () => setDropTimeDirection(getPopupDirection(dropTimeRef));

  // Add useEffect to recalculate popup direction when each picker is opened
  useEffect(() => {
    if (pickDateOpen) setPickDateDirection(getPopupDirection(pickDateRef));
  }, [pickDateOpen]);
  useEffect(() => {
    if (pickTimeOpen) setPickTimeDirection(getPopupDirection(pickTimeRef));
  }, [pickTimeOpen]);
  useEffect(() => {
    if (dropDateOpen) setDropDateDirection(getPopupDirection(dropDateRef));
  }, [dropDateOpen]);
  useEffect(() => {
    if (dropTimeOpen) setDropTimeDirection(getPopupDirection(dropTimeRef));
  }, [dropTimeOpen]);

  const now = new Date();
  const currentDatePlaceholder = now.toLocaleDateString('en-GB');
  const currentTimePlaceholder = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen">
      <Navbar />
      <RunningBanner />
      <PromoToast />

      {/* Hero Section */}
      <section className="relative min-h-[500px] bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/images/bg-3.png')" }}
        ></div>
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-5">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Booking Form on Top (mobile), Left (desktop) */}
            <div className="order-1 lg:order-1 flex justify-center">
              <div className="bg-white rounded-lg shadow p-4 w-full max-w-md border border-gray-100 flex flex-col gap-3 sm:p-6">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">Rent a Bike in Your City</h2>
                <p className="text-xs text-gray-500 text-center mb-1">Quickly find the best scooter or bike for your needs.</p>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-500 mb-0.5">Select City</label>
                  <div className="relative">
                    <button
                      type="button"
                      className="w-full flex items-center border border-gray-300 rounded px-4 py-3 pr-10 text-base bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer transition placeholder-gray-400 text-gray-700 font-normal text-left"
                      style={{ height: '44px' }}
                      onClick={() => setCityPopupOpen(true)}
                    >
                      <span className="flex-1 truncate text-base text-gray-700 text-left">{city || 'Select a city'}</span>
                    </button>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center h-full cursor-pointer pointer-events-none">
                      <MapPin className="h-5 w-5 text-yellow-400" />
                    </span>
                  </div>
                  {/* City Selection Popup */}
                  {cityPopupVisible && (
                    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/30 transition-opacity duration-200`} style={{ opacity: cityPopupOpen ? 1 : 0 }}>
                      <div
                        ref={cityPopupRef}
                        className={`bg-white rounded-xl shadow-2xl w-full max-w-xs sm:max-w-lg p-3 sm:p-6 relative mx-2 transform transition-transform duration-200 ${cityPopupOpen ? 'scale-100' : 'scale-95'}`}
                        style={{ opacity: 1 }}
                      >
                        <button
                          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
                          onClick={() => setCityPopupOpen(false)}
                          aria-label="Close"
                        >
                          ×
                        </button>
                        <input
                          type="text"
                          placeholder="Search city"
                          value={citySearch}
                          onChange={e => setCitySearch(e.target.value)}
                          className="w-full mb-3 px-3 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-yellow-200 text-sm"
                        />
                        <div className="grid grid-cols-3 gap-2 sm:gap-3 max-h-56 sm:max-h-72 overflow-y-auto">
                          {["Indore", "Bhopal", "Mumbai", "Goa", "Haldwani", "Kathgodam", "Pithoragarh", "Dehradun"].filter(c => c.toLowerCase().includes(citySearch.toLowerCase())).map(c => (
                            <button
                              key={c}
                              className="flex flex-col items-center gap-1 sm:gap-1 p-0.5 sm:p-1 rounded-lg hover:bg-yellow-50 focus:bg-yellow-100 transition"
                              onClick={() => { setCity(c); setCityPopupOpen(false); }}
                            >
                              <img
                                src={cityImageMap[c] || '/images/default-city.png'}
                                alt={c}
                                className="w-10 h-10 object-cover rounded-lg shadow"
                              />
                              <span className="text-xs font-semibold text-gray-700 mt-1 text-center">{c}</span>
                            </button>
                          ))}
                          {["Indore", "Bhopal", "Mumbai", "Goa", "Haldwani", "Kathgodam", "Pithoragarh", "Dehradun"].filter(c => c.toLowerCase().includes(citySearch.toLowerCase())).length === 0 && (
                            <span className="col-span-3 text-center text-gray-400 text-sm">No cities found</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-2 mt-1.5">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <CustomDatePicker
                        ref={pickDateRef}
                        value={pickDate}
                        onChange={date => {
                          setPickDate(date);
                          setPickDateOpen(false);
                          if (!pickTime) setPickTimeOpen(true); // Only open if not already set
                        }}
                        label="Pick Up Date"
                        minDate={new Date()}
                        popupDirection={pickDateDirection}
                        onFocus={handlePickDateFocus}
                        open={pickDateOpen}
                        setOpen={setPickDateOpen}
                        placeholder={currentDatePlaceholder}
                      />
                    </div>
                    <div className="relative">
                      <CustomTimePicker
                        ref={pickTimeRef}
                        value={pickTime}
                        onChange={time => {
                          setPickTime(time);
                          setPickTimeOpen(false);
                          if (!pickDate) setPickDateOpen(true); // Only open if not already set
                        }}
                        label="Pick Up Time"
                        selectedDate={pickDate}
                        popupDirection={pickTimeDirection}
                        onFocus={handlePickTimeFocus}
                        open={pickTimeOpen}
                        setOpen={setPickTimeOpen}
                        placeholder={currentTimePlaceholder}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <CustomDatePicker
                        ref={dropDateRef}
                        value={dropDate}
                        onChange={date => {
                          setDropDate(date);
                          setDropDateOpen(false);
                          if (!dropTime) setDropTimeOpen(true); // Only open if not already set
                        }}
                        label="Drop Off Date"
                        minDate={pickDate || new Date()}
                        popupDirection={dropDateDirection}
                        onFocus={handleDropDateFocus}
                        open={dropDateOpen}
                        setOpen={setDropDateOpen}
                        placeholder={currentDatePlaceholder}
                      />
                    </div>
                    <div className="relative">
                      <CustomTimePicker
                        ref={dropTimeRef}
                        value={dropTime}
                        onChange={time => {
                          setDropTime(time);
                          setDropTimeOpen(false);
                          if (!dropDate) setDropDateOpen(true); // Only open if not already set
                        }}
                        label="Drop Off Time"
                        selectedDate={dropDate}
                        popupDirection={dropTimeDirection}
                        onFocus={handleDropTimeFocus}
                        open={dropTimeOpen}
                        setOpen={setDropTimeOpen}
                        placeholder={currentTimePlaceholder}
                        minDateTime={
                          dropDate && pickDate && pickTime && dropDate.getFullYear() === pickDate.getFullYear() && dropDate.getMonth() === pickDate.getMonth() && dropDate.getDate() === pickDate.getDate()
                            ? (() => { const d = new Date(dropDate); d.setHours(pickTime.getHours(), pickTime.getMinutes(), 0, 0); return d; })()
                            : undefined
                        }
                      />
                    </div>
                  </div>
                </div>
                <hr className="my-2 border-gray-200" />
                <div className="flex items-center justify-between text-[11px] text-gray-500 font-semibold">
                  <span>Total Duration:</span>
                  <span>{getDurationString(pickDate, pickTime, dropDate, dropTime)}</span>
                </div>
                <button className="w-full h-10 bg-yellow-400 text-white py-1.5 rounded font-bold hover:bg-yellow-400 hover:scale-105 hover:shadow-lg transition-all duration-200 text-sm flex items-center justify-center gap-1 mt-1 active:scale-95" onClick={handleFindBike}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                  </svg>
                  Find Your Bike
                </button>
              </div>
            </div>
            {/* Hero Text below form (mobile), Right (desktop) */}
            <div className="order-2 lg:order-2 text-white lg:pl-12 flex flex-col items-start">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-4">
                Your <span className='text-yellow-400 '>Ride.</span> <br />
                Your City.
              </h1>
              <p className="text-xl mb-8 text-gray-300">
              Ride your way with our premium motorcycle rental service.
              </p>
            </div>
          </div>
        </div>
      </section>
      <FeatureBar/>
      {/* Carousel Section */}
      <section className="w-full py-14 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-4">
          {/* Left: Why Choose Bike Rent */}
          <div className="flex flex-col justify-center h-full">
            <h2 className="text-2xl md:text-3xl font-bold text-left mb-6">Why choose Bike Rent?</h2>
            <div className="relative flex flex-col gap-0 z-10">
              {/* Timeline Steps */}
              {[
                { icon: FaMoneyBillWave, title: 'Different Flexible Packages', desc: 'Grab daily, weekly, fortnight and monthly packages at discounted rates' },
                { icon: FaMotorcycle, title: 'Wide Range', desc: 'Looking for a particular brand or location? We have probably got it.' },
                { icon: MdOutlineMiscellaneousServices, title: 'Highly Maintained Fleet', desc: 'Get high quality and serviced vehicles.' },
                { icon: FaRegClock, title: '24*7 At Service', desc: 'Day or night, rent a bike' },
                { icon: BiRupee, title: 'Book Now, Pay later', desc: 'Flexibility to decide when and how to pay.' },
                { icon: FaHandHoldingUsd, title: 'Instant Refund', desc: 'Facing an issue while booking/pick up? We initiate instant refund.' },
              ].map((step, idx, arr) => (
                <div key={idx} className="flex flex-row items-center relative min-h-[56px]">
                  {/* Vertical line (behind icons) */}
                  {idx !== arr.length - 1 && (
                    <div className="absolute left-[22px] top-7 w-1 bg-yellow-300 z-0" style={{ height: 'calc(100% - 2px)' }}></div>
                  )}
                  {/* Icon in filled circle */}
                  <div className="relative z-10 flex items-center justify-center mr-5">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-400">
                      <step.icon size={28} color="#fff" />
                    </div>
                  </div>
                  {/* Text with hover effect - only this box animates, add margin and border-transparent */}
                  <div className="flex-1">
                    <div className={`p-3 rounded-lg border border-transparent transition-all duration-200 hover:bg-white hover:shadow-lg hover:border-yellow-200${idx !== arr.length - 1 ? ' mb-4' : ''}`}>
                      <div className="font-semibold text-base">{step.title}</div>
                      <div className="text-gray-700 text-xs">{step.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Mobile: Stack icons and text, hide vertical line, add spacing */}
            <style>{`
              @media (max-width: 768px) {
                .timeline-mobile-stack { flex-direction: column !important; align-items: flex-start !important; }
                .timeline-mobile-stack .timeline-icons { flex-direction: row !important; margin-right: 0 !important; margin-bottom: 1rem !important; }
                .timeline-mobile-stack .timeline-icons .vertical-line { display: none !important; }
                .timeline-mobile-stack .timeline-icons > div { margin-bottom: 0 !important; margin-right: 1rem !important; }
                .timeline-mobile-stack .timeline-texts { max-width: 100% !important; }
              }
            `}</style>
          </div>
          {/* Right: Carousel */}
          <div className="flex justify-center items-center h-full">
            <div className="relative w-full max-w-xl h-[350px] md:h-[500px] overflow-hidden rounded-2xl shadow-lg">
              {carouselImages.map((img, idx) => (
                <img
                  key={img}
                  src={img}
                  alt={`Demo ${idx + 1}`}
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                  style={{ transition: 'opacity 0.7s cubic-bezier(0.4,0,0.2,1)' }}
                />
              ))}
              {/* Left Arrow (hidden by default, show on hover) */}
              <button onClick={goToPrev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow transition z-20 opacity-0 group-hover:opacity-100 focus:opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              {/* Right Arrow (hidden by default, show on hover) */}
              <button onClick={goToNext} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow transition z-20 opacity-0 group-hover:opacity-100 focus:opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
              {/* Dots (hidden by default, show on hover) */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20 opacity-0 group-hover:opacity-100 focus:opacity-100">
                {carouselImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-3 h-3 rounded-full ${idx === activeIndex ? 'bg-green-500' : 'bg-gray-300'} transition`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why BikeRent?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We simplified bike rentals so you can focus on what's important to you.
            </p>
          </div>

          {/* Features Cards - Responsive Scrollable */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center px-4 py-6 rounded-xl shadow-md hover:shadow-lg transition-shadow bg-white max-w-xs mx-auto border border-gray-100">
                <div className="flex items-center justify-center mb-2">
                  <div className="bg-yellow-50 w-14 h-14 rounded-full flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-yellow-400" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{feature.title}</h3>
                <p className="text-gray-700 text-[15px] leading-snug font-normal">{feature.description}</p>
              </div>
            ))}
          </div>
          {/* Mobile: Horizontal Scrollable Cards */}
          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 px-1 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="min-w-[50vw] max-w-[60vw] flex-shrink-0 snap-center bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-center px-4 py-6 mx-auto border border-gray-100"
                >
                  <div className="flex items-center justify-center mb-2">
                    <div className="bg-yellow-50 w-14 h-14 rounded-full flex items-center justify-center">
                      <feature.icon className="h-8 w-8 text-yellow-400" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{feature.title}</h3>
                  <p className="text-gray-700 text-[15px] leading-snug font-normal">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Exlore Section */}
      <section className="relative bg-[#ffbe00] overflow-hidden">
        <div className="absolute inset-0 "></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Explore the City
                  <span className="block text-black">Your Way</span>
                </h1>
                <p className="text-xl text-white leading-relaxed">
                  Premium bike rentals for urban adventures. Discover hidden gems, 
                  beat the traffic, and experience the city like never before.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white hover:bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center group"
                  onClick={() => navigate('/bikes')}
                >
                  Book Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/10 flex items-center justify-center">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </button>
              </div>
              
              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-white fill-current" />
                  <span className="text-white font-semibold">4.9/5</span>
                  <span className="text-white-200">2,450+ reviews</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bike className="h-5 w-5 text-white" />
                  <span className="text-white font-semibold">500+</span>
                  <span className="text-white">bikes available</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="./images/bikePoster.png" 
                alt="Premium bike rental"
                className="w-full h-80 lg:h-[400px] object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Top FAQ's</h2>
            <p className="text-gray-600">
              Renting a bike made simple • Explore our FAQs for quick answers
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-800">{faq.question}</span>
                  {openFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

   
    </div>
  );
};

export default Home;