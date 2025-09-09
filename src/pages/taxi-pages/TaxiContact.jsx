import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import TaxiNavBar from '../../components/taxi-components/TaxiNavBar';
import FooterTaxi from '../../components/FooterTaxi';
import api from '../../utils/api';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function TaxiContact() {
  const [taxiCities, setTaxiCities] = useState([]);

  React.useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  useEffect(() => {
    api.get('/api/taxi-cities')
      .then(res => {
        const activeCities = (res.data || []).filter(city => city.isActive);
        setTaxiCities(activeCities);
      })
      .catch(err => {
        setTaxiCities([]);
        console.error('Error fetching taxi cities:', err);
      });
  }, []);

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Contact Us | BookYourRide - Get in Touch for Taxi Services</title>
        <meta name="title" content="Contact Us | BookYourRide - Get in Touch for Taxi Services" />
        <meta name="description" content="Contact BookYourRide for taxi service inquiries, support, or bookings. Reach out to our customer service team for assistance with taxi and cab services across multiple cities." />
        <meta name="keywords" content="contact BookYourRide, taxi service contact, cab service support, customer service, taxi booking help, taxi inquiries" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content="BookYourRide" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.bookyourride.in/taxi/contact" />
        <meta property="og:title" content="Contact Us | BookYourRide - Get in Touch for Taxi Services" />
        <meta property="og:description" content="Contact BookYourRide for taxi service inquiries, support, or bookings. Reach out to our customer service team for assistance with taxi and cab services across multiple cities." />
        <meta property="og:image" content="https://www.bookyourride.in/images/bike-rent-logo-2.png" />
        <meta property="og:site_name" content="BookYourRide" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.bookyourride.in/taxi/contact" />
        <meta property="twitter:title" content="Contact Us | BookYourRide - Get in Touch for Taxi Services" />
        <meta property="twitter:description" content="Contact BookYourRide for taxi service inquiries, support, or bookings. Reach out to our customer service team for assistance with taxi and cab services across multiple cities." />
        <meta property="twitter:image" content="https://www.bookyourride.in/images/bike-rent-logo-2.png" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#FDB813" />
        <link rel="canonical" href="https://www.bookyourride.in/taxi/contact" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Us | BookYourRide - Get in Touch for Taxi Services",
            "description": "Contact BookYourRide for taxi service inquiries, support, or bookings. Reach out to our customer service team for assistance with taxi and cab services across multiple cities.",
            "url": "https://www.bookyourride.in/taxi/contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "BookYourRide",
              "url": "https://www.bookyourride.in/",
              "logo": "https://www.bookyourride.in/images/bike-rent-logo-2.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "9368584334",
                "contactType": "customer service",
                "availableLanguage": "English"
              }
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <TaxiNavBar />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-20">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/images/taxi-bg-1.png')" }}></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" data-aos="fade-up">
              Contact <span className="text-yellow-400">Us</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              Get in touch with our team for taxi service inquiries, support, or bookings. 
              We're here to help make your journey comfortable and convenient.
            </p>
          </div>
        </section>


        {/* Basic Contact Information Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12" data-aos="fade-up">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're here to help you with all your taxi service needs. Reach out to us through any of the following ways.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center" data-aos="fade-up" data-aos-delay="100">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Call Us</h3>
                <p className="text-gray-600 mb-4">Speak directly with our customer service team</p>
                <a href="tel:+919368584334" className="text-yellow-600 font-semibold text-lg hover:text-yellow-700 transition-colors">
                  +91 9368584334
                </a>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-8 text-center" data-aos="fade-up" data-aos-delay="200">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Email Us</h3>
                <p className="text-gray-600 mb-4">Send us your queries and we'll respond quickly</p>
                <a href="mailto:support@taxirent.com" className="text-yellow-600 font-semibold text-lg hover:text-yellow-700 transition-colors">
                  support@taxirent.com
                </a>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-8 text-center" data-aos="fade-up" data-aos-delay="300">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Visit Us</h3>
                <p className="text-gray-600 mb-4">Our main office location</p>
                <p className="text-gray-700 font-semibold">
                  Malla Gorakhpur, Heera Nagar<br />
                  Haldwani, Uttarakhand 263139
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12" data-aos="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600">
                Quick answers to common questions about our taxi services.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6" data-aos="fade-up" data-aos-delay="100">
                <h3 className="text-xl font-bold text-gray-800 mb-3">How do I book a taxi?</h3>
                <p className="text-gray-600">
                  You can book a taxi through our website, mobile app, or by calling our customer service number. 
                  Simply provide your pickup location, destination, and preferred time.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6" data-aos="fade-up" data-aos-delay="200">
                <h3 className="text-xl font-bold text-gray-800 mb-3">What payment methods do you accept?</h3>
                <p className="text-gray-600">
                  We accept cash, credit/debit cards, UPI, and digital wallets. You can pay online during booking 
                  or directly to the driver after your ride.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6" data-aos="fade-up" data-aos-delay="300">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Do you provide airport transfers?</h3>
                <p className="text-gray-600">
                  Yes, we provide reliable airport transfer services. Our drivers track flight schedules to ensure 
                  timely pickup, even if your flight is delayed.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6" data-aos="fade-up" data-aos-delay="400">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Can I cancel my booking?</h3>
                <p className="text-gray-600">
                  Yes, you can cancel your booking up to 30 minutes before the scheduled pickup time. 
                  Cancellation charges may apply based on the timing and distance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12" data-aos="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Service Areas</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We provide taxi services across multiple cities with professional drivers and well-maintained vehicles.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {taxiCities.length > 0 ? (
                taxiCities.map((city, index) => (
                  <div key={city._id || city.slug || city.name} className="bg-white p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay={index * 100}>
                    <div className="text-lg font-semibold text-gray-800">{city.name}</div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">Loading service areas...</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      
      <FooterTaxi />
    </>
  );
}
